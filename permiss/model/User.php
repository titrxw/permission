<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/5
 * Time: 21:05
 */
namespace permiss\model;

use framework\base\Model;

class User extends Model
{
    protected $_table = 'user';
    protected $_pageSize = 10;

    public function save($data) 
    {
        $this->db()->action(function($database) use (&$flag, $data) {
            $roleIds = [];
            if (!empty($data['role_id'])) {
                $roleIds = $data['role_id'];
                unset($data['role_id']);
            }


            if (!empty($data['id'])) {
                $id = $data['id'];
                unset($data['id']);
    
                $result = $this->db()->update($this->_table, $data, ['id' => $id]);
                //task执行强制对应用户下线
            } else {
                $exists = $this->db()->get($this->_table, 'id', ['mobile' => $data['mobile']]);
                if ($exists) {
                    return false;
                }
                
                // 生成密码
                $password = \substr($data['mobile'], 5);
                $password = $this->password->setPassword($password)->MakeHashStr();
                $salt = $this->password->GetHashSalt();

                $data['password'] = $password;
                $data['salt'] = $salt;
                $data['unid'] = 'u-' . uniqueId();
                $data['create_time'] = time();
                $result = $this->db()->insert($this->_table, $data);
            }
            
            if ($result) {
                if ($roleIds) {
                    $result = $this->db()->delete('user_role',['uid' => $data['unid']]);
                    if (!$result) {
                        $flag = false;
                        return $flag;
                    }

                    $time = time();
                    foreach($roleIds as $key => $item) {
                        $roles[$key] = [
                            'role_id' => $item,
                            'create_time' => $time,
                            'uid' => $data['unid']
                        ];
                    }
                    $result = $this->db()->insert('user_role', $roles);
                    if ($result) {
                        $flag = true;
                        return $flag;
                    }
                    $flag = false;
                    return $flag;
                }
                $flag = true;
                return $flag;
            }
            $flag = false;
            return $flag;
        });
        
        return $flag;
    }


    public function register($name, $mobile, $password) 
    {
        $userInfo = $this->db()->get('user', 'id', [
            'mobile' => $mobile,
        ]);
        if ($userInfo) {
            return false;
        }
        $password = $this->password->setPassword($password)->MakeHashStr();
        $salt = $this->password->GetHashSalt();
        $user = [
            'unid' => 'u_' . \uniqueId(),
            'name' => $name,
            'mobile' => $mobile,
            'password' => $password,
            'salt' => $salt,
            'create_time' => time()
        ];
        $result = $this->db()->insert('user', $user);
        if ($result->rowCount() > 0) {
            unset($user['password'], $user['salt']);
            return $user;
        }
        return false;
    }

    public function login($mobile, $password)
    {
        $userInfo = $this->db()->get('user', ['unid', 'mobile', 'password','salt', 'name'], [
            'mobile' => $mobile, 'status' => 1
        ]);
        if (!$userInfo) {
            return false;
        }
        $result = $this->password->setPassword($password)
        ->setSalt($userInfo['salt'])
        ->setHash($userInfo['password'])
        ->validate();
        if (!$result) {
            return false;
        }

        $userInfo['role'] = $this->getRole($userInfo['unid']);

        unset($userInfo['password'], $userInfo['salt']);
        return $userInfo;
    }

    public function password($oldPwd, $newPwd, $uid)
    {
        $userInfo = $this->db()->get('user', ['password','salt'], ['union_id' => $uid]);
        if (!$userInfo) {
            return false;
        }
        $result = $this->password->setPassword($oldPwd)
        ->setSalt($userInfo['salt'])
        ->setHash($userInfo['password'])
        ->validate();
        if (!$result) {
            return false;
        }
        $password = $this->password->setPassword($newPwd)->MakeHashStr();
        $salt = $this->password->GetHashSalt();       
        
        $result = $this->db()->update('user', ['password' => $password,'salt' => $salt], ['union_id' => $uid]);
        if ($result->rowCount()) {
            return true;
        }
        return false;
    }

    public function getRole($uid)
    {
        return $this->db()->select('user_role','role_id', ['uid' => $uid]);
    }

    public function get($id)
    {
        $data = $this->db()->get($this->_table, ['id', 'name', 'mobile', 'no', 'status', 'unid', 'department_id', 'job_id', 'sex'], ['id' => $id]);
        if (!$data) {
            return [];
        }
        $role = $this->getRole($data['unid']);
        $data['role_id'] = $role;

        return $data;
    }

    public function getAll($page)
    {
        $total = $this->db()->count($this->_table);
        if (!$total) {
            return ['total'=>0, 'data'=>[]];
        }
        $data = $this->db()->select($this->_table, ['id', 'name', 'mobile', 'no', 'status'], ['LIMIT' => [($page - 1) * $this->_pageSize, $this->_pageSize]]);
        return ['total'=>$total, 'data'=>$data];
    }

    public function status($id, $status)
    {
        return $this->db()->update($this->_table,['status' => $status], ['id' => $id]);
    }
}