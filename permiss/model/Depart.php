<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/5
 * Time: 21:05
 */
namespace permiss\model;

use framework\web\Model;

class Depart extends Model
{
  protected $_table = 'department';

    public function save($data)
    {
      if (!empty($data['id'])) {
        $id = $data['id'];
        unset($data['id']);

        $result = $this->db()->update($this->_table, $data, ['id' => $id]);
      } else {
        $exists = $this->db()->get($this->_table, 'id', ['title' => $data['title'], 'pid' => $data['pid']]);
        if ($exists) {
          return false;
        }

        $data['unid'] = 'd-' . uniqueId();
        $data['create_time'] = time();
        $result = $this->db()->insert($this->_table, $data);
      }

      if ($result) {
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
      return $this->db()->select($this->_table, ['alias', 'id', 'title', 'pid', 'status', 'unid'], $where);
    }

    public function get($id) 
    {
        return $this->db()->get($this->_table, '*', ['id' => $id]);
    }

    public function delete($id) 
    {
        $result = $this->db()->update($this->_table, ['is_delete' => 1], ['id' => $id]);
        if ($result) {
          return true;
        }
        return false;
    }
}