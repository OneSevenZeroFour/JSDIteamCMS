/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : user

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-20 10:12:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for addresslist
-- ----------------------------
DROP TABLE IF EXISTS `addresslist`;
CREATE TABLE `addresslist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `jwd` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of addresslist
-- ----------------------------
INSERT INTO `addresslist` VALUES ('5', '广东省, 广州市, 天河区, 沙太路, 141号', 'lng:113.3351656,let:23.178425', '2017/9/15 下午5:40:29');
INSERT INTO `addresslist` VALUES ('6', '广东省, 广州市, 天河区, 沙太南路, 247号', 'lng:113.3352498,let:23.178422899999997', '2017/9/15 下午5:41:00');
INSERT INTO `addresslist` VALUES ('7', '广东省, 广州市, 越秀区, , ', 'lng:113.30764968,let:23.1200491', '2017/9/15 下午5:41:26');
INSERT INTO `addresslist` VALUES ('8', '广东省, 广州市, 天河区, 沙太南路, 247号', 'lng:113.33519260000001,let:23.1784493', '2017/9/15 下午5:42:00');
INSERT INTO `addresslist` VALUES ('9', '广东省, 广州市, 天河区, 沙太南路, 247号', 'lng:113.3351928,let:23.1784456', '2017/9/16 上午9:02:49');
INSERT INTO `addresslist` VALUES ('10', '广东省, 广州市, 越秀区, , ', 'lng:113.30764968,let:23.1200491', '2017/9/16 上午10:38:18');
INSERT INTO `addresslist` VALUES ('11', '广东省, 广州市, 越秀区, , ', 'lng:113.30764968,let:23.1200491', '2017/9/16 下午12:16:14');
INSERT INTO `addresslist` VALUES ('12', '广东省, 广州市, 越秀区, , ', 'lng:113.30764968,let:23.1200491', '2017/9/19 下午8:08:30');

-- ----------------------------
-- Table structure for hobby
-- ----------------------------
DROP TABLE IF EXISTS `hobby`;
CREATE TABLE `hobby` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `hobby` varchar(255) DEFAULT NULL,
  `age` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hobby
-- ----------------------------
INSERT INTO `hobby` VALUES ('21', 'dsd', 'fwfew', '23');
INSERT INTO `hobby` VALUES ('17', '陈国伟', '女，男hfyudsgfyug', '20');
INSERT INTO `hobby` VALUES ('20', 'fiuhug', 'fsf', '23');
INSERT INTO `hobby` VALUES ('22', '王小二', '打游戏，lol', '19');

-- ----------------------------
-- Table structure for userlist
-- ----------------------------
DROP TABLE IF EXISTS `userlist`;
CREATE TABLE `userlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `carlist` varchar(20000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userlist
-- ----------------------------
INSERT INTO `userlist` VALUES ('1', '346692921@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '145//1');
INSERT INTO `userlist` VALUES ('18', '76576576765@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '');
INSERT INTO `userlist` VALUES ('19', '4534532765@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '');
INSERT INTO `userlist` VALUES ('20', '4324465656@qq.com', 'e10adc3949ba59abbe56e057f20f883e', null);
INSERT INTO `userlist` VALUES ('21', '13123452343', '123ef9cc0b45a0f6321a877589ebc5a4', null);
INSERT INTO `userlist` VALUES ('22', '54543435345@qq.com', 'e10adc3949ba59abbe56e057f20f883e', null);
INSERT INTO `userlist` VALUES ('23', '5435435435@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '077/100/2');
INSERT INTO `userlist` VALUES ('24', '221435435@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '');
INSERT INTO `userlist` VALUES ('25', '13135641649', '123ef9cc0b45a0f6321a877589ebc5a4', '029/40/5-029/41/2-029/42/1-029/39/1');
