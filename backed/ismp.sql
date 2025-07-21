-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: ismp
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `apply_developer`
--

DROP TABLE IF EXISTS `apply_developer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_developer` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL,
  `apply_time` datetime DEFAULT NULL COMMENT '申请时间',
  `reason` text,
  `material` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `apply_developer_user_id_fk` (`user_id`),
  CONSTRAINT `apply_developer_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='申请成为开发者';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_developer`
--

LOCK TABLES `apply_developer` WRITE;
/*!40000 ALTER TABLE `apply_developer` DISABLE KEYS */;
/*!40000 ALTER TABLE `apply_developer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apply_software`
--

DROP TABLE IF EXISTS `apply_software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_software` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL COMMENT '用户',
  `reason` text COMMENT '原因',
  `material` varchar(100) NOT NULL COMMENT '佐证材料',
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `apply_software_user_id_fk` (`user_id`),
  CONSTRAINT `apply_software_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='申请';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_software`
--

LOCK TABLES `apply_software` WRITE;
/*!40000 ALTER TABLE `apply_software` DISABLE KEYS */;
/*!40000 ALTER TABLE `apply_software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ban`
--

DROP TABLE IF EXISTS `ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ban` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL COMMENT '用户id',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `reason` text,
  `is_delete` int DEFAULT NULL COMMENT '删除',
  PRIMARY KEY (`id`),
  KEY `ban_user_id_fk` (`user_id`),
  CONSTRAINT `ban_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='封禁';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ban`
--

LOCK TABLES `ban` WRITE;
/*!40000 ALTER TABLE `ban` DISABLE KEYS */;
/*!40000 ALTER TABLE `ban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT '用户',
  `software_id` bigint NOT NULL COMMENT '软件',
  `status` int DEFAULT NULL COMMENT '状态',
  `code1` varchar(100) DEFAULT NULL,
  `code2` varchar(100) DEFAULT NULL,
  `code3` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `equipment_software_id_fk` (`software_id`),
  KEY `equipment_user_id_fk` (`user_id`),
  CONSTRAINT `equipment_software_id_fk` FOREIGN KEY (`software_id`) REFERENCES `software` (`id`),
  CONSTRAINT `equipment_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='设备';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receiver_id` bigint DEFAULT NULL,
  `poster_id` bigint DEFAULT NULL,
  `content` text,
  `time` datetime DEFAULT NULL,
  `is_read` int DEFAULT NULL COMMENT '是否已读',
  `is_delete` int DEFAULT NULL COMMENT '是否删除',
  PRIMARY KEY (`id`),
  KEY `message_user_id_fk` (`receiver_id`),
  KEY `message_user_id_fk_2` (`poster_id`),
  CONSTRAINT `message_user_id_fk` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_user_id_fk_2` FOREIGN KEY (`poster_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='消息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `software_id` bigint DEFAULT NULL COMMENT '软件',
  `price` double DEFAULT NULL COMMENT '交易金额',
  `time` datetime DEFAULT NULL COMMENT '交易时间',
  `user_id` bigint DEFAULT NULL COMMENT '用户',
  `developer_id` bigint DEFAULT NULL,
  `is_delete` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_software_id_fk` (`software_id`),
  KEY `order_user_id_fk` (`user_id`),
  KEY `order_user_id_fk_2` (`developer_id`),
  CONSTRAINT `order_software_id_fk` FOREIGN KEY (`software_id`) REFERENCES `software` (`id`),
  CONSTRAINT `order_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `order_user_id_fk_2` FOREIGN KEY (`developer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='订单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint DEFAULT NULL COMMENT '用户',
  `content` text COMMENT '内容',
  `software_id` bigint DEFAULT NULL COMMENT '软件',
  `time` datetime DEFAULT NULL COMMENT '评论时间',
  `is_delete` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `review_software_id_fk` (`software_id`),
  KEY `review_user_id_fk` (`user_id`),
  CONSTRAINT `review_software_id_fk` FOREIGN KEY (`software_id`) REFERENCES `software` (`id`),
  CONSTRAINT `review_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `software` (
  `id` bigint NOT NULL,
  `published_time` datetime DEFAULT NULL,
  `author` bigint DEFAULT NULL,
  `info` varchar(300) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `introduction` varchar(300) DEFAULT NULL,
  `version` varchar(20) DEFAULT NULL,
  `install_detail` varchar(300) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`id`),
  KEY `software_user_id_fk` (`author`),
  CONSTRAINT `software_user_id_fk` FOREIGN KEY (`author`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribe`
--

DROP TABLE IF EXISTS `subscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribe` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint DEFAULT NULL,
  `developer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subscribe_user_id_fk` (`user_id`),
  KEY `subscribe_user_id_fk_2` (`developer_id`),
  CONSTRAINT `subscribe_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `subscribe_user_id_fk_2` FOREIGN KEY (`developer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='关注表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribe`
--

LOCK TABLES `subscribe` WRITE;
/*!40000 ALTER TABLE `subscribe` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `money` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-21 11:30:49
