<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/8/27
 * Time: 20:58
 */
namespace permiss\controller;
use permiss\lib\User;

class Role extends User
{
    protected $_roleM;

    protected function afterInit()
    {
        $this->_roleM = $this->model('Job');
    }

    /**
     * @method post
     *
     * @rule form.name|post|角色名称错误 require
     * @rule form.status|post|启用状态错误 integer
     */
    public function saveApi()
    {
        $form = $this->request->post('form');
        $result = $this->_roleM->save($form);
        if ($result) {
            return [200, true];
        }
        return [501, '操作失败'];
    }

    /**
     * @method get
     *
     */
    public function listApi($status = null)
    {
        $result = $this->_roleM->getAll($status);
        return [200, $result];
    }

    /**
     * @method get
     *
     * @rule id|get|角色id错误 integer
     */
    public function getApi($id)
    {
        $result = $this->_roleM->get($id);
        if ($result) {
            return [200, $result];
        }
        return [400, '不存在该职位'];
    }

    /**
     * @method get
     *
     * @rule id|get|角色id错误 integer
     */
    public function deleteApi($id)
    {
        $result = $this->_roleM->delete($id);
        if ($result) {
            return [200, true];
        }
        return [400, '删除失败'];
    }

    /**
     * @method get
     */
    public function getPermissApi($role_id)
    {
        $modules = $this->model('Module')->getAll(1);
        $modules = \array_combine(\array_column($modules, 'unid'), $modules);
        $operates = $this->model('Operate')->getAllNormals();
        $operates = \array_combine(\array_column($operates, 'unid'), $operates);

        $userPermiss = [];
        if ($role_id) {
            $userPermiss = $this->model('Role')->getOperate($role_id);
            $userPermiss = \array_combine(\array_column($userPermiss, 'unid'), $userPermiss);
            \array_walk($userPermiss, function (&$v) {
                $v['checked'] = true;
            });
        }

        $operates = \array_merge($operates, $userPermiss);

        foreach($modules as &$mitem) {
            $mitem['expand'] = true;
            if (!isset($mitem['checked'])) {
                $mitem['checked'] = false;
            }
        }
        foreach($operates as &$item) {
            $item['expand'] = true;
            if (!isset($item['checked'])) {
                $item['checked'] = false;
            }
            $modules[$item['mid']]['children'][] = $item;
        }

        return [200, $this->tree->get($modules)];
    }
}