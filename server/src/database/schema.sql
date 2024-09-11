START TRANSACTION;

CREATE DATABASE IF NOT EXISTS to_do_db;

USE to_do_db;

-- SET time_zone = 'Australia/Sydney';
DROP TABLE IF EXISTS `Tasks`;

CREATE TABLE
  IF NOT EXISTS `Tasks` (
    `TaskID` INT (11) NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(100) NOT NULL,
    `Description` TEXT NOT NULL,
    `Status` ENUM ('pending', 'completed') NOT NULL,
    PRIMARY KEY (`TaskID`)
  );

COMMIT;