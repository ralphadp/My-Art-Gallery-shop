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
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(120) DEFAULT NULL,
  `value` varchar(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `options` json DEFAULT NULL,
  `APP` enum('GALLERY','ADMIN') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_index` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'TITLE_APP','Title App Page','Art Gallery Shopping','text',NULL,'GALLERY'),(2,'PROFILE_PHOTO','Include admin profile photo','1','checkbox',NULL,'GALLERY'),(3,'EMAIL_BACK','Send user msg email back','1','checkbox',NULL,'GALLERY'),(4,'SHOW_BANNER','Show banner','1','checkbox',NULL,'GALLERY'),(5,'SHOW_TAGS','Show tags','0','checkbox',NULL,'GALLERY'),(6,'NOUSER_COUNT','Count no-user views','1','checkbox',NULL,'GALLERY'),(7,'SHOW_THUMS','Show thumbs by','RELEASE_DATE','select','{\"YEAR\": \"Year\", \"MOST_VIEW\": \"Most view\", \"RELEASE_DATE\": \"Release Date\"}','GALLERY'),(8,'SOCIAL_COUNT','Count Social visits','instagram','radio','[\"facebook\", \"instagram\", \"tweeter\", \"all\"]','GALLERY'),(9,'SEARCH_DATE','Search on Date','0','checkbox',NULL,'GALLERY'),(10,'SHOW_USERNAME','Show username at header','1','checkbox',NULL,'GALLERY'),(11,'SHOW_YEAR_PIECE','Show year at piece info','1','checkbox',NULL,'GALLERY'),(12,'REDIRECT_UPDATE','Redirect Update','1','checkbox',NULL,'ADMIN');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-16 11:28:16
