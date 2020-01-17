-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gallery_db
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `photo` varchar(36) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `email2` varchar(50) DEFAULT NULL,
  `movile` varchar(20) DEFAULT NULL,
  `movile2` varchar(20) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postal_code` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_index` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Conn','O\'Caherny','cocaherny0','pqvHNOJRIFsu','d3b9e21c-072a-4a6c-8fd2-5867166c425e','2019-11-11','cocaherny@webeden.co.uk','cocaherny1@nydailynews.com','902-413-8628','230-715-2563','2003-02-09',1,'Antigua & Barbuda','Perpignan','66019 CXT'),(2,'Liam','Benedite','lbenedite1','123456','ec0d4fe0-f089-44b0-a8f7-337f4bd6e0c8','2018-02-12','lbenedite1@sciencedirect.com','lbenedite1@sciencedirect.com','452-523-3476','452-523-3476','1971-10-29',1,'Brazil','Sao Paulo','11 XX45'),(3,'Deerdre','Henden','dhenden2','x77dsENWo','4f2cdc17-36f8-4f1f-b654-53eaf31b9b06','2019-02-15','dhenden2@columbia.edu','dhenden2@webmd.com','599-997-7215','820-213-0216','1977-12-09',0,'Sudan','El Bauga','3322'),(4,'Bryce','Borzone','bborzone3','yceT6AaY2PB',NULL,'2018-05-07','bborzone3@gov.uk','bborzone3@cmu.edu','937-131-5781','175-670-3724','2002-08-03',1,'China','Jixin','1114'),(5,'Emogene','Killigrew','ekilligrew4','CBXcDd',NULL,'2019-04-06','ekilligrew4@sakura.ne.jp','ekilligrew4@ocn.ne.jp','290-851-8927','125-400-9423','1954-05-01',1,'Morocco','Taounza',NULL),(6,'Sydney','Marns','smarns5','la4sfcNEHY',NULL,'2018-10-09','smarns5@cisco.com','smarns5@cam.ac.uk','951-293-2844','911-392-8163','1955-09-15',0,'Russia','Zlatoust','456209'),(7,'Roger','Smith','camilon','camilos22','add3b4b2-cb92-487a-a8fb-9c8d1f1a5f30','2019-12-22','cli.ram@gmail.com','dar.e@gmail.com','45656567','67565655','2005-10-30',1,'Afganistan','gathur','434'),(9,'robert','danfort','rocam','ggg00','6142a2ab-7ffc-4219-b0a8-1f2ad3c54773','2019-12-30','cli.ra1m@gmail.com','dar.e111@gmail.com','122-234-56454','6756-5655','1980-12-22',1,'Bangladesh','bandu','5555'),(10,'Arlenee','Zambuli','zab009','7717777','fad73027-e337-460c-9326-7047258a1287','2019-12-27','zam.too@gmail.com','dar.ear@gmail.com','122-234-56454','452-523-3476','1992-02-29',0,'Ethiopia','Zoalia','50101'),(11,'elizabeth','Taine','eli999','99990','2f1d428d-da8c-4b36-970e-b0eeba9efe22','2019-12-27','eli@goto.net','','122-234-56477','','1997-01-25',0,'Aruba','scotill','11645'),(12,'Ruby','Espinoza','rubyruby','12345','ca574348-0572-4ac0-88d8-8aa46a23e433','2020-01-14','ruby.es@college.org','ruby121@gpail.com','1226544','4565655','2002-12-31',0,'Brazil','Sao Paulo','66AG');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-16 11:28:13
