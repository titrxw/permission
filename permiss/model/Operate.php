<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2019/1/9
 * Time: 20:53
 */
namespace permiss\model;

use framework\base\Model;

class Operate extends Model
{
    protected $_table = 'operate';
    protected $_pageSize = 10;

    public function save($data)
    {
        $type= 'add';
        if (!empty($data['id'])) {
            $id = $data['id'];
            unset($data['id']);

            $type= 'update';
            $result = $this->db()->update($this->_table, $data, ['id' => $id]);
            //task执行强制对应用户下线
        } else {
            $exists = $this->db()->get($this->_table, 'id', ['name' => $data['name'], 'mid' => $data['mid']]);
            if ($exists) {
                return false;
            }

            $data['unid'] = 'o-' . uniqueId();
            $data['create_time'] = time();
            $result = $this->db()->insert($this->_table, $data);
            //task执行强制对应用户下线
        }

        if ($result) {
            if ($type == 'update') {
                $this->addTask('authTask', 'operateUpdate', $data['unid']);
            }
            return true;
        }

        return false;
    }

    public function getPage($page = 1)
    {
        $total = $this->db()->count($this->_table, ['is_delete' => 0]);
        if (!$total) {
            return ['total'=>0, 'data'=>[]];
        }
        $data = $this->db()->select($this->_table, ['id', 'name', 'url', 'alias', 'status', 'mid'], ['is_delete' => 0,'LIMIT' => [($page - 1) * $this->_pageSize, $this->_pageSize]]);
        return ['total'=>$total, 'data'=>$data];
    }

    public function getAllNormals()
    {
      return $this->db()->select($this->_table, ['name(title)', 'unid', 'url', 'mid'], ['is_delete' => 0, 'status' => 1]);
    }

    public function get($id)
    {
        return $this->db()->get($this->_table, '*', ['id' => $id]);
    }

    public function delete($id)
    {
        if (!$id) {
            return true;
        }
        $result = $this->db()->update($this->_table, ['is_delete' => 1], ['unid' => $id]);
        if ($result) {
            //task执行强制对应用户下线
            $this->addTask('authTask', 'operateDelete', $id);
            return true;
        }
        return false;
    }
}