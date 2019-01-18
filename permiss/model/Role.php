<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2019/1/9
 * Time: 21:00
 */
namespace permiss\model;

use framework\web\Model;

class Role extends Model
{
    protected $_table = 'role';

    public function save($data)
    {
        $flag = false;
        $type = 'add';
        $this->db()->action(function($database) use (&$flag, $data,&$type) {
            $auths = [];
            if (isset($data['auths'])) {
                $auths = $data['auths'];
                unset($data['auths']);
            }
            if (!empty($data['id'])) {
                $id = $data['id'];
                unset($data['id']);
                $type = 'update';
                $result = $this->db()->update($this->_table, $data, ['id' => $id]);
                //task执行强制对应用户下线
            } else {
                $exists = $this->db()->get($this->_table, 'id', ['name' => $data['name']]);
                if ($exists) {
                    return false;
                }

                $data['unid'] = 'r-' . uniqueId();
                $data['create_time'] = time();
                $result = $this->db()->insert($this->_table, $data);
            }

            if ($result) {
                if (!empty($auths)) {
                    $result = $this->db()->delete('role_permiss', ['rid' => $data['unid']]);
                    if (!$result) {
                        $flag = false;
                        return $flag;
                    }

                    $time = time();
                    foreach($auths as $key => $item) {
                        $auths[$key] = [
                            'oid' => $item,
                            'create_time' => $time,
                            'rid' => $data['unid']
                        ];
                    }
                    $result = $this->db()->insert('role_permiss', $auths);
                    if ($result) {
                        $flag = true;
                        return $flag;
                    }
                    $flag = false;
                    return $flag;
                }
                $flag = true;
                return $flag;
            } else {
                $flag = false;
                return $flag;
            }
        });
        if ($flag && $type == 'update') {
            $this->addTask('authTask', 'roleUpdate', $data['unid']);
        }

        return $flag;
    }

    public function getAll($status)
    {
        $where = ['is_delete' => 0];
        if (isset($status)) {
            $where['status'] = $status;
        }
        return ['data' => $this->db()->select($this->_table, ['id', 'name', 'unid', 'status'], $where)];
    }

    public function get($id)
    {
        return $this->db()->get($this->_table, ['id', 'name', 'unid', 'status'], ['id' => $id]);
    }

    public function delete($id)
    {
        $result = $this->db()->update($this->_table, ['is_delete' => 1], ['id' => $id]);
        if ($result->rowCount() > 0) {
            //task执行强制对应用户下线
            return true;
        }
        return false;
    }

    public function getMenu($roleId)
    {
        if (!$roleId) {
            return [];
        }

        $mids = $this->db()->select('role_permiss',['[><]operate' => ['oid' => 'unid']], 'mid', ['rid' => $roleId, 'status' => 1, 'is_delete' => 0, 'GROUP' => 'mid']);
        // \var_dump($mids);
        $menus = $this->db()->select('module', ['title(name)', 'url', 'icon', 'pid', 'unid', 'path'], ['unid' => $mids]);
        $paths =\implode(',', \array_unique(\array_column($menus, 'path')));
        // \var_dump($menus);
        $paths = \array_values(\array_unique(explode(',', $paths)));
        $pmenus = $this->db()->select('module', ['title(name)', 'url', 'icon', 'pid', 'unid', 'path'], ['unid' => $paths]);
        $amenus = \array_merge($menus, $pmenus);
        foreach ($amenus as &$item) {
            $item['url'] .= '?menu_mid=' . $item['unid'];
        }
        // \var_dump($amenus);
        $amenus = $this->tree->get($amenus, 'menu');
        return $amenus['menu'] ?? [];
    }

    public function getOperate($roleId)
    {
        if (!$roleId) {
            return [];
        }
        
        return $this->db()->select('role_permiss',['[><]operate' => ['oid' => 'unid']], ['url', 'mid', 'unid','alias', 'name(title)'], ['rid' => $roleId, 'status' => 1, 'is_delete' => 0]);
    }
}

