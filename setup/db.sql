CREATE TABLE signups | CREATE TABLE `signups` (
  `email` varchar(250) NOT NULL,
  `firstname` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `etp_address` varchar(200) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unverified',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `language` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
