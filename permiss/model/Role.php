<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2019/1/9
 * Time: 21:00
 */
namespace permiss\model;

use framework\base\Model;

class Role extends Model
{
    protected $_table = 'role';

    public function save($data)
    {
        if (!empty($data['id'])) {
            $id = $data['id'];
            unset($data['id']);

            $result = $this->db()->update($this->_table, $data, ['id' => $id]);
            //task执行强制对应用户下线
        } else {
            $exists = $this->db()->get($this->_table, 'id', ['name' => $data['name']]);
            if ($exists) {
                return false;
            }

            $data['unid'] = 'j-' . uniqueId();
            $data['create_time'] = time();
            $result = $this->db()->insert($this->_table, $data);
        }

        if ($result->rowCount() > 0) {
            return true;
        }

        return false;
    }

    public function getAll($status)
    {
        $where = ['is_delete' => 0];
        if (isset($status)) {
            $where['status'] = $status;
        }
        return $this->db()->select($this->_table, '*', $where);
    }

    public function get($id)
    {
        return $this->db()->get($this->_table, '*', ['id' => $id, 'is_delete' => 0]);
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

        $mids = $this->db()->select('role_permiss',['[><]operate' => ['oid' => 'unid'], 'mid', ['rid' => $roleId, 'status' => 1, 'is_delete' => 0, 'GROUP' => 'mid']]);
        $menus = $this->db()->select('module', ['name', 'url', 'icon', 'pid', 'unid', 'path'], ['unid' => $mids]);
        $paths = \array_unique(\implode(',', \array_column($menus, 'path')));
        $pmenus = $this->db()->select('module', ['name', 'url', 'icon', 'pid', 'unid', 'path'], ['unid' => $paths]);
        $amenus = \array_merge($menus, $pmenus);

        return $this->tree->get($amenus, 'menu');
    }

    public function getOperate($roleId)
    {
        if (!$roleId) {
            return [];
        }
        
        return $this->db()->select('role_permiss',['[><]operate' => ['oid' => 'unid'], ['url', 'mid', 'unid', 'name'], ['rid' => $roleId, 'status' => 1, 'is_delete' => 0]]);
    }
}

