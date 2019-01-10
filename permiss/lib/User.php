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

    public function before()
    {
        $this->header->add('Access-Control-Allow-Origin', '*');
        $token = $this->request->request('token');
        if (!$token) {
            return [302, 'login false'];
        }
        if (!($user = $this->token->get($token))) {
            return [301, 'login false'];
        }
        if ($user['valid_time'] < time()) {
            return ['ret' => 301, 'msg' => 'login false'];
        }

        $result  = $this->validate();
        if ($result !== true)
        {
            return [500, $result];
        }
        $this->user = \json_decode($user, true);
        return true;
    }
}