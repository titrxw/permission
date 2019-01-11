<?php

namespace permiss\lib;

class Tree
{
    public function get($data, $key = 'pid', $value = 0)
    {
        $data = array_combine(array_column($data,'id'), $data);

        foreach ($data as $item) {
            $data[$item[$key]]['children'][] =& $data[$item['id']];
        }

        return $data[$value];
    }
}