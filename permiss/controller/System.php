<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2019/1/10
 * Time: 21:35
 */
namespace permiss\controller;
use permiss\lib\User;

class System extends User
{
    /**
     * @method get
     */
    public function menuApi()
    {
        return [200, $this->getMenu()];
    }

    /**
     * @method get
     */
    public function getModuleOperateApi($mid)
    {
        $operates = $this->user['operates_details'][$mid] ?? [];
        $operates = \array_column($operates, 'alias');
        $operates = \array_combine($operates, array_fill(0, \count($operates), true));
        return [200, $operates];
    }
}