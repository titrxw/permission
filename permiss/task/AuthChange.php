<?php
namespace permiss\task;

use framework\base\Component;

class AuthChange extends Component
{
    public function module($unid)
    {
        $operates = $this->db()->select('operate', 'unid', ['mid' => $unid, 'status' => 1]);
        if (!$operates) {
            return false;
        }

        $roles = $this->getRolesByOperate($operates);
        if (!$roles) {
            return false;
        }

        return $this->getUsersByRoles($roles);
    }
    
    public function operateUpdate($operates)
    {
        $roles = $this->getRolesByOperate($operates);
        if (!$roles) {
            return false;
        }

        return $this->getUsersByRoles($roles);
    }

    
    public function operateDelete($unid)
    {
        return $this->operateUpdate($unid);
    }

    public function roleUpdate($unid)
    {
        return $this->getUsersByRoles($roles);
    }

    private function getRolesByOperate($operates)
    {
        $roles = $this->db()->select('role_permiss', 'rid', ['oid' => $operates]);
        if (!$roles) {
            return false;
        }

        $roles = \array_unique($roles);
        return $roles;
    }

    private function getUsersByRoles($roles)
    {
        $users = $this->db()->select('user_role', 'uid', ['role_id' => $roles]);
        if (!$users) {
            return false;
        }

        $users = \array_unique($users);

        foreach($users as $item) {
            $this->redis->set('auth-update-user-' . $item, 1);
        }

        return true;
    }
}