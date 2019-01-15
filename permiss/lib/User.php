<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/2
 * Time: 12:14
 */
namespace permiss\lib;


abstract class User extends Web
{
    protected $user;
    protected $_roleM;

    public function before()
    {
        $this->header->add('Access-Control-Allow-Origin', '*');
        $token = $this->request->request('token');
        if (!$token) {
            return [302, 'login false'];
        }
        if (!($user = $this->redis->get($token))) {
            return [301, 'login false'];
        }
        $this->user = $user;
        $this->_roleM = $this->model('Role');

        
        if ($this->redis->has('auth-update-user-' . $this->user['unid'])) {
            $this->redis->rm($token);
            $this->redis->rm('auth-update-user-' . $this->user['unid']);
            return [302, 'login false'];
        }

        if (!$this->authCheck()) {
            return [400, 'auth failed'];
        }


        $result  = $this->validate();
        if ($result !== true)
        {
            return [500, $result];
        }
        return true;
    }

    private function authCheck()
    {
        $operate = \getModule() . DS . $this->getController() . DS . \rtrim($this->getAction(), 'Api');
        $userOperates = $this->getOperate();
        if (in_array($operate, $userOperates)) {
            return true;
        }

        return false;
    }

    protected function getOperate()
    {
        if (!empty($this->user['operates'])) {
            return $this->user['operates'];
        }

        // if ($this->user['name'] === 'admin') {
        //     $userOperates = $this->conf->get('permiss.operate');
        // } else {
            $userOperates = $this->_roleM->getOperate($this->user['role']);
            // \var_dump($userOperates);
            $this->user['operates_details'] = [];
            foreach ($userOperates as $key => $value) {
                # code...
                $this->user['operates_details'][$value['mid']][] = $value;
            }
            $userOperates = \array_column($userOperates, 'url');
        // }
        $this->user['operates'] = $userOperates;
        $this->redis->set($this->request->request('token'), $this->user);

        return $this->user['operates'];
    }

    protected function getMenu()
    {
        if (!empty($this->user['menu'])) {
            return $this->user['menu'];
        }
        
        // if ($this->user['name'] === 'admin') {
        //     $roleMenus = $this->conf->get('permiss.menu');
        // } else {
            $roleMenus = $this->_roleM->getMenu($this->user['role']);
        // }
        $this->user['menu'] = $roleMenus;
        $this->redis->set($this->request->request('token'), $this->user);

        return $this->user['menu'];
    }
}