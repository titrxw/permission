/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50717
Source Host           : 127.0.0.1:3306
Source Database       : permiss

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-01-09 21:50:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `permiss_department`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_department`;
CREATE TABLE `permiss_department` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `unid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pid` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`,`unid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_department
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_job`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_job`;
CREATE TABLE `permiss_job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_job
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_module`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_module`;
CREATE TABLE `permiss_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `pid` varchar(50) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `create_time` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `unid` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`unid`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_module
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_operate`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_operate`;
CREATE TABLE `permiss_operate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `unid` varchar(50) NOT NULL,
  `name` varchar(60) NOT NULL,
  `mid` varchar(50) NOT NULL,
  `url` varchar(200) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`,`unid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_operate
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_permission`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_permission`;
CREATE TABLE `permiss_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_permission
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_role`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_role`;
CREATE TABLE `permiss_role` (
  `int` int(11) NOT NULL AUTO_INCREMENT,
  `unid` varchar(50) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`int`),
  UNIQUE KEY `int_UNIQUE` (`int`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_role
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_role_permiss`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_role_permiss`;
CREATE TABLE `permiss_role_permiss` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` varchar(50) NOT NULL,
  `oid` varchar(50) NOT NULL,
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_role_permiss
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_user`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_user`;
CREATE TABLE `permiss_user` (
  `int` int(11) NOT NULL AUTO_INCREMENT,
  `unid` varchar(64) NOT NULL,
  `mobile` int(12) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(45) NOT NULL,
  `create_time` int(11) NOT NULL,
  `last_login_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`int`,`unid`,`mobile`),
  UNIQUE KEY `int_UNIQUE` (`int`),
  UNIQUE KEY `uid_UNIQUE` (`unid`),
  UNIQUE KEY `name_UNIQUE` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_user
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_user_department`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_user_department`;
CREATE TABLE `permiss_user_department` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `did` varchar(50) NOT NULL,
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_user_department
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_user_job`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_user_job`;
CREATE TABLE `permiss_user_job` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `jid` varchar(50) NOT NULL,
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_user_job
-- ----------------------------

-- ----------------------------
-- Table structure for `permiss_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_user_role`;
CREATE TABLE `permiss_user_role` (
  `int` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(64) NOT NULL,
  `role_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`int`),
  UNIQUE KEY `int_UNIQUE` (`int`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_user_role
-- ----------------------------
