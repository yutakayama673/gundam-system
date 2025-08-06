CREATE TABLE `gumdam_info_master` (
  `mobile_suit_id` bigint NOT NULL AUTO_INCREMENT,
  `mobile_suit_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile_suit_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pilot` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_design_date` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_design_date` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `belong` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_front` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_back` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mobile_suit_id`),
  UNIQUE KEY `mobile_suit_number` (`mobile_suit_number`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci