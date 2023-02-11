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


-- INSERT INTO vacations (description, location, starting_date, ending_date, price, image)
-- VALUES
-- ('Relaxing beach vacation', 'Hawaii', '2023-06-01', '2023-06-08', 2000, 'https://www.planetware.com/wpimages/2019/12/hawaii-in-pictures-beautiful-places-to-photograph-hanauma-bay-oahu.jpg'),
-- ('Adventure in the mountains', 'Banff', '2023-07-15', '2023-07-22', 2500, 'https://media.istockphoto.com/id/525508231/photo/moraine-lake-rocky-mountains-canada.jpg?b=1&s=170667a&w=0&k=20&c=V1EercOdSTrzvMt2Nr1d6TyftK2iasH5fHUKVCY7QMg='),
-- ('City break in Europe', 'Paris', '2023-08-01', '2023-08-05', 1500, 'https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075__340.jpg'),
-- ('Cultural trip to Asia', 'Tokyo', '2023-09-01', '2023-09-08', 3000, 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/high-angle-view-of-tokyo-skyline-at-dusk-japan-royalty-free-image-1664309926.jpg'),
-- ('Exotic island getaway', 'Bali', '2023-10-01', '2023-10-08', 2000, 'https://media.istockphoto.com/id/675172642/photo/pura-ulun-danu-bratan-temple-in-bali.jpg?s=612x612&w=0&k=20&c=_MPdmDviIyhldqhf7t6s63C-bZbTGfNHMlJP9SIa8Y0='),
-- ('Ski trip in the Alps', 'Chamonix', '2023-11-01', '2023-11-08', 2500, 'https://media.istockphoto.com/id/592030352/photo/chamonix-france-with-mont-blanc-mountain-range.jpg?s=612x612&w=0&k=20&c=cjucGKkl-3NJslXJxKdyh26xMU-A0G79EVNRTGcNQjM='),
-- ('Explore South America', 'Rio de Janeiro', '2023-12-01', '2023-12-08', 3000, 'https://media.istockphoto.com/id/608540602/photo/aerial-panorama-of-botafogo-bay-rio-de-janeiro.jpg?s=612x612&w=0&k=20&c=9vsK_9r4ldoLyfS6oLnUbvpQOgYCfzr4xCZ1-YFNJZo='),
-- ('Cruise along the Mediterranean', 'Barcelona', '2023-01-01', '2023-01-08', 4000, 'https://media.istockphoto.com/id/1301579230/photo/spanish-cities-the-sacred-barcelona-family.jpg?b=1&s=170667a&w=0&k=20&c=HKnSy_PCFZ4uPAfaxnLiHCrKjZZHRRQam039UjgTprA='),
-- ('Discover Africa', 'Cape Town', '2023-02-01', '2023-02-08', 5000, 'https://media.istockphoto.com/id/620737858/photo/cape-town-and-the-12-apostels-from-above.jpg?s=612x612&w=0&k=20&c=WPP0CFtX4y-eHwplbZ1DvPP9bnGjjpz4U4ZZvj8i8Tc='),
-- ('Road trip through the USA', 'Los Angeles', '2023-03-01', '2023-03-08', 3000, 'https://media.gettyimages.com/id/478821794/photo/skyscrapers-of-los-angeles-skyline-architecture-urban-cityscape.jpg?s=612x612&w=gi&k=20&c=U6nJ6S2LdKNEurOJV2p86FMFBKoU5FAKSHgFgecYMwY=');




