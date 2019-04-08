<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/8/27
 * Time: 20:58
 */
namespace permiss\controller;

class User extends \permiss\lib\User
{
    protected $_userM;
      
    protected function afterInit()
    {
        $this->_userM = $this->model('User');
    }

    /**
     * @method post
     *
     * @rule form.name|post|角色名称错误 require
     * @rule form.no|post|工号名称错误 require
     * @rule form.mobile|post|手机号码错误 regex|/^1[34578]\d{9}$/  
     * @rule form.sex|post|性别错误 integer
     * @rule form.department_id|post|部门错误 require
     * @rule form.job_id|post|职位错误 require
     * @rule form.role_id|post|角色错误 array
     */
    public function saveApi()
    {
        $form = $this->request->post('form');
        $result = $this->_userM->save($form);
        if ($result) {
            return [200, true];
        }
        return [501, '操作失败'];
    }

    /**
     * @method post
     * 
     * @rule id|post|功能人错误 require
     * @rule status|post|状态错误 integer
     */
    public function statusApi()
    {
        $id = $this->request->post('id');
        $status = $this->request->post(status);

        $result = $this->_userM->status($id, $status);
        if ($result) {
            return [200, true];
        }

        return [501, '状态修改失败'];
    }

    /**
     * @method get
     * 
     */
    public function listApi($page = 1)
    {
        $result = $this->_userM->getAll($page);
        return [200, $result];
    }

    /**
     * @method get
     *
     * @rule id|get|员工id错误 integer
     */
    public function getApi($id)
    {
        $result = $this->_userM->get($id);
        if ($result) {
            return [200, $result];
        }
        return [400, '不存在该员工'];
    }
}