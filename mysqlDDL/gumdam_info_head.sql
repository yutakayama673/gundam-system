CREATE TABLE `gumdam_info_head` (
  `parts_id` varchar(10) NOT NULL COMMENT 'モビルスーツ部品ID（主キーの一部）',
  `mobile_suit_number` varchar(20) NOT NULL COMMENT 'モビルスーツ型番（主キーの一部）',
  `parts_index` decimal(3,0) NOT NULL COMMENT '部品配列（表示順）',
  `parts_name` varchar(100) NOT NULL COMMENT 'モビルスーツ部品名',
  `parts_function` varchar(1000) NOT NULL COMMENT '部品の機能',
  `parts_discription` varchar(1000) NOT NULL COMMENT '部品の説明',
  `metal_kbn` varchar(200) NOT NULL COMMENT '使用金属コード（1〜5）',
  `parts_category` varchar(10) NOT NULL COMMENT '部品カテゴリ（Head, Armsなど）',
  
  -- 🔽 複合主キーに変更
  PRIMARY KEY (`mobile_suit_number`, `parts_id`),
  
  -- 表示順のユニーク制約はそのまま維持
  UNIQUE KEY `uq_ms_index` (`mobile_suit_number`, `parts_index`),
  
  -- インデックスもそのまま
  KEY `idx_mobile_suit_number` (`mobile_suit_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='モビルスーツ部品（頭部など）';
