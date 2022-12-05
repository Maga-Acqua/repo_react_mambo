-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: localhost    Database: mambo_db
-- ------------------------------------------------------
-- Server version	5.7.21-log
CREATE SCHEMA `mambo_db` ;
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `mambo_db`.`users`;
CREATE TABLE `mambo_db`.`users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
LOCK TABLES `mambo_db`.`users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `mambo_db`.`users` VALUES (1,'Magali','81dc9bdb52d04dc20036dbd8313ed055');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `mambo_db`.`productos`;

CREATE TABLE `mambo_db`.`productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `tipo_objeto` varchar(45) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productos`
--

LOCK TABLES `mambo_db`.`productos` WRITE;
INSERT INTO `productos` VALUES (1,'Floral 1','            Diseño floral con colores vivos. Colores a eleccion.\r\n        \r\n        ','Maceta',1150,''),(3,'Gatos 1','            Diseño de gato. Tamaños pequeños.\r\n        \r\n        \r\n        \r\n        \r\n        ','Maceta',850,NULL);
UNLOCK TABLES;
