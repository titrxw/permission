<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/5
 * Time: 21:05
 */
namespace permiss\model;

use framework\base\Model;

class Module extends Model
{
    protected $_table = 'module';

    public function save($data)
    {
        if (!empty($data['id'])) {
            $id = $data['id'];
            unset($data['id']);
            if ($data['pid'] === 0) {
                $data['path'] = 0;
                $data['level'] = 1;
            } else {
                $pdata = $this->db()->get($this->_table, ['path', 'level'], ['unid' => $data['pid']]);
                $data['path'] = trim($pdata['path']. ',' . $data['pid'], ',');
                $data['level'] = $pdata['level'] + 1;
            }
            
            $result = $this->db()->update($this->_table, $data, ['id' => $id]);
            //task执行强制对应用户下线
        } else {
            $exists = $this->db()->get($this->_table, 'id', ['title' => $data['title'], 'pid' => $data['pid']]);
            if ($exists) {
                return false;
            }

            $data['unid'] = 'm-' . uniqueId();
            $data['create_time'] = time();
            if ($data['pid'] === 0) {
                $data['path'] = 0;
                $data['level'] = 1;
            } else {
                $pdata = $this->db()->get($this->_table, ['path', 'level'], ['unid' => $data['pid']]);
                $data['path'] = trim($pdata['path']. ',' . $data['pid'], ',');
                $data['level'] = $pdata['level'] + 1;
            }
            

            $result = $this->db()->insert($this->_table, $data);
        }
        if ($result) {
            return true;
        }

        return false;
    }

    public function getAll($status = null)
    {
        $where = ['is_delete' => 0];
        if (isset($status)) {
            $where['status'] = $status;
        }
        return $this->db()->select($this->_table, ['id', 'title', 'icon', 'desc', 'status','unid','url','pid', 'level'], $where);
    }

    public function get($id)
    {
        return $this->db()->get($this->_table, ['id', 'title', 'icon', 'desc', 'status','unid','url'], ['id' => $id]);
    }

    public function delete($id)
    {
        $has = $this->db()->get($this->_table, 'id', ['pid' => $id]);
        if ($has) {
            return false;
        }
        $flag = false;
        $this->db()->action(function($database) use (&$flag, $id) {
            $result = $this->db()->update($this->_table, ['is_delete' => 1], ['unid' => $id]);
            if ($result) {
                $ids = $this->db()->select('operate','unid', ['mid' => $id]);
                $flag = $this->model('Operate')->delete($ids);
            } else {
                $flag = false;
            }
            return $flag;
        });

        return $flag;
    }
}