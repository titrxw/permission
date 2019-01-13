<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2019/1/10
 * Time: 21:58
 */

return [
    'menu' => [
        [
            "name"=>"组织结构管理",
            "icon"=>"hammer",
            "menu"=>[
                [
                    "name"=>"部门",
                    "icon"=>"",
                    "url"=>"/organization/department"
                ],
                [
                    "name"=>"职位",
                    "icon"=>"",
                    "url"=>"/organization/job"
                ]
            ]
        ],
        [
            "name"=>"模块管理",
            "icon"=>"hammer",
            "menu"=>[
                [
                    "name"=>"模块",
                    "icon"=>"",
                    "url"=>"/module"
                ],
                [
                    "name"=>"操作",
                    "icon"=>"",
                    "url"=>"/module/operate"
                ]
            ]
        ],
        [
            "name"=>"角色管理",
            "icon"=>"hammer",
            "menu"=>[
                [
                    "name"=>"角色",
                    "icon"=>"",
                    "url"=>"/organization/role"
                ]
            ]
        ],
        [
            "name"=>"用户管理",
            "icon"=>"hammer",
            "menu"=>[
                [
                    "name"=>"用户",
                    "icon"=>"",
                    "url"=>"/organization/user"
                ]
            ]
        ]
                ],
                'operate' => [
                    'permiss/System/menu'
                ]
];