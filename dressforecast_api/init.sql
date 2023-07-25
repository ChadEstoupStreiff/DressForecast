CREATE TABLE `Users` (
  `fullname` varchar(128) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256),
  CONSTRAINT PK_User PRIMARY KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
