CREATE TABLE `part_file_info` (
  `mobile_suit_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'モビルスーツ型番',
  `parts_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '部品種別',
  `parts_id` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '部品ID（表示順などに使う）',
  `filedir` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ファイル保存先ディレクトリ',
  PRIMARY KEY (`filedir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci