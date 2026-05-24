CREATE TABLE `work_modes` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `sort_order` INTEGER NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `work_modes_name_key`(`name`),
  INDEX `work_modes_is_active_sort_order_idx`(`is_active`, `sort_order`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `attendance_check_ins` (
  `id` CHAR(36) NOT NULL,
  `employee_id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `date` DATE NOT NULL,
  `work_mode_id` CHAR(36) NOT NULL,
  `check_in_at` DATETIME(3) NOT NULL,
  `note` TEXT NULL,
  `location` VARCHAR(160) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `attendance_check_ins_employee_id_date_key`(`employee_id`, `date`),
  INDEX `attendance_check_ins_user_id_idx`(`user_id`),
  INDEX `attendance_check_ins_work_mode_id_idx`(`work_mode_id`),
  INDEX `attendance_check_ins_date_idx`(`date`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `attendance_check_ins`
  ADD CONSTRAINT `attendance_check_ins_employee_id_fkey`
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `attendance_check_ins`
  ADD CONSTRAINT `attendance_check_ins_user_id_fkey`
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `attendance_check_ins`
  ADD CONSTRAINT `attendance_check_ins_work_mode_id_fkey`
  FOREIGN KEY (`work_mode_id`) REFERENCES `work_modes`(`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO `work_modes` (`id`, `name`, `is_active`, `sort_order`, `updated_at`) VALUES
  (UUID(), 'Office', true, 10, CURRENT_TIMESTAMP(3)),
  (UUID(), 'Remote', true, 20, CURRENT_TIMESTAMP(3)),
  (UUID(), 'Hybrid', true, 30, CURRENT_TIMESTAMP(3)),
  (UUID(), 'Client site', true, 40, CURRENT_TIMESTAMP(3));
