--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists funFacts;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE funFacts(id INT NOT NULL AUTO_INCREMENT, text VARCHAR(225) NOT NULL, PRIMARY KEY (id));
INSERT INTO funFacts (text) VALUES ("The Sun and the Moon are not the same size."),("The Moon's surface is actually dark"),
("The Moon is drifting away from the Earth"), ("The Moon was made when a rock smashed into Earth");
