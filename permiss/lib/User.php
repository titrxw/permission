<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/2
 * Time: 12:14
 */
namespace permiss\lib;

use framework\web\Api;

abstract class User extends Api
{
    protected $user = [];

    public function beforeAction()
    {
        $this->header->add('Access-Control-Allow-Origin', '*');
        $token = $this->request->post('token');
        if (!$token) {
            return ['ret' => 302, 'msg' => 'login false'];
        }
        if (!($user = $this->token->get($token))) {
            return ['ret' => 301, 'msg' => 'login false'];
        }

        $result  = $this->validate();
        if ($result !== true)
        {
            return ['ret' => 500, 'msg' => $result];
        }
        $this->user = $user;
        return true;
    }
}