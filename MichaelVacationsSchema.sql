/*
https://caesaru-vacations.herokuapp.com/
*/ 
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(30) DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2;

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `location` text NOT NULL,
  `starting_date` date NOT NULL,
  `ending_date` date NOT NULL,
  `price` int(11) NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5;

CREATE TABLE `followed_vacations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `follower_id` (`follower_id`),
  KEY `vacation_id` (`vacation_id`),
  CONSTRAINT `followed_vacations_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`),
  CONSTRAINT `followed_vacations_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/**
username: crazierlattice
password:1331
*/
-- INSERT INTO users(first_name,last_name,username,password,role)
-- VALUES("Michael","Koinov","crazierlattice","$2b$10$IUZvFXE7NR9XQ9ODDjWxa.xgV5CKWiooZ892ZEq9jQBTeOpn4bwHC","admin");



