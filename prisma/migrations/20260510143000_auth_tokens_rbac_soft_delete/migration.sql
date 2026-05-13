ALTER TABLE `users`
  ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
  ADD COLUMN `permissions` JSON NULL,
  ADD COLUMN `deleted_at` DATETIME(3) NULL;

CREATE TABLE `refresh_tokens` (
  `id` CHAR(36) NOT NULL,
  `token_hash` VARCHAR(255) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `expires_at` DATETIME(3) NOT NULL,
  `revoked_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  INDEX `refresh_tokens_user_id_idx`(`user_id`),
  INDEX `refresh_tokens_expires_at_idx`(`expires_at`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_user_id_fkey`
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;
