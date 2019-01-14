/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50717
Source Host           : 127.0.0.1:3306
Source Database       : permiss

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-01-14 23:28:36
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_department
-- ----------------------------
INSERT INTO `permiss_department` VALUES ('4', 'd-269650749055418368', '开发部', 'make', '0', '1', '0', '1547472938');
INSERT INTO `permiss_department` VALUES ('5', 'd-269651924821688320', '产品部', 'product', '0', '1', '0', '1547473119');
INSERT INTO `permiss_department` VALUES ('6', 'd-269651839056560128', '测试部', 'ces', 'd-269650749055418368', '1', '0', '1547473132');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_job
-- ----------------------------
INSERT INTO `permiss_job` VALUES ('4', 'j-269651919587196928', '项目经理', '0', '1', '0', '1547473151');
INSERT INTO `permiss_job` VALUES ('5', 'j-269651824024174592', '产品经理', '0', '1', '0', '1547473160');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_module
-- ----------------------------
INSERT INTO `permiss_module` VALUES ('6', 'm-269651830198190080', '百度无人驾驶', '0', '', '1', '0', '', ',0', '百度无人驾驶', '1547473227', '1');
INSERT INTO `permiss_module` VALUES ('7', 'm-269651909520867328', '车辆管理', 'm-269651830198190080', '', '1', '0', '', ',0,m-269651830198190080', '', '1547473247', '1');
INSERT INTO `permiss_module` VALUES ('8', 'm-269652949171388416', '零部件管理', 'm-269651909520867328', '', '1', '0', '', ',0,m-269651830198190080,m-2696', '', '1547473266', '1');
INSERT INTO `permiss_module` VALUES ('9', 'm-269652984604868608', '系统管理', 'm-269651830198190080', '', '1', '0', '', ',0,m-269651830198190080', '', '1547473306', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_operate
-- ----------------------------
INSERT INTO `permiss_operate` VALUES ('4', 'o-269652972793708544', '车辆列表', 'm-269651909520867328', 'er', '1', 'er', '0', '1547473336');
INSERT INTO `permiss_operate` VALUES ('5', 'o-269652913450500096', '零部件列表', 'm-269652949171388416', 'asd', '1', 'sd', '0', '1547473420');
INSERT INTO `permiss_operate` VALUES ('6', 'o-269652963916365824', '车辆添加', 'm-269651909520867328', 'ewr', '1', 'ewr', '0', '1547473433');
INSERT INTO `permiss_operate` VALUES ('7', 'o-269653026478604288', '零部件添加', 'm-269652949171388416', 'sdf', '1', 'sdf', '0', '1547473447');
INSERT INTO `permiss_operate` VALUES ('8', 'o-269652920983470080', '系统设置', 'm-269652984604868608', 'wer', '1', 'ewr', '0', '1547473456');
INSERT INTO `permiss_operate` VALUES ('9', 'o-269607841000456192', '菜单管理', 'm-269651830198190080', 'permiss/System/menu', '1', 'permiss/System/menu', '0', '1547479484');

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unid` varchar(50) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `int_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_role
-- ----------------------------
INSERT INTO `permiss_role` VALUES ('1', 'r-269653027686563840', '项目经理', '1', '0', '1547473481');
INSERT INTO `permiss_role` VALUES ('2', 'r-269583680993607680', '编辑员', '1', '0', '1547473594');
INSERT INTO `permiss_role` VALUES ('3', 'r-269583731593691136', '系统配置元', '1', '0', '1547473606');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_role_permiss
-- ----------------------------
INSERT INTO `permiss_role_permiss` VALUES ('9', 'r-269653027686563840', 'o-269607841000456192', '1547479504');
INSERT INTO `permiss_role_permiss` VALUES ('10', 'r-269653027686563840', 'o-269652972793708544', '1547479504');
INSERT INTO `permiss_role_permiss` VALUES ('11', 'r-269653027686563840', 'o-269652913450500096', '1547479504');
INSERT INTO `permiss_role_permiss` VALUES ('12', 'r-269653027686563840', 'o-269653026478604288', '1547479504');
INSERT INTO `permiss_role_permiss` VALUES ('13', 'r-269583680993607680', 'o-269607841000456192', '1547479510');
INSERT INTO `permiss_role_permiss` VALUES ('14', 'r-269583680993607680', 'o-269652963916365824', '1547479510');
INSERT INTO `permiss_role_permiss` VALUES ('15', 'r-269583680993607680', 'o-269653026478604288', '1547479510');
INSERT INTO `permiss_role_permiss` VALUES ('16', 'r-269583731593691136', 'o-269607841000456192', '1547479515');
INSERT INTO `permiss_role_permiss` VALUES ('17', 'r-269583731593691136', 'o-269652920983470080', '1547479515');

-- ----------------------------
-- Table structure for `permiss_user`
-- ----------------------------
DROP TABLE IF EXISTS `permiss_user`;
CREATE TABLE `permiss_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unid` varchar(64) NOT NULL,
  `mobile` char(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `no` varchar(30) NOT NULL,
  `department_id` varchar(64) NOT NULL,
  `job_id` varchar(64) NOT NULL,
  `sex` tinyint(4) NOT NULL DEFAULT '1',
  `password` varchar(64) NOT NULL,
  `salt` varchar(45) NOT NULL,
  `create_time` int(11) NOT NULL,
  `last_login_time` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`unid`,`mobile`),
  UNIQUE KEY `int_UNIQUE` (`id`),
  UNIQUE KEY `uid_UNIQUE` (`unid`),
  UNIQUE KEY `name_UNIQUE` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_user
-- ----------------------------
INSERT INTO `permiss_user` VALUES ('1', 'u_-5472256', '15903466276', 'admin', '', '', '', '1', 'Ld4lWtrO+sMBUJY3uvuYCPD5KumFRJ7ghdPNtKMcgMM=', 'i3qHOYlMplGrbuVC/GEynw==', '1547347587', null, '1');
INSERT INTO `permiss_user` VALUES ('4', 'u-269601299077398528', '15903466256', '435', '435', 'd-269651839056560128', 'r-269583680993607680', '1', '8RTD3Kb61PJQ/92eOiFupJR/JE58kYkzTZDpLooxA7A=', 'vOCN5KbDiiuulVqIs3PBQA==', '1547477860', null, '1');
INSERT INTO `permiss_user` VALUES ('11', 'u-269604605824729088', '15903466279', '324', '234234', 'd-269651839056560128', 'r-269583680993607680', '1', '8dDe/HmqZmi6qhxSOXaSEhgVk8fIsea61a/Wj4j6cqI=', 'hh216hHnQu7SBKUees73Wg==', '1547478746', null, '1');

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
  `role_id` varchar(64) NOT NULL,
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`int`),
  UNIQUE KEY `int_UNIQUE` (`int`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permiss_user_role
-- ----------------------------
INSERT INTO `permiss_user_role` VALUES ('1', 'u_-5472256', 'r-269583731593691136', '11111111');
INSERT INTO `permiss_user_role` VALUES ('4', 'u-269604605824729088', 'r-269583731593691136', '1547479379');
INSERT INTO `permiss_user_role` VALUES ('5', 'u-269604605824729088', 'r-269653027686563840', '1547479379');
INSERT INTO `permiss_user_role` VALUES ('6', 'u-269601299077398528', 'r-269653027686563840', '1547479388');
INSERT INTO `permiss_user_role` VALUES ('7', 'u-269601299077398528', 'r-269583731593691136', '1547479388');
