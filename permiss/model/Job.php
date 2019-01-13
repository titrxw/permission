<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/5
 * Time: 21:05
 */
namespace permiss\model;

use framework\base\Model;

class Job extends Model
{
    protected $_table = 'job';

    public function save($data)
    {
      if (!empty($data['id'])) {
        $id = $data['id'];
        unset($data['id']);

        $result = $this->db()->update($this->_table, $data, ['id' => $id]);
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
      $data = $this->db()->select($this->_table, ['id','unid', 'name', 'status'], $where);
      return ['data'=>$data];
    }

    public function get($id) 
    {
        return $this->db()->get($this->_table, ['id', 'name', 'status'], ['id' => $id, 'is_delete' => 0]);
    }

    // public function delete($id) 
    // {
      
    //   $result = $this->db()->update($this->_table, ['is_delete' => 1], ['id' => $id]);
    //   if ($result->rowCount() > 0) {
    //     return true;
    //   }
    //   return false;
    // }
}