-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory_system
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','operator','management') NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test Admin','admin@test.com','$2a$10$.7DJ.pm2HlMw8e3Hy8osmOx/1ZRo6w0/rdpC2RPzURz7dMOQFQ85.','operator','2025-07-07 05:59:23'),(2,'Krishna','krishna@gmail.com','$2a$10$gLIRKQPCzMGBf2C6LuSQ.ePdLMG6SOdSdxDWqeVmPP/xD6Pb.ShVO','management','2025-07-07 06:00:12'),(3,'Zainab','zainab@gmail.com','$2a$10$smaP31Rxd.YqkT.MD..q6eXFXF/uJJ5Cv436aMZdL5ImfgvZj6LxK','management','2025-07-07 06:01:16'),(4,'Krishna','krishna12@gmail.com','$2a$10$k7j3t2pxAUBkjeTKSC4QwufEvWiV9va0Snqfvz0JAb9181TEsxNC.','admin','2025-07-07 06:35:02'),(5,'Fatima','fatima@gmail.com','$2a$12$.g1QouRSTPhwLBfNlU3ttuBZfcL3w3WydANfUOFweL0O93MI28BoC','admin','2025-07-16 10:35:19'),(6,'Fatima','fatima1@gmail.com','$2a$12$h8YZTOQgE07kcjdOdNxpK.COyyZCw/X352S.1bIl.V9PTH.QH8Oyy','operator','2025-07-16 10:35:33'),(7,'Tester','tester@gmail.com','$2a$12$zIJWdprCAj2iYTYFTNOAI.q7EmxT.VbnUXwJHZqZmLSgYvBaNZ6Qa','admin','2025-07-17 16:34:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-18 12:04:17
