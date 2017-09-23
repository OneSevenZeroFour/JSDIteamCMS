/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : goods

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-22 19:52:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goodid` text NOT NULL,
  `goodtitle` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale` decimal(10,2) NOT NULL,
  `rabate` decimal(10,1) DEFAULT NULL,
  `size` varchar(400) DEFAULT NULL,
  `color` varchar(400) DEFAULT NULL,
  `imgurls` int(10) NOT NULL,
  `type` varchar(255) NOT NULL,
  `inventory` varchar(255) NOT NULL,
  `descrption` varchar(5000) DEFAULT NULL,
  `point` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=158 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('2', '002', 'EVE’S TEMPTATION 粉色水玉圆点拼接蕾丝3/4杯钢圈围文胸', '458.00', '159.00', '3.2', '75B-75C-80D', '白色', '3', 'women', '8', '<p><img src=\"http://localhost:10086/img/file741505999823003.jpg\"><br></p><p>98787686</p><p>9843759845676hiutiu4gtgtgtg</p><p><br></p><p><br></p><p>regjhrghiuhgiu4</p><p>8758467765867887</p><p><br></p><img src=\"http://localhost:10086/img/file61506072207621.jpg\">', '');
INSERT INTO `goodslist` VALUES ('3', '003', 'CB 深蓝色腰带饰翻领长袖风衣', '1999.00', '758.00', '3.8', 'M-L', '深蓝色', '4', 'women', '99', null, null);
INSERT INTO `goodslist` VALUES ('4', '004', 'RODO 黑色亮钻拇指环平底凉鞋', '3980.00', '1194.00', '3.0', '35-36-37-38', '黑色', '4', 'women', '66', null, null);
INSERT INTO `goodslist` VALUES ('5', '005', '黑色花朵图案双肩包', '5680.00', '2840.00', '5.0', '', '黑色', '4', 'women', '88', null, null);
INSERT INTO `goodslist` VALUES ('6', '006', 'IGER & STUART WEITZMAN 金色链条高跟凉鞋', '5980.00', '1794.00', '3.0', '35.5-39', '金色', '4', 'women', '29', null, null);
INSERT INTO `goodslist` VALUES ('7', '007', 'LINGO CODES 黑色印花兔耳朵发带', '198.00', '128.00', '6.5', '', '黑色', '3', 'women', '3', null, null);
INSERT INTO `goodslist` VALUES ('8', '008', 'LINGO CODES 米色手工编织刺绣大檐帽', '728.00', '328.00', '4.6', '', '米色', '3', 'women', '38', null, null);
INSERT INTO `goodslist` VALUES ('9', '009', '银色Magic Eye时尚拼色魔眼锁骨链 ', '998.00', '238.00', '2.4', '', '银色', '3', 'women', '18', null, null);
INSERT INTO `goodslist` VALUES ('10', '010', '金色字母传情925银针想念你字母款耳饰 ', '798.00', '128.00', '1.7', '', '金色', '3', 'women', '8', null, null);
INSERT INTO `goodslist` VALUES ('11', '011', 'GASTONE 意大利女鞋 银色玫瑰烫钻细高跟鞋', '1800.00', '788.00', '4.5', '34-35-36-37-38', '银色', '4', 'women', '99', null, null);
INSERT INTO `goodslist` VALUES ('12', '012', '黑白色拼接衬衫连衣裙', '569.00', '339.00', '6.0', '', '黑白色', '3', 'women', '12', null, null);
INSERT INTO `goodslist` VALUES ('13', '013', '红绿条纹蝴蝶结珍珠式吊坠女士耳钉', '1280.00', '158.00', '1.3', '', '拼色', '3', 'women', '10', null, null);
INSERT INTO `goodslist` VALUES ('14', '014', '气质女人黑白撞色多用胸针组合', '1298.00', '129.00', '1.0', '', '拼色', '4', 'women', '48', null, null);
INSERT INTO `goodslist` VALUES ('15', '015', '蓝色条纹长袖外套', '899.00', '359.00', '4.0', 'S-M', '蓝色', '3', 'women', '3', null, null);
INSERT INTO `goodslist` VALUES ('16', '016', '白色几何纹长袖衬衫 ', '509.00', '299.00', '5.9', '', '白色', '3', 'women', '1', null, null);
INSERT INTO `goodslist` VALUES ('17', '017', '蓝色时尚亚克力配珠圆形抓夹', '458.00', '258.00', '5.7', '', '蓝色', '3', 'women', '99', null, null);
INSERT INTO `goodslist` VALUES ('18', '018', '黄色印花露肩海边连衣裙', '580.00', '290.00', '5.0', 'S-M-L', '黄色', '3', 'women', '5', null, null);
INSERT INTO `goodslist` VALUES ('19', '019', '蓝色印花吊脖三角分体泳装', '500.00', '250.00', '5.0', 'S-M-L', '蓝色', '3', 'women', '6', null, null);
INSERT INTO `goodslist` VALUES ('20', '020', '绿色一字领针织上衣', '939.00', '349.00', '3.8', 'S-M-L', '绿色', '3', 'women', '29', null, null);
INSERT INTO `goodslist` VALUES ('21', '021', '红色密镶不对称惹火胸针', '1280.00', '199.00', '1.6', '', '红色', '3', 'women', '1', null, null);
INSERT INTO `goodslist` VALUES ('22', '022', '肉色简约3/4杯文胸', '498.00', '159.00', '3.2', '75B-75C-80D-85B', '肉色', '3', 'women', '18', null, null);
INSERT INTO `goodslist` VALUES ('23', '023', '粉色圆点蕾丝腰饰三角内裤', '298.00', '99.00', '3.4', 'S-M-L', '粉色', '3', 'women', '56', null, null);
INSERT INTO `goodslist` VALUES ('24', '024', '藏青色镂空花边3/4杯厚款钢圈文胸 ', '598.00', '269.00', '4.5', '75B-75C-80C-80D', '藏青色', '3', 'women', '10', null, null);
INSERT INTO `goodslist` VALUES ('25', '025', '婴儿蓝磨砂亚克力镶水钻迷你爪夹 ', '168.00', '88.00', '5.3', '', '婴儿蓝', '3', 'women', '19', null, null);
INSERT INTO `goodslist` VALUES ('26', '026', '绿色印花挂脖系带连体泳装', '690.00', '345.00', '5.0', '', '绿色', '3', 'women', '18', null, null);
INSERT INTO `goodslist` VALUES ('27', '027', '深蓝色印花分体泳装比基尼三件套 ', '500.00', '250.00', '5.0', 'L-XL', '深蓝色', '3', 'women', '66', null, null);
INSERT INTO `goodslist` VALUES ('28', '028', '蓝色翻领印花长袖衬衫 ', '2580.00', '774.00', '3.0', 'S-M-L-XL', '蓝色', '3', 'men', '18', null, null);
INSERT INTO `goodslist` VALUES ('29', '029', '蓝色冲孔系带休闲鞋 ', '2680.00', '804.00', '3.0', '39-40-41-42', '蓝色', '3', 'men', '99', null, null);
INSERT INTO `goodslist` VALUES ('30', '030', '白色印花男士圆领短袖T恤', '1980.00', '693.00', '3.5', 'S-M-L', '白色', '3', 'men', '12', null, null);
INSERT INTO `goodslist` VALUES ('31', '031', '黑色几何印花男士圆领短袖T恤', '1780.00', '623.00', '3.5', 'XS-S-M-L', '黑色', '3', 'men', '88', null, null);
INSERT INTO `goodslist` VALUES ('32', '032', '黑色涂层印花圆领短袖T恤', '2580.00', '903.00', '3.5', 'XS-S-M-L', '黑色', '3', 'men', '99', null, null);
INSERT INTO `goodslist` VALUES ('33', '033', 'GUCCI 蓝白拼色印花八角领长袖男士衬衫', '3480.00', '1902.00', '5.5', '15-16-17', '拼色', '3', 'men', '8', null, null);
INSERT INTO `goodslist` VALUES ('34', '034', '黑色出芽拼接西装外套', '11290.00', '2455.00', '2.2', '50', '黑色', '3', 'men', '1', null, null);
INSERT INTO `goodslist` VALUES ('35', '035', '黑色肌理襻带饰男士长靴', '13500.00', '3711.00', '2.8', '40-42', '黑色', '3', 'men', '19', null, null);
INSERT INTO `goodslist` VALUES ('36', '036', '蓝灰色领饰长袖衬衫 ', '5350.00', '1551.00', '2.9', '38-39-41', '蓝灰色', '3', 'men', '5', null, null);
INSERT INTO `goodslist` VALUES ('37', '037', '拼色涂鸦印花短袖衬衫', '4950.00', '1076.00', '2.2', '39-40-41-42', '拼色', '3', 'men', '20', null, null);
INSERT INTO `goodslist` VALUES ('38', '038', '黑色小毛球长袖针织开衫 ', '8120.00', '1765.00', '2.2', '50-52', '黑色', '3', 'men', '1', null, null);
INSERT INTO `goodslist` VALUES ('39', '039', '橙白拼色格纹提花针织开衫', '7860.00', '1709.00', '2.2', '48-50-52', '拼色', '3', 'men', '28', null, null);
INSERT INTO `goodslist` VALUES ('40', '040', ' 深蓝色休闲西装外套', '12580.00', '2735.00', '2.2', '48-50-52-54', '深蓝色', '3', 'men', '55', null, null);
INSERT INTO `goodslist` VALUES ('41', '041', 'TRAVEL剃须旅行套装', '6004.00', '2890.00', '4.9', '', '棕色', '3', 'men', '18', null, null);
INSERT INTO `goodslist` VALUES ('42', '042', 'VIVO系列树脂吉列锋隐剃须刀', '2036.00', '860.00', '4.3', '', '蓝色', '1', 'men', '28', null, null);
INSERT INTO `goodslist` VALUES ('43', '043', '卡文克莱卡莱优淡香水100ml', '510.00', '218.00', '4.3', '', '白色', '1', 'men', '10', null, null);
INSERT INTO `goodslist` VALUES ('44', '044', '棕色表带方形男士手表', '1950.00', '975.00', '5.0', '', '棕色', '3', 'men', '99', null, null);
INSERT INTO `goodslist` VALUES ('45', '045', '黑白拼色几何图案长袖针织衫', '4300.00', '2150.00', '5.0', 'L-XL', '拼色', '4', 'men', '10', null, null);
INSERT INTO `goodslist` VALUES ('46', '046', '浅蓝色八角领几何印花长袖衬衫', '3150.00', '1260.00', '4.0', '38-42-43', '浅蓝色', '3', 'men', '99', null, null);
INSERT INTO `goodslist` VALUES ('47', '047', '深蓝色花纹字母印花男士圆领短袖T恤', '1200.00', '420.00', '3.5', 'XS-S-M', '深蓝色', '3', 'men', '88', null, null);
INSERT INTO `goodslist` VALUES ('48', '048', '黄色简约插袋男士短裤', '1300.00', '455.00', '3.5', '31-32-33-34', '黄色', '3', 'men', '66', null, null);
INSERT INTO `goodslist` VALUES ('49', '049', '浅紫色饰贴袋短袖衬衫 ', '2400.00', '480.00', '2.0', '39-40', '浅紫色', '3', 'men', '18', null, null);
INSERT INTO `goodslist` VALUES ('50', '050', '黑红拼色字母印花男士圆领短袖T恤', '1200.00', '600.00', '5.0', 'XS-L', '拼色', '3', 'men', '8', null, null);
INSERT INTO `goodslist` VALUES ('51', '051', '路易威登香水迷你套装（送lv拎袋）', '2800.00', '1400.00', '5.0', '', '', '1', 'beauty', '10', null, null);
INSERT INTO `goodslist` VALUES ('52', '052', 'Albion 宝格丽奢华蜜粉饼 8.9g', '2280.00', '1888.00', '8.3', '', '', '2', 'beauty', '29', null, null);
INSERT INTO `goodslist` VALUES ('53', '053', '路易威登暗涌香水100ml套装（送lv拎袋）', '2250.00', '2000.00', '8.0', '', '', '1', 'beauty', '8', null, null);
INSERT INTO `goodslist` VALUES ('54', '054', ' 阿玛尼轻垫精华粉底液3 SPF45', '630.00', '570.00', '9.0', '', '3', '1', 'beauty', '5', null, null);
INSERT INTO `goodslist` VALUES ('55', '055', 'ReFa CARAT RAY 双球滚轮波光美容仪瘦脸', '1740.00', '1200.00', '6.0', '', '', '1', 'beauty', '99', null, null);
INSERT INTO `goodslist` VALUES ('56', '056', '纪梵希禁忌之吻大理石纹唇膏3.4g ', '320.00', '240.00', '6.6', '', 'N25', '1', 'beauty', '66', null, null);
INSERT INTO `goodslist` VALUES ('57', '057', '后天气丹花献系列及护肤品礼盒78ml', '2217.00', '358.00', '1.7', '', '', '3', 'beauty', '12', null, null);
INSERT INTO `goodslist` VALUES ('58', '058', '倩碧三部曲护肤套装1', '215.00', '99.00', '4.7', '', '', '3', 'beauty', '99', null, null);
INSERT INTO `goodslist` VALUES ('59', '059', '多效智妍系列套装', '1066.00', '368.00', '3.5', '', '', '1', 'beauty', '55', null, null);
INSERT INTO `goodslist` VALUES ('60', '060', '雅诗兰黛肌初赋活原生液200ml', '860.00', '699.00', '8.2', '', '', '1', 'beauty', '88', null, null);
INSERT INTO `goodslist` VALUES ('61', '061', '雅诗兰黛 花漾倾慕唇膏- 320 3.5g', '300.00', '248.00', '8.3', '', '', '1', 'beauty', '88', null, null);
INSERT INTO `goodslist` VALUES ('62', '062', '原装进口耐热玻璃水壶', '240.00', '108.00', '4.5', null, '白色', '2', 'house', '18', null, null);
INSERT INTO `goodslist` VALUES ('63', '063', '日本masada白色珐琅烧水壶2.3L ', '1528.00', '449.00', '3.0', null, '白色', '3', 'house', '20', null, null);
INSERT INTO `goodslist` VALUES ('64', '064', '进口透明家用咖啡壶套装', '248.00', '159.00', '6.5', null, '透明', '2', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('65', '065', '红色迷你咖啡研磨机', '280.00', '189.00', '6.8', null, '红色', '2', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('66', '066', '意大利进口红色小型分体式手动压面机', '3980.00', '1399.00', '3.6', '红色', '红色', '1', 'house', '10', '<p><img src=\"http://localhost:10086/img/file161505994924958.jpg\"><br></p><p><br></p><p>66666666</p><img src=\"http://localhost:10086/img/file851505995016768.jpg\">', '非常棒的压面机，推荐');
INSERT INTO `goodslist` VALUES ('67', '067', '德国进口豪华烫衣板140*40cm ', '3672.00', '1049.00', '2.9', null, '浅蓝色', '2', 'house', '88', null, null);
INSERT INTO `goodslist` VALUES ('68', '068', ' Tiffany蓝色1750cc凉水壶', '842.00', '278.00', '3.4', null, '蓝色', '2', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('69', '069', '设计师银灰色踏板垃圾筒16L', '1800.00', '699.00', '3.9', null, '银灰色', '2', 'house', '88', null, null);
INSERT INTO `goodslist` VALUES ('70', '070', '德国进口Starlight亚光不锈钢保温壶1.0L ', '3025.00', '872.00', '2.9', null, '银色', '2', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('71', '071', 'Thermo棕色德国熊创意保温壶1.0L', '840.00', '359.00', '4.3', null, '棕色', '2', 'house', '18', null, null);
INSERT INTO `goodslist` VALUES ('72', '072', 'NEW YORK潮牌 防水手提包 糖果点点', '649.00', '259.00', '4.0', null, '驼色', '2', 'house', '88', null, null);
INSERT INTO `goodslist` VALUES ('73', '073', 'StefanPlast蓝色多功能收纳箱', '726.00', '249.00', '3.5', null, '蓝色', '1', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('74', '074', '拼色卡通图案印花圆领长袖男童上衣 ', '349.00', '184.00', '5.3', '110\\68-120\\72-130\\76', '拼色', '1', 'baby', '88', null, null);
INSERT INTO `goodslist` VALUES ('75', '075', '拼色毛圈春亚纺耳朵装饰帽 ', '299.00', '179.00', '6.0', '54-52-50', '拼色', '2', 'baby', '99', null, null);
INSERT INTO `goodslist` VALUES ('76', '076', '粉蓝拼色毛圈迷彩款连体衣', '599.00', '300.00', '5.1', '59', '拼色', '2', 'baby', '18', null, null);
INSERT INTO `goodslist` VALUES ('77', '077', '尘雾粉精梳棉宽松开襟毛衫', '429.00', '257.00', '6.0', '80-90-100-110', '拼色', '2', 'baby', '40', null, null);
INSERT INTO `goodslist` VALUES ('78', '078', '玫瑰水粉拼色毛圈奶油滴落连体服', '529.00', '265.00', '5.1', '59', '拼色', '3', 'baby', '29', null, null);
INSERT INTO `goodslist` VALUES ('79', '079', '绿灰拼色毛圈迷彩款连体衣', '599.00', '300.00', '5.1', '59', '拼色', '2', 'baby', '18', null, null);
INSERT INTO `goodslist` VALUES ('80', '080', '深蓝色针织牛仔双色拼接连体衣 ', '699.00', '419.00', '6.0', '59', '拼色', '1', 'baby', '99', null, null);
INSERT INTO `goodslist` VALUES ('81', '081', '2岁+酷玩三轮车', '778.00', '478.00', '6.2', null, '黄色', '3', 'baby', '88', null, null);
INSERT INTO `goodslist` VALUES ('82', '082', '3岁+迷你架子鼓 ', '468.00', '328.00', '7.1', null, '彩色', '2', 'baby', '10', null, null);
INSERT INTO `goodslist` VALUES ('83', '083', '3岁+30键黑色钢琴', '1558.00', '1098.00', '7.1', null, '黑色', '1', 'baby', '9', null, null);
INSERT INTO `goodslist` VALUES ('84', '084', '3岁+过家家情景玩具停车场', '648.00', '398.00', '6.2', null, '彩色', '2', 'baby', '99', null, null);
INSERT INTO `goodslist` VALUES ('85', '085', '3岁+玩具吉他蓝色', '298.00', '228.00', '7.7', null, '蓝色', '2', 'baby', '88', null, null);
INSERT INTO `goodslist` VALUES ('86', '086', '2017新品PVC魔鬼图案单肩女包', '1890.00', '1236.00', '6.6', null, '番茄红', '2', 'outsea', '3', null, null);
INSERT INTO `goodslist` VALUES ('87', '087', '2017新款女士蜻蜓印花牛皮时尚单肩斜挎包 ', '3500.00', '1870.00', '5.4', null, '印花', '2', 'outsea', '19', null, null);
INSERT INTO `goodslist` VALUES ('88', '088', '金属质感精纺格纹羊绒围巾', '5500.00', '3799.00', '7.0', null, '棕色格纹', '2', 'outsea', '99', null, null);
INSERT INTO `goodslist` VALUES ('89', '089', '兰蔻新立体塑颜紧致滋润霜 50ml', '895.00', '689.00', '7.7', null, null, '2', 'outsea', '99', null, null);
INSERT INTO `goodslist` VALUES ('90', '090', '怡丽丝尔 纯肌净白晶润乳I清爽型 130mL', '400.00', '399.00', '8.5', null, null, '1', 'outsea', '8', null, null);
INSERT INTO `goodslist` VALUES ('91', '091', '白色中性百搭格纹流苏围巾', '4880.00', '2499.00', '5.2', null, '白色', '2', 'outsea', '88', null, null);
INSERT INTO `goodslist` VALUES ('92', '092', '多色格纹样式女士围巾', '3800.00', '2699.00', '7.2', null, '象牙色', '2', 'outsea', '66', null, null);
INSERT INTO `goodslist` VALUES ('93', '093', 'COACH女款黑皮质单肩包托特包', '2788.00', '1279.00', '4.6', null, '黑色', '3', 'outsea', '88', null, null);
INSERT INTO `goodslist` VALUES ('94', '094', '新款翻盖式可折叠织物棕色钱包', '2400.00', '1599.00', '6.7', null, '棕色', '2', 'outsea', '10', null, null);
INSERT INTO `goodslist` VALUES ('95', '095', '女士JetSet系列中号手提包', '4000.00', '1999.00', '5.0', null, '桔色', '2', 'outsea', '3', null, null);
INSERT INTO `goodslist` VALUES ('96', '096', '女包蓝色牛仔配皮女士手提单肩包', '3800.00', '2029.00', '5.4', null, '蓝色', '2', 'outsea', '78', null, null);
INSERT INTO `goodslist` VALUES ('97', '097', '女士MERCER系列大号单肩手提包', '4500.00', '1799.00', '4.0', null, '黑色', '3', 'outsea', '2', null, null);
INSERT INTO `goodslist` VALUES ('98', '098', '灰黑拼色半框光学眼镜', '5200.00', '1288.00', '2.5', null, null, '4', 'men', '10', null, null);
INSERT INTO `goodslist` VALUES ('99', '099', '天蓝色3/4杯V型百搭光面聚拢文胸', '359.00', '199.00', '5.6', '80A-80B-85C', '天蓝色', '4', 'women', '10', null, null);
INSERT INTO `goodslist` VALUES ('100', '100', '17年新款棕色渐变车线拼接金属环扣女士肩挎包', '20380.00', '15999.00', '7.9', null, '棕色', '3', 'women', '99', null, null);
INSERT INTO `goodslist` VALUES ('101', '101', '2017新品暗红色麂皮绒编织铆钉工艺细节流苏单肩包', '13740.00', '11899.00', '8.7', null, '暗红色', '3', 'women', '1', null, null);
INSERT INTO `goodslist` VALUES ('102', '102', '绿色廓形腰带设计连衣裙', '11400.00', '2736.00', '2.4', '36-40', '绿色', '4', 'women', '18', null, null);
INSERT INTO `goodslist` VALUES ('103', '103', '蓝色简约女士连衣裙', '10000.00', '2400.00', '2.4', '36', '蓝色', '3', 'women', '88', null, null);
INSERT INTO `goodslist` VALUES ('104', '104', '酒红色流苏装饰连衣裙', '35100.00', '8424.00', '2.4', '34-36', '酒红色', '4', 'women', '19', null, null);
INSERT INTO `goodslist` VALUES ('105', '105', '紫色圆领露腰连衣裙', '31500.00', '7560.00', '2.4', '36-38-40', '紫色', '4', 'women', '10', null, null);
INSERT INTO `goodslist` VALUES ('106', '106', '深蓝色翻领落肩袖外套', '8700.00', '2088.00', '2.4', '36-40', '深蓝色', '4', 'women', '88', null, null);
INSERT INTO `goodslist` VALUES ('107', '107', '宝蓝色V领长袖连体裤', '28100.00', '6744.00', '2.4', '40', '宝蓝色', '4', 'women', '1', null, null);
INSERT INTO `goodslist` VALUES ('108', '108', ' 米色针扣式高跟凉鞋', '7700.00', '2310.00', '3.0', '36-37-36.5-37.5', '米色', '4', 'women', '10', null, null);
INSERT INTO `goodslist` VALUES ('109', '109', '黑色五星图案手提包', '11200.00', '3920.00', '3.5', null, '黑色', '4', 'women', '10', null, null);
INSERT INTO `goodslist` VALUES ('110', '110', '棕色方框太阳眼镜 ', '2400.00', '720.00', '3.0', null, null, '3', 'women', '28', null, null);
INSERT INTO `goodslist` VALUES ('111', '111', '红色五星图案手提包', '11900.00', '4165.00', '3.5', null, '红色', '3', 'women', '15', null, null);
INSERT INTO `goodslist` VALUES ('112', '112', '杏色几何花纹系腰带连衣裙（女童）', '870.00', '261.00', '3.0', '3', '杏色', '3', 'baby', '10', null, null);
INSERT INTO `goodslist` VALUES ('113', '113', '藏青色字母设计印花男士短袖T恤', '590.00', '295.00', '5.0', '03-04-05-06', '藏青色', '3', 'men', '99', null, null);
INSERT INTO `goodslist` VALUES ('114', '114', '灰色拉链连帽领男士长袖卫衣', '1190.00', '595.00', '5.0', '06', '灰色', '4', 'men', '10', null, null);
INSERT INTO `goodslist` VALUES ('115', '115', '藏青色拼接条纹立领男士长袖上衣', '1490.00', '745.00', '5.0', '03-04-05-06', '藏青色', '3', 'men', '99', null, null);
INSERT INTO `goodslist` VALUES ('116', '116', '蓝色系带男士休闲鞋', '4920.00', '2620.00', '5.5', '39-41-42-43', '蓝色', '4', 'men', '44', null, null);
INSERT INTO `goodslist` VALUES ('117', '117', '黑色金属扣简约男士皮带', '2660.00', '1454.00', '5.5', '100-105-110', '黑色', '1', 'men', '10', null, null);
INSERT INTO `goodslist` VALUES ('118', '118', '黑色色带男士休闲鞋', '3800.00', '2077.00', '5.5', '250-240', '黑色', '3', 'men', '19', null, null);
INSERT INTO `goodslist` VALUES ('119', '119', '深咖色几何印花八角领长袖男士衬衫', '3810.00', '2083.00', '5.5', '15', '深咖色', '3', 'men', '1', null, null);
INSERT INTO `goodslist` VALUES ('120', '120', '红色色带男士豆豆鞋', '3500.00', '1913.00', '5.5', '41', '红色', '3', 'men', '3', null, null);
INSERT INTO `goodslist` VALUES ('121', '121', '浅棕色LOGO金属扣男士皮带', '3190.00', '1744.00', '5.5', '100', '浅棕色', '1', 'men', '10', null, null);
INSERT INTO `goodslist` VALUES ('122', '122', 'WHOO后拱辰享气韵生系列5件套（64ML）', '791.00', '218.00', '2.8', null, null, '2', 'beauty', '10', null, null);
INSERT INTO `goodslist` VALUES ('123', '123', '贝玲妃大放睛采眼线笔迷你装 EM09 0.36g', '98.00', '68.00', '7.0', null, null, '1', 'beauty', '3', null, null);
INSERT INTO `goodslist` VALUES ('124', '124', '碧欧泉年轻水润套装', '1363.00', '1088.00', '8.0', null, null, '3', 'beauty', '99', null, null);
INSERT INTO `goodslist` VALUES ('125', '125', 'WHOO后拱辰享水水沄系列3件套(44ml)', '194.00', '168.00', '8.7', null, null, '3', 'beauty', '12', null, null);
INSERT INTO `goodslist` VALUES ('126', '126', 'GRA 蒂芙尼蓝造型蛋香氛皂（6入附小玻璃罐）170g', '320.00', '228.00', '7.2', null, null, '1', 'beauty', '10', null, null);
INSERT INTO `goodslist` VALUES ('127', '127', '欧舒丹乳木果滋润套装', '695.00', '658.00', '9.5', null, null, '3', 'beauty', '99', null, null);
INSERT INTO `goodslist` VALUES ('128', '128', '兰蔻水份缘5件套 ', '1096.00', '339.00', '3.1', null, null, '2', 'beauty', '10', null, null);
INSERT INTO `goodslist` VALUES ('129', '129', '伊丽莎白雅顿 致臻护肤套装', '1976.00', '1410.00', '7.2', null, null, '2', 'beauty', '3', null, null);
INSERT INTO `goodslist` VALUES ('130', '130', '后拱辰享玉凝臻享4件套 ', '337.00', '168.00', '5.0', null, null, '1', 'beauty', '1', null, null);
INSERT INTO `goodslist` VALUES ('131', '131', '新娘的秘密:密集无痕套装 9月特惠价', '2800.00', '1980.00', '7.1', null, null, '2', 'beauty', '6', null, null);
INSERT INTO `goodslist` VALUES ('132', '132', '澳洲95%白鸭绒子母被200*230cm', '7388.00', '3200.00', '4.4', null, '白色', '3', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('133', '133', '黑白经典毛皮拼接地毯0.4*0.6m', '530.00', '299.00', '5.7', null, '拼色', '3', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('134', '134', '澳洲精品60支长绒棉丝光贡缎绣花靠垫—卡洛45*45CM', '398.00', '149.00', '3.8', null, '白色', '2', 'house', '88', null, null);
INSERT INTO `goodslist` VALUES ('135', '135', '永恒之美毛皮拼接地毯2*3m ', '17160.00', '7990.00', '4.7', null, '拼色', '3', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('136', '136', '澳洲95%白鹅绒春秋被180*220cm', '2868.00', '1199.00', '4.2', null, '白色', '3', 'house', '98', null, null);
INSERT INTO `goodslist` VALUES ('137', '137', '5%白鹅绒羽绒床垫(1.5米) ', '3188.00', '1099.00', '3.5', null, '白色', '3', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('138', '138', '【白宫御厨推荐】多功能果汁机赠随行杯和饭盒', '598.00', '298.00', '5.0', null, '拼色', '3', 'house', '3', null, null);
INSERT INTO `goodslist` VALUES ('139', '139', '金边大师年轮碗碟盘子餐具套装40件 ', '4880.00', '1199.00', '2.5', null, '拼色', '3', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('140', '140', '黑色咖啡机ECAM21.117.SB', '6900.00', '5590.00', '8.2', null, '黑色', '2', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('141', '141', '尼斯阳光黄法兰西铸铝陶瓷汤锅4.8L', '1899.00', '259.00', '1.4', null, '黄色', '3', 'house', '88', null, null);
INSERT INTO `goodslist` VALUES ('142', '142', '优质超爽被220*240cm', '3688.00', '2388.00', '6.5', null, '白色', '3', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('143', '143', 'Botanic Garden系列组合餐盘（4碗1碟）', '1688.00', '588.00', '3.5', null, '白色', '3', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('144', '144', 'Style刀具7件套', '2068.00', '799.00', '3.9', null, '拼色', '1', 'house', '1', null, null);
INSERT INTO `goodslist` VALUES ('145', '145', '艾尼天丝60支四件套1.5米', '4200.00', '990.00', '2.4', null, '粉紫色', '3', 'house', '8', null, null);
INSERT INTO `goodslist` VALUES ('146', '146', '彩色伊罗柯6色水杯套装（300ml）', '960.00', '469.00', '4.9', null, '彩色', '3', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('147', '147', ' SW-EAE50-AB闷烧杯蓝色500ml ', '518.00', '359.00', '7.0', null, '蓝色', '3', 'house', '99', null, null);
INSERT INTO `goodslist` VALUES ('148', '148', '蓝色印尼进口割绒印花澳洲精梳棉面巾（4条装）', '439.00', '109.00', '2.5', null, '蓝色', '3', 'house', '6', null, null);
INSERT INTO `goodslist` VALUES ('149', '149', '韩国进口蓝宝石无烟不粘炒锅30cm（加赠小煎锅20cm) ', '599.00', '258.00', '4.4', null, '蓝色', '3', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('150', '150', '黑色大尺寸自动识别各指标健康秤', '1578.00', '628.00', '4.0', null, '黑色', '3', 'house', '3', null, null);
INSERT INTO `goodslist` VALUES ('151', '151', '绝版纯水晶Dampierre石之花语高脚杯26CL（6只装）', '2910.00', '873.00', '3.0', null, '透明', '2', 'house', '9', null, null);
INSERT INTO `goodslist` VALUES ('152', '152', 'LadyDiamond情迷钻石古典杯27CL（6只装）', '1298.00', '425.00', '3.3', null, '透明', '2', 'house', '10', null, null);
INSERT INTO `goodslist` VALUES ('157', '157', '5353543543', '433.00', '333.00', null, '', '', '1', 'women', '323', '<p>2143432</p>', '43543543543543');
INSERT INTO `goodslist` VALUES ('1', '001', 'EVE’S TEMPTATION 玫红色3/4杯钢圈围薄杯文胸', '328.00', '128.00', '4.0', '70C-75B-75C-80C', '玫红色', '3', 'women', '66', '<p><img src=\"http://localhost:10086/img/file331505996269353.jpg\"><br></p><p>45645645645645</p>', '物美价廉 很好');

-- ----------------------------
-- Table structure for userlist
-- ----------------------------
DROP TABLE IF EXISTS `userlist`;
CREATE TABLE `userlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `carlist` varchar(255) DEFAULT NULL,
  `nicheng` varchar(255) DEFAULT NULL,
  `xingbie` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `dizhi` varchar(255) DEFAULT NULL,
  `youbian` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userlist
-- ----------------------------
INSERT INTO `userlist` VALUES ('1', '346692921@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '145//1', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('18', '76576576765@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('19', '4534532765@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('20', '4324465656@qq.com', 'e10adc3949ba59abbe56e057f20f883e', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('21', '13123452343', '123ef9cc0b45a0f6321a877589ebc5a4', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('22', '54543435345@qq.com', 'e10adc3949ba59abbe56e057f20f883e', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('23', '5435435435@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '077/100/2', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('24', '221435435@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('25', '13135641649', '123ef9cc0b45a0f6321a877589ebc5a4', '029/40/5-029/41/2-029/42/1-029/39/1', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('26', '18578650260', 'bba72d6ae7bfde5bf75ba8f7e21e845b', null, '张国荣', '男', '/js/mulu/logo-1506048955254.jpg', '广东省', '广州市', '越秀区', '张国荣', '18578650260', '', '');
INSERT INTO `userlist` VALUES ('27', '15591593521', 'bba72d6ae7bfde5bf75ba8f7e21e845b', null, '不多', '女', '/js/mulu/logo-1506078959114.png', '广东省', '广州市', '越秀区', '痛苦啊', '17834323532', '', '');
INSERT INTO `userlist` VALUES ('28', '13371368702', 'bba72d6ae7bfde5bf75ba8f7e21e845b', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `userlist` VALUES ('29', '304991138@qq.com', '4716485', null, '你好我也好', '男', '/js/mulu/logo-1506047927825.png', '广东省', '广州市', '越秀区', null, null, null, null);
INSERT INTO `userlist` VALUES ('30', 'admin', 'e10adc3949ba59abbe56e057f20f883e', null, '杰森.郭达', '男', '/js/mulu/logo-1506052290672.bmp', '广东省', '广州市', '越秀区', null, null, null, null);
INSERT INTO `userlist` VALUES ('31', '13071368578', 'e10adc3949ba59abbe56e057f20f883e', null, null, null, null, '广东省', '广州市', '越秀区', 'sssssssss', '', '', '');
SET FOREIGN_KEY_CHECKS=1;
