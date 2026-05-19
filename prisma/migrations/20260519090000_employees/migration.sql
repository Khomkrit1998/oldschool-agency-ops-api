CREATE TABLE `employees` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `nickname` VARCHAR(40) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(40) NOT NULL,
  `employee_code` VARCHAR(32) NOT NULL,
  `position` VARCHAR(120) NOT NULL,
  `team` VARCHAR(80) NOT NULL,
  `manager` VARCHAR(120) NOT NULL,
  `status` ENUM('ACTIVE', 'PROBATION', 'LEAVE', 'INACTIVE') NOT NULL DEFAULT 'PROBATION',
  `employment_type` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT') NOT NULL,
  `utilization` INTEGER NOT NULL DEFAULT 0,
  `location` VARCHAR(80) NOT NULL,
  `start_date` DATE NOT NULL,
  `last_check_in` VARCHAR(80) NULL,
  `created_by_id` CHAR(36) NULL,
  `deleted_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `employees_email_key`(`email`),
  UNIQUE INDEX `employees_employee_code_key`(`employee_code`),
  INDEX `employees_team_idx`(`team`),
  INDEX `employees_status_idx`(`status`),
  INDEX `employees_created_by_id_idx`(`created_by_id`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `employee_probation_reviews` (
  `id` CHAR(36) NOT NULL,
  `employee_id` CHAR(36) NOT NULL,
  `checkpoint` INTEGER NOT NULL,
  `status` ENUM('PASSED', 'PENDING', 'REVIEW', 'FAILED') NOT NULL DEFAULT 'PENDING',
  `score` INTEGER NULL,
  `review_date` DATE NOT NULL,
  `note` TEXT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `employee_probation_reviews_employee_id_checkpoint_key`(`employee_id`, `checkpoint`),
  INDEX `employee_probation_reviews_review_date_idx`(`review_date`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `employee_probation_reviews`
  ADD CONSTRAINT `employee_probation_reviews_employee_id_fkey`
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;
