<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/8/27
 * Time: 20:58
 */
namespace permiss\controller;
use permiss\lib\User;

class Module extends User
{
    protected $_moduleM;

    protected function afterInit()
    {
        $this->_moduleM = $this->model('Module');
    }

    /**
     * @method post
     * 
     * @rule form.title|post|模块名称错误 require
     * @rule form.pid|post|上级模块错误 require
     * @rule form.status|post|启用状态错误 integer
     */
    public function saveApi()
    {
        $form = $this->request->post('form');
        $result = $this->_moduleM->save($form);
        if ($result) {
            return [200, true];
        }
        return [501, '操作失败'];
    }

    /**
     * @method get
     * 
     */
    public function listApi()
    {
        $result = $this->_moduleM->getAll();
        return [200, $this->tree->get($result)];
    }

    /**
     * @method get
     * 
     * @rule id|get|模块id错误 integer
     */
    public function getApi($id)
    {
        $result = $this->_moduleM->get($id);
        if ($result) {
            return [200, $result];
        }
        return [400, '不存在该模块'];
    }

    /**
     * @method get
     * 
     * @rule unid|get|模块id错误 require
     */
    public function deleteApi($unid)
    {
        $result = $this->_moduleM->delete($unid);
        if ($result) {
            return [200, true];
        }
        return [400, '删除失败'];
    }
}