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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`path`),
  KEY `category_index` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'abstract-art','Abstract art'),(35,'abstract-sculpture','Abstract sculpture'),(19,'acrylic','Acrylic'),(56,'adding','Adding'),(46,'architectural-sculpture','Architectural sculpture'),(42,'bust','Bust'),(45,'chryselephantine','Chryselephantine'),(47,'clay-sculpture','Clay sculpture'),(37,'color-relief','Color relief'),(53,'concrete-sculpture','Concrete sculpture'),(39,'contemporary','Contemporary'),(23,'cool','Cool'),(8,'cubism-perro','Cubism perro'),(58,'dhe-lake-on-space','dhe lake on space'),(26,'dripping','Dripping'),(54,'emptying','Emptying'),(5,'expressionism','Expressionism'),(10,'gender-painting','Gender painting'),(38,'glass-relief','Glass relief'),(27,'graffiti','Graffiti'),(24,'grisalea','Grisalea'),(14,'historical-painting','Historical Painting'),(2,'hyperrealism','Hyperrealism'),(4,'impressionism','Impressionism'),(31,'in-copper','In copper'),(32,'in-glass','In glass'),(22,'ink','Ink'),(52,'ivory-sculpture','Ivory Sculpture'),(44,'kinetic-sculpture','Kinetic sculpture'),(11,'landscape','Landscape'),(41,'low-relief','Low relief'),(50,'metal-sculpture','Metal sculpture'),(28,'mixed-media','Mixed media'),(13,'naked','Naked'),(15,'oil','Oil'),(30,'on-canvas','On canvas'),(33,'on-paper','On paper'),(29,'on-wooden-board','On wooden board'),(20,'pie','Pie'),(25,'pointillism','Pointillism'),(7,'pop-art-duck','Pop Art duck'),(9,'portrait','Portrait'),(21,'quenching','Quenching'),(1,'realism','Realism'),(36,'relief','Relief'),(55,'removing','Removing'),(40,'round-bulk-statue','Round Bulk Statue'),(34,'sculpture','Sculpture'),(12,'still-life','Still life'),(48,'stone-sculpture','Stone sculpture'),(49,'stucco-sculpture','Stucco sculpture'),(3,'surrealism','Surrealism'),(18,'tempera','Tempera'),(63,'the-batman','The Batman'),(62,'the-premiere','the premiere'),(43,'torso','Torso'),(17,'watercolor','Watercolor'),(16,'wax','Wax'),(51,'wood-sculpture','Wood sculpture');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-16 11:28:17
