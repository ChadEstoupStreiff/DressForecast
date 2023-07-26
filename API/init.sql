CREATE TABLE `Users` (
  `user_mail` varchar(128) NOT NULL,
  `user_password` BLOB(512),
  `user_name` varchar(256),
  `user_sex` varchar(6),
  `user_country` varchar(256),
  `user_city` varchar(256),
  CONSTRAINT PK_User PRIMARY KEY (user_mail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
