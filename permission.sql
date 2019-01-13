/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50717
Source Host           : 127.0.0.1:3306
Source Database       : permiss

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-01-13 17:20:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `permiss_department`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_department`;
CREATE TABLE `permiss_department` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `unid` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `pid` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`,`unid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_department
-- ----------------------------
INSERT INTO `permiss_department` VALUES ('1', 'd--1375928320', '345345', '435345', '0', '1', '0', '1547360909');
INSERT INTO `permiss_department` VALUES ('2', 'd--1130496', '213213', '213245325345', 'd--1375928320', '1', '0', '1547361230');
INSERT INTO `permiss_department` VALUES ('3', 'd--269565952', '324234', '435435345', 'd--1375928320', '0', '0', '1547361238');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_job
-- ----------------------------
INSERT INTO `permiss_job` VALUES ('1', 'j--1294336', '324235464', '0', '1', '1', '1547361728');
INSERT INTO `permiss_job` VALUES ('2', 'j--1108590592', '2453242352345', '0', '1', '0', '1547362561');
INSERT INTO `permiss_job` VALUES ('3', 'j--1294336', '546456456546', '0', '1', '0', '1547362565');

-- ----------------------------
-- Table structure for `permiss_module`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_module`;
CREATE TABLE `permiss_module` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `unid` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `pid` varchar(50) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `icon` varchar(50) DEFAULT NULL,
  `path` varchar(30) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `create_time` int(11) NOT NULL,
  `level` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`unid`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_module
-- ----------------------------
INSERT INTO `permiss_module` VALUES ('3', 'm--196608', 'vrd', '0', 'ewr', '1', '1', 'ewr', '0', 'ewr', '1547369274', '1');
INSERT INTO `permiss_module` VALUES ('4', 'm--272826368', '快租', '0', '', '1', '0', '324', '0', '324234', '1547369903', '1');
INSERT INTO `permiss_module` VALUES ('5', 'm--196608', '测试', 'm--272826368', '324', '1', '0', '324', '0,m--272826368', '324', '1547369911', '2');

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
  `alias` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`,`unid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_operate
-- ----------------------------
INSERT INTO `permiss_operate` VALUES ('1', 'o--1377026048', '213', 'm--34848768', '324234', '1', '', '1', '1547365322');
INSERT INTO `permiss_operate` VALUES ('2', 'o--1343471616', '435', 'm--34848768', '435345', '1', '435345', '1', '1547365859');
INSERT INTO `permiss_operate` VALUES ('3', 'o--1377026048', '546456546', 'm--196608', '546', '1', '456', '0', '1547365870');

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
  `mobile` char(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(45) NOT NULL,
  `create_time` int(11) NOT NULL,
  `last_login_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`int`,`unid`,`mobile`),
  UNIQUE KEY `int_UNIQUE` (`int`),
  UNIQUE KEY `uid_UNIQUE` (`unid`),
  UNIQUE KEY `name_UNIQUE` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_user
-- ----------------------------
INSERT INTO `permiss_user` VALUES ('1', 'u_-5472256', '15903466276', 'admin', 'Ld4lWtrO+sMBUJY3uvuYCPD5KumFRJ7ghdPNtKMcgMM=', 'i3qHOYlMplGrbuVC/GEynw==', '1547347587', null);

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
