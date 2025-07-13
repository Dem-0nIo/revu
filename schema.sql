-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-10-2024 a las 19:04:45
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = '-05:00';


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `revu_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE IF NOT EXISTS `cotizaciones` (
  `idCotizacion` int(11) AUTO_INCREMENT PRIMARY KEY,
  `influencerId` varchar(255) DEFAULT NULL,
  `numCotizacion` varchar(255) NOT NULL,
  `numContacto` varchar(255) NOT NULL,
  `personaContacto` varchar(255) NOT NULL,
  `emailContacto` varchar(255) NOT NULL,
  `whatsappContacto` varchar(255) NOT NULL,
  `status` enum('APPROVED','PENDING','CANCELED') NOT NULL DEFAULT 'PENDING',
  `price` varchar(255) NOT NULL,
  `dateCreated` varchar(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE IF NOT EXISTS `genders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Insertar los valores de géneros/sexos
INSERT INTO genders (description) VALUES
('Hombre'),
('Mujer'),
('Gay'),
('Lesbiana'),
('No binario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `influencers`
--

CREATE TABLE IF NOT EXISTS `influencers` (
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `birthdayDate` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `gender_id` INT DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `hair_color_id` INT DEFAULT NULL,
  `hair_type_id` INT DEFAULT NULL,
  `skin_color_id` INT DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `addressLine` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `social_class_id` INT DEFAULT NULL,
  `city_id` INT DEFAULT NULL,
  `state_id` INT DEFAULT NULL,
  `country_id` INT DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `emailNotification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`emailNotification`)),
  `pushNotification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`pushNotification`)),
  `phoneNumberWhp` varchar(255) DEFAULT NULL,
  `socialInstagram` varchar(255) DEFAULT NULL,
  `socialInstagramCla` varchar(255) DEFAULT NULL,
  `socialInstagramSeg` varchar(255) DEFAULT NULL,
  `socialTik` varchar(255) DEFAULT NULL,
  `socialTikCla` varchar(255) DEFAULT NULL,
  `socialTikSeg` varchar(255) DEFAULT NULL,
  `socialFace` varchar(255) DEFAULT NULL,
  `socialFaceCla` varchar(255) DEFAULT NULL,
  `socialFaceSeg` varchar(255) DEFAULT NULL,
  `socialUTube` varchar(255) DEFAULT NULL,
  `socialUTubeCla` varchar(255) DEFAULT NULL,
  `socialUTubeSeg` varchar(255) DEFAULT NULL,
  `socialNetwork` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`socialNetwork`)),
  `celebrity` TINYINT(1) DEFAULT 1,
  `img` varchar(255) DEFAULT NULL,
  `costo_1` int(11) DEFAULT NULL,
  `costo_2` int(11) DEFAULT NULL,
  `costo_3` int(11) DEFAULT NULL,
  `costo_4` int(11) DEFAULT NULL,
  `costo_5` int(11) DEFAULT NULL,
  `costo_6` int(11) DEFAULT NULL,
  `costo_7` int(11) DEFAULT NULL,
  `costo_8` int(11) DEFAULT NULL,
  `costo_9` int(11) DEFAULT NULL,
  `costo_10` int(11) DEFAULT NULL,
  `costo_11` int(11) DEFAULT NULL,
  `costo_12` int(11) DEFAULT NULL,
  `costo_13` int(11) DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
-- Tabla para registrar quién crea cada influencer (auditoría)
CREATE TABLE IF NOT EXISTS influencer_creations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  influencer_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (influencer_id) REFERENCES influencers(idUser) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
-- --------------------------------------------------------

INSERT INTO `influencers` (`firstName`, `lastName`, `birthdayDate`, `year`, `gender_id`, `contact`, `hair_color_id`, `hair_type_id`, `skin_color_id`, `passport`, `displayName`, `emailAddress`, `addressLine`, `phoneNumber`, `social_class_id`, `city_id`, `state_id`, `country_id`, `zip`, `emailNotification`, `pushNotification`, `phoneNumberWhp`, `socialInstagram`, `socialInstagramCla`, `socialInstagramSeg`, `socialTik`, `socialTikCla`, `socialTikSeg`, `socialFace`, `socialFaceCla`, `socialFaceSeg`, `socialUTube`, `socialUTubeCla`, `socialUTubeSeg`, `socialNetwork`, `celebrity`, `img`, `costo_1`, `costo_2`, `costo_3`, `costo_4`, `costo_5`, `costo_6`, `costo_7`, `costo_8`, `costo_9`, `costo_10`, `costo_11`, `costo_12`, `costo_13`, `createdAt`, `updatedAt`)
VALUES
('Juan', 'Pérez', '1995-06-12', '28', 1, 'juan.perez@example.com', 2, 1, 1, 'P123456', 'Juanito', 'juan@example.com', 'Calle Falsa 123', '+573001234567', 1, 1, 1, 1, '110111', '["yes"]', '["yes"]', '+573001234567', '@juanperez', 'Micro', '15000', '@juan_tik', 'Macro', '500000', '@juan_fb', 'Nano', '9000', '@juan_yt', 'Mega', '1500000', '["socialInstagram", "socialTikTok"]', 1, 'juan.jpg', 100, 200, 150, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, NOW(), NOW()),
('María', 'Gómez', '1992-03-25', '31', 2, 'maria.gomez@example.com', 1, 2, 2, 'P654321', 'MariStar', 'maria@example.com', 'Avenida Central 456', '+573002345678', 2, 2, 2, 2, '220222', '["no"]', '["yes"]', '+573002345678', '@mariag', 'Mega', '1000000', '@maria_tik', 'Micro', '80000', '@maria_fb', 'Macro', '600000', '@maria_yt', 'Nano', '5000', '["socialFacebook", "socialYouTube"]', 0, 'maria.jpg', 120, 220, 180, 320, 420, 520, 620, 720, 820, 920, 1020, 1120, 1220, NOW(), NOW()),
('Carlos', 'Rodríguez', '2000-09-18', '23', 1, 'carlos.rod@example.com', 3, 1, 3, 'P789456', 'CarlosTech', 'carlos@example.com', 'Calle Nueva 789', '+573003456789', 3, 3, 3, 3, '330333', '["yes"]', '["no"]', '+573003456789', '@carlost', 'Nano', '9000', '@carlos_tik', 'Micro', '45000', '@carlos_fb', 'Macro', '700000', '@carlos_yt', 'Mega', '2000000', '["socialTikTok", "socialInstagram", "socialYouTube"]', 1, 'carlos.jpg', 140, 240, 190, 340, 440, 540, 640, 740, 840, 940, 1040, 1140, 1240, NOW(), NOW()),
('Ana', 'Martínez', '1998-12-30', '25', 2, 'ana.mart@example.com', 2, 3, 1, 'P321987', 'AnaBeauty', 'ana@example.com', 'Calle Linda 101', '+573004567890', 1, 4, 4, 4, '440444', '["yes"]', '["yes"]', '+573004567890', '@ana_mart', 'Macro', '400000', '@ana_tik', 'Mega', '1200000', '@ana_fb', 'Micro', '30000', '@ana_yt', 'Nano', '8000', '["socialInstagram", "socialTikTok", "socialFacebook"]', 0, 'ana.jpg', 160, 260, 210, 360, 460, 560, 660, 760, 860, 960, 1060, 1160, 1260, NOW(), NOW()),
('Pedro', 'Ramírez', '1990-05-14', '33', 1, 'pedro.ram@example.com', 1, 2, 2, 'P852963', 'PedroFitness', 'pedro@example.com', 'Calle Musculosa 666', '+573005678901', 2, 5, 5, 5, '550555', '["yes"]', '["no"]', '+573005678901', '@pedror', 'Nano', '5000', '@pedro_tik', 'Micro', '50000', '@pedro_fb', 'Macro', '900000', '@pedro_yt', 'Mega', '2200000', '["socialTikTok", "socialInstagram", "socialYouTube"]', 1, 'pedro.jpg', 180, 280, 230, 380, 480, 580, 680, 780, 880, 980, 1080, 1180, 1280, NOW(), NOW()),
('Laura', 'Hernández', '1988-07-22', '35', 2, 'laura.hern@example.com', 3, 1, 3, 'P963258', 'LauraVlogs', 'laura@example.com', 'Avenida Creativa 909', '+573006789012', 3, 6, 6, 6, '660666', '["no"]', '["yes"]', '+573006789012', '@laurah', 'Mega', '1100000', '@laura_tik', 'Micro', '70000', '@laura_fb', 'Macro', '550000', '@laura_yt', 'Nano', '6000', '["socialFacebook", "socialYouTube"]', 0, 'laura.jpg', 200, 300, 250, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, NOW(), NOW()),
('David', 'Sánchez', '1996-02-11', '28', 1, 'david.san@example.com', 2, 2, 2, 'P753159', 'DavidMusic', 'david@example.com', 'Calle Melodía 222', '+573007890123', 1, 7, 7, 7, '770777', '["yes"]', '["yes"]', '+573007890123', '@davids', 'Nano', '12000', '@david_tik', 'Micro', '80000', '@david_fb', 'Macro', '720000', '@david_yt', 'Mega', '1800000', '["socialInstagram", "socialgit TikTok"]', 1, 'david.jpg', 220, 320, 270, 420, 520, 620, 720, 820, 920, 1020, 1120, 1220, 1320, NOW(), NOW());

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', NOW(), NOW()),
(2, 'moderator', NOW(), NOW()),
(3, 'admin', NOW(), NOW());

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `firstname`, `lastname`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@admin.com', '$2a$08$HiHPGHnPmOsbVcNRfMUQmeBGdGKZXM1MfebLF6sOlKoxUGP0KNoQe', 'Prueba', 'Admin', '123456789', '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(2, 'user', 'user@user.com', '$2a$08$KxxuGDdQVQYPMz2o4zP3ROIG0QZCKDG.sY2r0DtHHsdLsWo.mb2dy', 'User', 'Prueba', '123456789', '2024-10-08 17:03:32', '2024-10-08 17:03:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_roles`
--

CREATE TABLE IF NOT EXISTS `user_roles` (
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `user_roles`
--

INSERT INTO `user_roles` (`roleId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 2, '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(3, 1, '2024-10-08 17:03:32', '2024-10-08 17:03:32');


-- Crear la tabla de departamentos
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar departamentos
INSERT INTO departments (department_name) VALUES
('Amazonas'),
('Antioquia'),
('Arauca'),
('Atlántico'),
('Bolívar'),
('Boyacá'),
('Caldas'),
('Caquetá'),
('Casanare'),
('Cauca'),
('Cesar'),
('Chocó'),
('Córdoba'),
('Cundinamarca'),
('Guainía'),
('Guaviare'),
('Huila'),
('La Guajira'),
('Magdalena'),
('Meta'),
('Nariño'),
('Norte de Santander'),
('Putumayo'),
('Quindío'),
('Risaralda'),
('San Andrés y Providencia'),
('Santander'),
('Sucre'),
('Tolima'),
('Valle del Cauca'),
('Vaupés'),
('Vichada');


CREATE TABLE IF NOT EXISTS countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,            -- Nombre del país en español
    name_en VARCHAR(100) NOT NULL,         -- Nombre del país en inglés
    iso_code CHAR(3) NOT NULL UNIQUE,      -- Código ISO Alpha-3 (ej: USA, MEX)
    iso_code_2 CHAR(2) NOT NULL UNIQUE,    -- Código ISO Alpha-2 (ej: US, MX)
    region VARCHAR(100),                   -- Región (ej: América, Europa)
    is_active BOOLEAN DEFAULT 1,           -- Estado del país (1 = habilitado, 0 = deshabilitado)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de actualización
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO countries (name, name_en, iso_code, iso_code_2, region, is_active) VALUES
('Argentina', 'Argentina', 'ARG', 'AR', 'América Latina', 1),
('Bolivia', 'Bolivia', 'BOL', 'BO', 'América Latina', 1),
('Brasil', 'Brazil', 'BRA', 'BR', 'América Latina', 1),
('Chile', 'Chile', 'CHL', 'CL', 'América Latina', 1),
('Colombia', 'Colombia', 'COL', 'CO', 'América Latina', 1),
('Costa Rica', 'Costa Rica', 'CRI', 'CR', 'América Latina', 1),
('Cuba', 'Cuba', 'CUB', 'CU', 'América Latina', 1),
('Ecuador', 'Ecuador', 'ECU', 'EC', 'América Latina', 1),
('El Salvador', 'El Salvador', 'SLV', 'SV', 'América Latina', 1),
('Guatemala', 'Guatemala', 'GTM', 'GT', 'América Latina', 1),
('Honduras', 'Honduras', 'HND', 'HN', 'América Latina', 1),
('México', 'Mexico', 'MEX', 'MX', 'América Latina', 1),
('Nicaragua', 'Nicaragua', 'NIC', 'NI', 'América Latina', 1),
('Panamá', 'Panama', 'PAN', 'PA', 'América Latina', 1),
('Paraguay', 'Paraguay', 'PRY', 'PY', 'América Latina', 1),
('Perú', 'Peru', 'PER', 'PE', 'América Latina', 1),
('República Dominicana', 'Dominican Republic', 'DOM', 'DO', 'América Latina', 1),
('Uruguay', 'Uruguay', 'URY', 'UY', 'América Latina', 1),
('Venezuela', 'Venezuela', 'VEN', 'VE', 'América Latina', 1);

-- Drop the cities table if it already exists
DROP TABLE IF EXISTS cities;

-- Create the cities table with a relation to the countries table
CREATE TABLE IF NOT EXISTS cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    department_id INT DEFAULT NULL,
    country_id INT NOT NULL,
    CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES countries(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES departments(id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert major cities for each country
INSERT INTO `cities`  (id, city_name, department_id,country_id) VALUES 
(1,'Leticia',1,5),
(2,'Puerto Nariño',1,5),
(3,'Medellín',2,5),
(4,'Bello',2,5),
(5,'Itagüí',2,5),
(6,'Envigado',2,5),
(7,'Rionegro',2,5),
(8,'Turbo',2,5),
(9,'Arauca',3,5),
(10,'Arauquita',3,5),
(11,'Saravena',3,5),(12,'Barranquilla',4,5),
(13,'Soledad',4,5),
(14,'Malambo',4,5),
(15,'Sabanalarga',4,5),
(16,'Cartagena',5,5),
(17,'Magangué',5,5),
(18,'Turbaco',5,5),
(19,'Arjona',5,5),
(20,'Tunja',6,5),
(21,'Duitama',6,5),
(22,'Sogamoso',6,5),
(23,'Chiquinquirá',6,5),
(24,'Manizales',7,5),
(25,'Chinchiná',7,5),
(26,'Villamaría',7,5),
(27,'Florencia',8,5),
(28,'Morelia',8,5),
(29,'Yopal',9,5),
(30,'Aguazul',9,5),
(31,'Popayán',10,5),
(32,'Santander de Quilichao',10,5),
(33,'Valledupar',11,5),
(34,'Aguachica',11,5),
(35,'Quibdó',12,5),(36,'Istmina',12,5),(37,'Montería',13,5),(38,'Lorica',13,5),(39,'Bogotá',14,5),(40,'Zipaquirá',14,5),(41,'Girardot',14,5),(42,'Inírida',15,5),(43,'San José del Guaviare',16,5),(44,'Neiva',17,5),(45,'Pitalito',17,5),(46,'Riohacha',18,5),(47,'Maicao',18,5),(48,'Santa Marta',19,5),(49,'Ciénaga',19,5),(50,'Villavicencio',20,5),(51,'Acacías',20,5),(52,'Pasto',21,5),(53,'Tumaco',21,5),(54,'Cúcuta',22,5),(55,'Ocaña',22,5),(56,'Mocoa',23,5),(57,'Armenia',24,5),(58,'Montenegro',24,5),(59,'Pereira',25,5),(60,'Dosquebradas',25,5),(61,'San Andrés',26,5),(62,'Bucaramanga',27,5),(63,'Floridablanca',27,5),(64,'Sincelejo',28,5),(65,'Corozal',28,5),(66,'Ibagué',29,5),(67,'Espinal',29,5),(68,'Cali',30,5),(69,'Palmira',30,5),(70,'Buenaventura',30,5),(71,'Mitú',31,5),(72,'Puerto Carreño',32,5),(73,'Buenos Aires',NULL,1),(74,'Córdoba',NULL,1),(75,'Rosario',NULL,1),(76,'Mendoza',NULL,1),(77,'San Miguel de Tucumán',NULL,1),(78,'La Plata',NULL,1),(79,'Mar del Plata',NULL,1),(80,'Salta',NULL,1),(81,'Santa Fe',NULL,1),(82,'San Juan',NULL,1),(83,'La Paz',NULL,2),(84,'Santa Cruz de la Sierra',NULL,2),(85,'Cochabamba',NULL,2),(86,'Sucre',NULL,2),(87,'Oruro',NULL,2),(88,'Potosí',NULL,2),(89,'Tarija',NULL,2),(90,'Trinidad',NULL,2),(91,'Cobija',NULL,2),(92,'El Alto',NULL,2),(93,'São Paulo',NULL,3),(94,'Rio de Janeiro',NULL,3),(95,'Brasilia',NULL,3),(96,'Salvador',NULL,3),(97,'Fortaleza',NULL,3),(98,'Belo Horizonte',NULL,3),(99,'Manaus',NULL,3),(100,'Curitiba',NULL,3),(101,'Recife',NULL,3),(102,'Porto Alegre',NULL,3),(103,'Santiago',NULL,4),(104,'Valparaíso',NULL,4),(105,'Concepción',NULL,4),(106,'La Serena',NULL,4),(107,'Antofagasta',NULL,4),(108,'Temuco',NULL,4),(109,'Rancagua',NULL,4),(110,'Arica',NULL,4),(111,'Puerto Montt',NULL,4),(112,'Iquique',NULL,4),(113,'San José',NULL,6),(114,'Alajuela',NULL,6),(115,'Cartago',NULL,6),(116,'Havana',NULL,7),(117,'Santiago de Cuba',NULL,7),(118,'Camagüey',NULL,7),(119,'San Salvador',NULL,9),(120,'Santa Ana',NULL,9),(121,'San Miguel',NULL,9),(122,'Guatemala City',NULL,10),(123,'Quetzaltenango',NULL,10),(124,'Escuintla',NULL,10),(125,'Tegucigalpa',NULL,11),(126,'San Pedro Sula',NULL,11),(127,'La Ceiba',NULL,11),(128,'Quito',NULL,8),(129,'Guayaquil',NULL,8),(130,'Cuenca',NULL,8),(131,'Ambato',NULL,8),(132,'Machala',NULL,8),(133,'Portoviejo',NULL,8),(134,'Loja',NULL,8),(135,'Ibarra',NULL,8),(136,'Manta',NULL,8),(137,'Esmeraldas',NULL,8),(138,'Panama City',NULL,14),(139,'Colón',NULL,14),(140,'David',NULL,14),(141,'Asunción',NULL,15),(142,'Ciudad del Este',NULL,15),(143,'Encarnación',NULL,15),(144,'Lima',NULL,16),(145,'Arequipa',NULL,16),(146,'Cusco',NULL,16),(147,'Trujillo',NULL,16),(148,'Chiclayo',NULL,16),(149,'Piura',NULL,16),(150,'Iquitos',NULL,16),(151,'Tacna',NULL,16),(152,'Pucallpa',NULL,16),(153,'Juliaca',NULL,16),(154,'Santo Domingo',NULL,17),(155,'Santiago de los Caballeros',NULL,17),(156,'La Romana',NULL,17),(157,'Montevideo',NULL,18),(158,'Punta del Este',NULL,18),(159,'Salto',NULL,18),(160,'Mexico City',NULL,12),(161,'Guadalajara',NULL,12),(162,'Monterrey',NULL,12),(163,'Puebla',NULL,12),(164,'Tijuana',NULL,12),(165,'Mérida',NULL,12),(166,'Cancún',NULL,12),(167,'San Luis Potosí',NULL,12),(168,'León',NULL,12),(169,'Querétaro',NULL,12),(170,'Managua',NULL,13),(171,'León',NULL,13),(172,'Granada',NULL,13),(173,'Caracas',NULL,19),(174,'Maracaibo',NULL,19),(175,'Valencia',NULL,19),(176,'El Encanto',1,5),(177,'La Chorrera',1,5),(178,'La Pedrera',1,5),(179,'La Victoria',1,5),(180,'Puerto Arica',1,5),(181,'Puerto Santander',1,5),(182,'Tarapacá',1,5),(183,'Puerto Alegría',1,5),(184,'Miriti Paraná',1,5),(185,'Abejorral',2,5),(186,'Abriaquí',2,5),(187,'Alejandría',2,5),(188,'Amagá',2,5),(189,'Amalfi',2,5),(190,'Andes',2,5),(191,'Angelópolis',2,5),(192,'Angostura',2,5),(193,'Anorí',2,5),(194,'Anza',2,5),(195,'Apartadó',2,5),(196,'Arboletes',2,5),(197,'Argelia',2,5),(198,'Armenia',2,5),(199,'Barbosa',2,5),(200,'Betania',2,5),(201,'Betulia',2,5),(202,'Ciudad Bolívar',2,5),(203,'Briceño',2,5),(204,'Buriticá',2,5),(205,'Cáceres',2,5),(206,'Caicedo',2,5),(207,'Caldas',2,5),(208,'Campamento',2,5),(209,'Cañasgordas',2,5),(210,'Caracolí',2,5),(211,'Caramanta',2,5),(212,'Carepa',2,5),(213,'Carolina',2,5),(214,'Caucasia',2,5),(215,'Chigorodó',2,5),(216,'Cisneros',2,5),(217,'Cocorná',2,5),(218,'Concepción',2,5),(219,'Concordia',2,5),(220,'Copacabana',2,5),(221,'Dabeiba',2,5),(222,'Don Matías',2,5),(223,'Ebéjico',2,5),(224,'El Bagre',2,5),(225,'Entrerrios',2,5),(226,'Fredonia',2,5),(227,'Frontino',2,5),(228,'Giraldo',2,5),(229,'Girardota',2,5),(230,'Gómez Plata',2,5),(231,'Granada',2,5),(232,'Guadalupe',2,5),(233,'Guarne',2,5),(234,'Guatapé',2,5),(235,'Heliconia',2,5),(236,'Hispania',2,5),(237,'Ituango',2,5),(238,'Jardín',2,5),(239,'Jericó',2,5),(240,'La Ceja',2,5),(241,'La Estrella',2,5),(242,'La Pintada',2,5),(243,'La Unión',2,5),(244,'Liborina',2,5),(245,'Maceo',2,5),(246,'Marinilla',2,5),(247,'Montebello',2,5),(248,'Murindó',2,5),(249,'Mutatá',2,5),(250,'Nariño',2,5),(251,'Necoclí',2,5),(252,'Nechí',2,5),(253,'Olaya',2,5),(254,'Peñol',2,5),(255,'Peque',2,5),(256,'Pueblorrico',2,5),(257,'Puerto Berrío',2,5),(258,'Puerto Nare',2,5),(259,'Puerto Triunfo',2,5),(260,'Remedios',2,5),(261,'Retiro',2,5),(262,'Sabanalarga',2,5),(263,'Sabaneta',2,5),(264,'Salgar',2,5),(265,'San Francisco',2,5),(266,'San Jerónimo',2,5),(267,'San Luis',2,5),(268,'San Pedro',2,5),(269,'San Rafael',2,5),(270,'San Roque',2,5),(271,'San Vicente',2,5),(272,'Santa Bárbara',2,5),(273,'Santo Domingo',2,5),(274,'El Santuario',2,5),(275,'Segovia',2,5),(276,'Sopetrán',2,5),(277,'Támesis',2,5),(278,'Tarazá',2,5),(279,'Tarso',2,5),(280,'Titiribí',2,5),(281,'Toledo',2,5),(282,'Uramita',2,5),(283,'Urrao',2,5),(284,'Valdivia',2,5),(285,'Valparaíso',2,5),(286,'Vegachí',2,5),(287,'Venecia',2,5),(288,'Yalí',2,5),(289,'Yarumal',2,5),(290,'Yolombó',2,5),(291,'Yondó',2,5),(292,'Zaragoza',2,5),(293,'Belmira',2,5),(294,'San Pedro de Uraba',2,5),(295,'Santafé de Antioquia',2,5),(296,'Santa Rosa de Osos',2,5),(297,'San Andrés de Cuerquía',2,5),(298,'San José de La Montaña',2,5),(299,'San Juan de Urabá',2,5),(300,'El Carmen de Viboral',2,5),(301,'Vigía del Fuerte',2,5),(302,'Sonsón',2,5),(303,'San Carlos',2,5),(304,'Cravo Norte',3,5),(305,'Fortul',3,5),(306,'Puerto Rondón',3,5),(307,'Tame',3,5),(308,'Baranoa',4,5),(309,'Candelaria',4,5),(310,'Galapa',4,5),(311,'Luruaco',4,5),(312,'Manatí',4,5),(313,'Piojó',4,5),(314,'Polonuevo',4,5),(315,'Sabanagrande',4,5),(316,'Santa Lucía',4,5),(317,'Santo Tomás',4,5),(318,'Suan',4,5),(319,'Tubará',4,5),(320,'Usiacurí',4,5),(321,'Juan de Acosta',4,5),(322,'Repelón',4,5),(323,'Palmar de Varela',4,5),(324,'Ponedera',4,5),(325,'Achí',5,5),(326,'Arenal',5,5),(327,'Arroyohondo',5,5),(328,'Calamar',5,5),(329,'Cantagallo',5,5),(330,'Cicuco',5,5),(331,'Córdoba',5,5),(332,'Clemencia',5,5),(333,'El Guamo',5,5),(334,'Mahates',5,5),(335,'Margarita',5,5),(336,'Montecristo',5,5),(337,'Mompós',5,5),(338,'Morales',5,5),(339,'Norosí',5,5),(340,'Pinillos',5,5),(341,'Regidor',5,5),(342,'Río Viejo',5,5),(343,'San Estanislao',5,5),(344,'San Fernando',5,5),(345,'San Juan Nepomuceno',5,5),(346,'Santa Catalina',5,5),(347,'Santa Rosa',5,5),(348,'Simití',5,5),(349,'Soplaviento',5,5),(350,'Talaigua Nuevo',5,5),(351,'Tiquisio',5,5),(352,'Turbaná',5,5),(353,'Villanueva',5,5),(354,'Barranco de Loba',5,5),(355,'Santa Rosa del Sur',5,5),(356,'El Peñón',5,5),(357,'María la Baja',5,5),(358,'El Carmen de Bolívar',5,5),(359,'Altos del Rosario',5,5),(360,'San Cristóbal',5,5),(361,'Zambrano',5,5),(362,'San Jacinto',5,5),(363,'San Pablo de Borbur',5,5),(364,'San Martín de Loba',5,5),(365,'San Jacinto del Cauca',5,5),(366,'Almeida',6,5),(367,'Aquitania',6,5),(368,'Arcabuco',6,5),(369,'Berbeo',6,5),(370,'Betéitiva',6,5),(371,'Boavita',6,5),(372,'Boyacá',6,5),(373,'Briceño',6,5),(374,'Buena Vista',6,5),(375,'Busbanzá',6,5),(376,'Caldas',6,5),(377,'Campohermoso',6,5),(378,'Cerinza',6,5),(379,'Chinavita',6,5),(380,'Chiscas',6,5),(381,'Chita',6,5),(382,'Chitaraque',6,5),(383,'Chivatá',6,5),(384,'Cómbita',6,5),(385,'Coper',6,5),(386,'Corrales',6,5),(387,'Covarachía',6,5),(388,'Cubará',6,5),(389,'Cucaita',6,5),(390,'Cuítiva',6,5),(391,'Chíquiza',6,5),(392,'Chivor',6,5),(393,'El Cocuy',6,5),(394,'El Espino',6,5),(395,'Firavitoba',6,5),(396,'Floresta',6,5),(397,'Gachantivá',6,5),(398,'Gameza',6,5),(399,'Garagoa',6,5),(400,'Guacamayas',6,5),(401,'Guateque',6,5),(402,'Guayatá',6,5),(403,'Güicán',6,5),(404,'Iza',6,5),(405,'Jenesano',6,5),(406,'Jericó',6,5),(407,'Labranzagrande',6,5),(408,'La Capilla',6,5),(409,'La Victoria',6,5),(410,'Macanal',6,5),(411,'Maripí',6,5),(412,'Miraflores',6,5),(413,'Mongua',6,5),(414,'Monguí',6,5),(415,'Moniquirá',6,5),(416,'Muzo',6,5),(417,'Nobsa',6,5),(418,'Nuevo Colón',6,5),(419,'Oicatá',6,5),(420,'Otanche',6,5),(421,'Pachavita',6,5),(422,'Páez',6,5),(423,'Paipa',6,5),(424,'Pajarito',6,5),(425,'Panqueba',6,5),(426,'Pauna',6,5),(427,'Paya',6,5),(428,'Pesca',6,5),(429,'Pisba',6,5),(430,'Puerto Boyacá',6,5),(431,'Quípama',6,5),(432,'Ramiriquí',6,5),(433,'Ráquira',6,5),(434,'Rondón',6,5),(435,'Saboyá',6,5),(436,'Sáchica',6,5),(437,'Samacá',6,5),(438,'San Eduardo',6,5),(439,'San Mateo',6,5),(440,'Santana',6,5),(441,'Santa María',6,5),(442,'Santa Sofía',6,5),(443,'Sativanorte',6,5),(444,'Sativasur',6,5),(445,'Siachoque',6,5),(446,'Soatá',6,5),(447,'Socotá',6,5),(448,'Socha',6,5),(449,'Somondoco',6,5),(450,'Sora',6,5),(451,'Sotaquirá',6,5),(452,'Soracá',6,5),(453,'Susacón',6,5),(454,'Sutamarchán',6,5),(455,'Sutatenza',6,5),(456,'Tasco',6,5),(457,'Tenza',6,5),(458,'Tibaná',6,5),(459,'Tinjacá',6,5),(460,'Tipacoque',6,5),(461,'Toca',6,5),(462,'Tópaga',6,5),(463,'Tota',6,5),(464,'Turmequé',6,5),(465,'Tutazá',6,5),(466,'Umbita',6,5),(467,'Ventaquemada',6,5),(468,'Viracachá',6,5),(469,'Zetaquira',6,5),(470,'Ciénega',6,5),(471,'Motavita',6,5),(472,'Tununguá',6,5),(473,'Togüí',6,5),(474,'Villa de Leyva',6,5),(475,'Paz de Río',6,5),(476,'Santa Rosa de Viterbo',6,5),(477,'San Luis de Gaceno',6,5),(478,'San Pablo de Borbur',6,5),(479,'San Miguel de Sema',6,5),(480,'San José de Pare',6,5),(481,'Tuta',6,5),(482,'Tibasosa',6,5),(483,'Aguadas',7,5),(484,'Anserma',7,5),(485,'Aranzazu',7,5),(486,'Belalcázar',7,5),(487,'Filadelfia',7,5),(488,'La Dorada',7,5),(489,'La Merced',7,5),(490,'Manzanares',7,5),(491,'Marmato',7,5),(492,'Marulanda',7,5),(493,'Neira',7,5),(494,'Norcasia',7,5),(495,'Pácora',7,5),(496,'Palestina',7,5),(497,'Pensilvania',7,5),(498,'Riosucio',7,5),(499,'Risaralda',7,5),(500,'Salamina',7,5),(501,'Samaná',7,5),(502,'San José',7,5),(503,'Supía',7,5),(504,'Victoria',7,5),(505,'Viterbo',7,5),(506,'Marquetalia',7,5),(507,'Albania',8,5),(508,'Curillo',8,5),(509,'El Doncello',8,5),(510,'El Paujil',8,5),(511,'Puerto Rico',8,5),(512,'Solano',8,5),(513,'Solita',8,5),(514,'Valparaíso',8,5),(515,'San José del Fragua',8,5),(516,'Belén de Los Andaquies',8,5),(517,'La Montañita',8,5),(518,'San Vicente del Caguán',8,5),(519,'Cartagena del Chairá',8,5),(520,'Milán',8,5),(521,'Chámeza',9,5),(522,'Hato Corozal',9,5),(523,'La Salina',9,5),(524,'Monterrey',9,5),(525,'Pore',9,5),(526,'Recetor',9,5),(527,'Sabanalarga',9,5),(528,'Sácama',9,5),(529,'Tauramena',9,5),(530,'Trinidad',9,5),(531,'Villanueva',9,5),(532,'Paz de Ariporo',9,5),(533,'Nunchía',9,5),(534,'San Luis de Gaceno',9,5),(535,'Maní',9,5),(536,'Támara',9,5),(537,'Orocué',9,5),(538,'Almaguer',10,5),(539,'Argelia',10,5),(540,'Balboa',10,5),(541,'Bolívar',10,5),(542,'Buenos Aires',10,5),(543,'Cajibío',10,5),(544,'Caldono',10,5),(545,'Caloto',10,5),(546,'Corinto',10,5),(547,'El Tambo',10,5),(548,'Florencia',10,5),(549,'Guachené',10,5),(550,'Guapi',10,5),(551,'Inzá',10,5),(552,'Jambaló',10,5),(553,'La Sierra',10,5),(554,'La Vega',10,5),(555,'López',10,5),(556,'Mercaderes',10,5),(557,'Miranda',10,5),(558,'Morales',10,5),(559,'Padilla',10,5),(560,'Patía',10,5),(561,'Piamonte',10,5),(562,'Piendamó',10,5),(563,'Puerto Tejada',10,5),(564,'Puracé',10,5),(565,'Rosas',10,5),(566,'Santa Rosa',10,5),(567,'Silvia',10,5),(568,'Sotara',10,5),(569,'Suárez',10,5),(570,'Sucre',10,5),(571,'Timbío',10,5),(572,'Timbiquí',10,5),(573,'Toribio',10,5),(574,'Totoró',10,5),(575,'Villa Rica',10,5),(576,'Páez',10,5),(577,'San Sebastián',10,5),(578,'Agustín Codazzi',11,5),(579,'Astrea',11,5),(580,'Becerril',11,5),(581,'Bosconia',11,5),(582,'Chimichagua',11,5),(583,'Chiriguaná',11,5),(584,'Curumaní',11,5),(585,'El Copey',11,5),(586,'El Paso',11,5),(587,'Gamarra',11,5),(588,'González',11,5),(589,'La Gloria',11,5),(590,'Manaure',11,5),(591,'Pailitas',11,5),(592,'Pelaya',11,5),(593,'Pueblo Bello',11,5),(594,'La Paz',11,5),(595,'San Alberto',11,5),(596,'San Diego',11,5),(597,'San Martín',11,5),(598,'Tamalameque',11,5),(599,'Río de Oro',11,5),(600,'La Jagua de Ibirico',11,5),(601,'Acandí',12,5),(602,'Alto Baudo',12,5),(603,'Atrato',12,5),(604,'Bagadó',12,5),(605,'Bahía Solano',12,5),(606,'Bajo Baudó',12,5),(607,'Bojaya',12,5),(608,'Cértegui',12,5),(609,'Condoto',12,5),(610,'Juradó',12,5),(611,'Lloró',12,5),(612,'Medio Atrato',12,5),(613,'Medio Baudó',12,5),(614,'Medio San Juan',12,5),(615,'Nóvita',12,5),(616,'Nuquí',12,5),(617,'Río Iro',12,5),(618,'Río Quito',12,5),(619,'Riosucio',12,5),(620,'Sipí',12,5),(621,'Unguía',12,5),(622,'El Litoral del San Juan',12,5),(623,'El Cantón del San Pablo',12,5),(624,'Carmen del Darien',12,5),(625,'San José del Palmar',12,5),(626,'Tadó',12,5),(627,'Unión Panamericana',12,5),(628,'Belén de Bajira',12,5),(629,'Ayapel',13,5),(630,'Buenavista',13,5),(631,'Canalete',13,5),(632,'Cereté',13,5),(633,'Chimá',13,5),(634,'Chinú',13,5),(635,'Cotorra',13,5),(636,'Los Córdobas',13,5),(637,'Momil',13,5),(638,'Moñitos',13,5),(639,'Planeta Rica',13,5),(640,'Pueblo Nuevo',13,5),(641,'Puerto Escondido',13,5),(642,'Purísima',13,5),(643,'Sahagún',13,5),(644,'San Andrés Sotavento',13,5),(645,'San Antero',13,5),(646,'San Pelayo',13,5),(647,'Tierralta',13,5),(648,'Tuchín',13,5),(649,'Valencia',13,5),(650,'San Bernardo del Viento',13,5),(651,'San José de Uré',13,5),(652,'San Carlos',13,5),(653,'Montelíbano',13,5),(654,'La Apartada',13,5),(655,'Ciénaga de Oro',13,5),(656,'Puerto Libertador',13,5),(657,'Anapoima',14,5),(658,'Arbeláez',14,5),(659,'Beltrán',14,5),(660,'Bituima',14,5),(661,'Bojacá',14,5),(662,'Cabrera',14,5),(663,'Cachipay',14,5),(664,'Cajicá',14,5),(665,'Caparrapí',14,5),(666,'Caqueza',14,5),(667,'Chaguaní',14,5),(668,'Chipaque',14,5),(669,'Choachí',14,5),(670,'Chocontá',14,5),(671,'Cogua',14,5),(672,'Cota',14,5),(673,'Cucunubá',14,5),(674,'El Colegio',14,5),(675,'El Rosal',14,5),(676,'Fomeque',14,5),(677,'Fosca',14,5),(678,'Funza',14,5),(679,'Fúquene',14,5),(680,'Gachala',14,5),(681,'Gachancipá',14,5),(682,'Gachetá',14,5),(683,'Granada',14,5),(684,'Guachetá',14,5),(685,'Guaduas',14,5),(686,'Guasca',14,5),(687,'Guataquí',14,5),(688,'Guatavita',14,5),(689,'Guayabetal',14,5),(690,'Gutiérrez',14,5),(691,'Jerusalén',14,5),(692,'Junín',14,5),(693,'La Calera',14,5),(694,'La Mesa',14,5),(695,'La Palma',14,5),(696,'La Peña',14,5),(697,'La Vega',14,5),(698,'Lenguazaque',14,5),(699,'Macheta',14,5),(700,'Madrid',14,5),(701,'Manta',14,5),(702,'Medina',14,5),(703,'Mosquera',14,5),(704,'Nariño',14,5),(705,'Nemocón',14,5),(706,'Nilo',14,5),(707,'Nimaima',14,5),(708,'Nocaima',14,5),(709,'Pacho',14,5),(710,'Paime',14,5),(711,'Pandi',14,5),(712,'Paratebueno',14,5),(713,'Pasca',14,5),(714,'Puerto Salgar',14,5),(715,'Pulí',14,5),(716,'Quebradanegra',14,5),(717,'Quetame',14,5),(718,'Quipile',14,5),(719,'Apulo',14,5),(720,'Ricaurte',14,5),(721,'San Bernardo',14,5),(722,'San Cayetano',14,5),(723,'San Francisco',14,5),(724,'Sesquilé',14,5),(725,'Sibaté',14,5),(726,'Silvania',14,5),(727,'Simijaca',14,5),(728,'Soacha',14,5),(729,'Subachoque',14,5),(730,'Suesca',14,5),(731,'Supatá',14,5),(732,'Susa',14,5),(733,'Sutatausa',14,5),(734,'Tabio',14,5),(735,'Tausa',14,5),(736,'Tena',14,5),(737,'Tenjo',14,5),(738,'Tibacuy',14,5),(739,'Tibirita',14,5),(740,'Tocaima',14,5),(741,'Tocancipá',14,5),(742,'Topaipí',14,5),(743,'Ubalá',14,5),(744,'Ubaque',14,5),(745,'Une',14,5),(746,'Útica',14,5),(747,'Vianí',14,5),(748,'Villagómez',14,5),(749,'Villapinzón',14,5),(750,'Villeta',14,5),(751,'Viotá',14,5),(752,'Zipacón',14,5),(753,'Agua de Dios',14,5),(754,'San Antonio del Tequendama',14,5),(755,'Carmen de Carupa',14,5),(756,'San Juan de Río Seco',14,5),(757,'Villa de San Diego de Ubate',14,5),(758,'Guayabal de Siquima',14,5),(759,'Vergara',14,5),(760,'Yacopí',14,5),(761,'Fusagasugá',14,5),(762,'Facatativá',14,5),(763,'Sopó',14,5),(764,'Anolaima',14,5),(765,'Chía',14,5),(766,'Sasaima',14,5),(767,'El Peñón',14,5),(768,'Albán',14,5),(769,'Barranco Minas',15,5),(770,'Mapiripana',15,5),(771,'San Felipe',15,5),(772,'Puerto Colombia',15,5),(773,'La Guadalupe',15,5),(774,'Cacahual',15,5),(775,'Pana Pana',15,5),(776,'Morichal',15,5),(777,'Calamar',16,5),(778,'Miraflores',16,5),(779,'El Retorno',16,5),(780,'Acevedo',17,5),(781,'Agrado',17,5),(782,'Aipe',17,5),(783,'Algeciras',17,5),(784,'Altamira',17,5),(785,'Baraya',17,5),(786,'Campoalegre',17,5),(787,'Colombia',17,5),(788,'Elías',17,5),(789,'Garzón',17,5),(790,'Gigante',17,5),(791,'Guadalupe',17,5),(792,'Hobo',17,5),(793,'Iquira',17,5),(794,'Isnos',17,5),(795,'La Argentina',17,5),(796,'La Plata',17,5),(797,'Nátaga',17,5),(798,'Oporapa',17,5),(799,'Paicol',17,5),(800,'Palermo',17,5),(801,'Palestina',17,5),(802,'Pital',17,5),(803,'Rivera',17,5),(804,'Saladoblanco',17,5),(805,'Santa María',17,5),(806,'Suaza',17,5),(807,'Tarqui',17,5),(808,'Tesalia',17,5),(809,'Tello',17,5),(810,'Teruel',17,5),(811,'Timaná',17,5),(812,'Villavieja',17,5),(813,'Yaguará',17,5),(814,'San Agustín',17,5),(815,'Albania',18,5),(816,'Barrancas',18,5),(817,'Dibula',18,5),(818,'Distracción',18,5),(819,'El Molino',18,5),(820,'Fonseca',18,5),(821,'Hatonuevo',18,5),(822,'Manaure',18,5),(823,'Uribia',18,5),(824,'Urumita',18,5),(825,'Villanueva',18,5),(826,'La Jagua del Pilar',18,5),(827,'San Juan del Cesar',18,5),(828,'Algarrobo',19,5),(829,'Aracataca',19,5),(830,'Ariguaní',19,5),(831,'Cerro San Antonio',19,5),(832,'Chivolo',19,5),(833,'Concordia',19,5),(834,'El Banco',19,5),(835,'El Piñon',19,5),(836,'El Retén',19,5),(837,'Fundación',19,5),(838,'Guamal',19,5),(839,'Nueva Granada',19,5),(840,'Pedraza',19,5),(841,'Pivijay',19,5),(842,'Plato',19,5),(843,'Remolino',19,5),(844,'Salamina',19,5),(845,'San Zenón',19,5),(846,'Santa Ana',19,5),(847,'Sitionuevo',19,5),(848,'Tenerife',19,5),(849,'Zapayán',19,5),(850,'Zona Bananera',19,5),(851,'San Sebastián de Buenavista',19,5),(852,'Sabanas de San Angel',19,5),(853,'Santa Bárbara de Pinto',19,5),(854,'Pueblo Viejo',19,5),(855,'Pijiño del Carmen',19,5),(856,'Cabuyaro',20,5),(857,'Cubarral',20,5),(858,'Cumaral',20,5),(859,'El Calvario',20,5),(860,'El Castillo',20,5),(861,'El Dorado',20,5),(862,'Granada',20,5),(863,'Santacruz',21,5),(864,'Puerto Wilches',27,5),(865,'Puerto Parra',27,5),(866,'Uribe',20,5),(867,'Venecia',14,5),(868,'Guamal',20,5),(869,'Mapiripán',20,5),(870,'Mesetas',20,5),(871,'La Macarena',20,5),(872,'Lejanías',20,5),(873,'Puerto Concordia',20,5),(874,'Puerto Gaitán',20,5),(875,'Puerto López',20,5),(876,'Puerto Lleras',20,5),(877,'Puerto Rico',20,5),(878,'Restrepo',20,5),(879,'San Juanito',20,5),(880,'San Martín',20,5),(881,'Vista Hermosa',20,5),(882,'Albán',21,5),(883,'Aldana',21,5),(884,'Ancuyá',21,5),(885,'Barbacoas',21,5),(886,'Colón',21,5),(887,'Consaca',21,5),(888,'Contadero',21,5),(889,'Córdoba',21,5),(890,'Cuaspud',21,5),(891,'Cumbal',21,5),(892,'Cumbitara',21,5),(893,'El Charco',21,5),(894,'El Peñol',21,5),(895,'El Rosario',21,5),(896,'El Tambo',21,5),(897,'Funes',21,5),(898,'Guachucal',21,5),(899,'Guaitarilla',21,5),(900,'Gualmatán',21,5),(901,'Iles',21,5),(902,'Imués',21,5),(903,'Ipiales',21,5),(904,'La Cruz',21,5),(905,'La Florida',21,5),(906,'La Llanada',21,5),(907,'La Tola',21,5),(908,'La Unión',21,5),(909,'Leiva',21,5),(910,'Linares',21,5),(911,'Los Andes',21,5),(912,'Magüí',21,5),(913,'Mallama',21,5),(914,'Mosquera',21,5),(915,'Nariño',21,5),(916,'Olaya Herrera',21,5),(917,'Ospina',21,5),(918,'Francisco Pizarro',21,5),(919,'Policarpa',21,5),(920,'Potosí',21,5),(921,'Providencia',21,5),(922,'Puerres',21,5),(923,'Pupiales',21,5),(924,'Ricaurte',21,5),(925,'Roberto Payán',21,5),(926,'Samaniego',21,5),(927,'Sandoná',21,5),(928,'San Bernardo',21,5),(929,'San Lorenzo',21,5),(930,'San Pablo',21,5),(931,'Santa Bárbara',21,5),(932,'Sapuyes',21,5),(933,'Taminango',21,5),(934,'Tangua',21,5),(935,'Túquerres',21,5),(936,'Yacuanquer',21,5),(937,'Buenavista',24,5),(938,'Circasia',24,5),(939,'Córdoba',24,5),(940,'Filandia',24,5),(941,'La Tebaida',24,5),(942,'Pijao',24,5),(943,'Quimbaya',24,5),(944,'Salento',24,5),(945,'Apía',25,5),(946,'Balboa',25,5),(947,'Guática',25,5),(948,'La Celia',25,5),(949,'La Virginia',25,5),(950,'Marsella',25,5),(951,'Mistrató',25,5),(952,'Pueblo Rico',25,5),(953,'Quinchía',25,5),(954,'Santuario',25,5),(955,'Aguada',27,5),(956,'Albania',27,5),(957,'Aratoca',27,5),(958,'Barbosa',27,5),(959,'Barichara',27,5),(960,'Barrancabermeja',27,5),(961,'Betulia',27,5),(962,'Bolívar',27,5),(963,'Cabrera',27,5),(964,'California',27,5),(965,'Carcasí',27,5),(966,'Cepitá',27,5),(967,'Cerrito',27,5),(968,'Charalá',27,5),(969,'Charta',27,5),(970,'Chipatá',27,5),(971,'Cimitarra',27,5),(972,'Concepción',27,5),(973,'Confines',27,5),(974,'Contratación',27,5),(975,'Coromoro',27,5),(976,'Curití',27,5),(977,'El Guacamayo',27,5),(978,'El Playón',27,5),(979,'Encino',27,5),(980,'Enciso',27,5),(981,'Florián',27,5),(982,'Galán',27,5),(983,'Gambita',27,5),(984,'Girón',27,5),(985,'Guaca',27,5),(986,'Guadalupe',27,5),(987,'Guapotá',27,5),(988,'Guavatá',27,5),(989,'Güepsa',27,5),(990,'Jesús María',27,5),(991,'Jordán',27,5),(992,'La Belleza',27,5),(993,'Landázuri',27,5),(994,'La Paz',27,5),(995,'Lebríja',27,5),(996,'Los Santos',27,5),(997,'Macaravita',27,5),(998,'Málaga',27,5),(999,'Matanza',27,5),(1000,'Mogotes',27,5),(1001,'Molagavita',27,5),(1002,'Ocamonte',27,5),(1003,'Oiba',27,5),(1004,'Onzaga',27,5),(1005,'Palmar',27,5),(1006,'Páramo',27,5),(1007,'Piedecuesta',27,5),(1008,'Pinchote',27,5),(1009,'Puente Nacional',27,5),(1010,'Rionegro',27,5),(1011,'San Andrés',27,5),(1012,'San Gil',27,5),(1013,'San Joaquín',27,5),(1014,'San Miguel',27,5),(1015,'Santa Bárbara',27,5),(1016,'Simacota',27,5),(1017,'Socorro',27,5),(1018,'Suaita',27,5),(1019,'Sucre',27,5),(1020,'Suratá',27,5),(1021,'Tona',27,5),(1022,'Vélez',27,5),(1023,'Vetas',27,5),(1024,'Villanueva',27,5),(1025,'Zapatoca',27,5),(1026,'Buenavista',28,5),(1027,'Caimito',28,5),(1028,'Coloso',28,5),(1029,'Coveñas',28,5),(1030,'Chalán',28,5),(1031,'El Roble',28,5),(1032,'Galeras',28,5),(1033,'Guaranda',28,5),(1034,'La Unión',28,5),(1035,'Los Palmitos',28,5),(1036,'Majagual',28,5),(1037,'Morroa',28,5),(1038,'Ovejas',28,5),(1039,'Palmito',28,5),(1040,'San Benito Abad',28,5),(1041,'San Marcos',28,5),(1042,'San Onofre',28,5),(1043,'San Pedro',28,5),(1044,'Sucre',28,5),(1045,'Tolú Viejo',28,5),(1046,'Alpujarra',29,5),(1047,'Alvarado',29,5),(1048,'Ambalema',29,5),(1049,'Armero',29,5),(1050,'Ataco',29,5),(1051,'Cajamarca',29,5),(1052,'Chaparral',29,5),(1053,'Coello',29,5),(1054,'Coyaima',29,5),(1055,'Cunday',29,5),(1056,'Dolores',29,5),(1057,'Falan',29,5),(1058,'Flandes',29,5),(1059,'Fresno',29,5),(1060,'Guamo',29,5),(1061,'Herveo',29,5),(1062,'Honda',29,5),(1063,'Icononzo',29,5),(1064,'Mariquita',29,5),(1065,'Melgar',29,5),(1066,'Murillo',29,5),(1067,'Natagaima',29,5),(1068,'Ortega',29,5),(1069,'Palocabildo',29,5),(1070,'Piedras',29,5),(1071,'Planadas',29,5),(1072,'Prado',29,5),(1073,'Purificación',29,5),(1074,'Rio Blanco',29,5),(1075,'Roncesvalles',29,5),(1076,'Rovira',29,5),(1077,'Saldaña',29,5),(1078,'Santa Isabel',29,5),(1079,'Venadillo',29,5),(1080,'Villahermosa',29,5),(1081,'Villarrica',29,5),(1082,'Colón',23,5),(1083,'Orito',23,5),(1084,'Puerto Caicedo',23,5),(1085,'Puerto Guzmán',23,5),(1086,'Leguízamo',23,5),(1087,'Sibundoy',23,5),(1088,'San Francisco',23,5),(1089,'San Miguel',23,5),(1090,'Santiago',23,5),(1091,'Carurú',31,5),(1092,'Taraira',31,5),(1093,'Papunahua',31,5),(1094,'Yavaraté',31,5),(1095,'Pacoa',31,5),(1096,'La Primavera',32,5),(1097,'Santa Rosalía',32,5),(1098,'Cumaribo',32,5),(1099,'Barranca de Upía',20,5),(1100,'Palmas del Socorro',27,5),(1101,'Fuente de Oro',20,5),(1102,'Hatillo de Loba',5,5),(1103,'San Carlos de Guaroa',20,5),(1104,'Valle de San Juan',29,5),(1105,'San Vicente de Chucurí',27,5),(1106,'San José de Miranda',27,5),(1107,'Santa Rosa de Cabal',25,5),(1108,'Santa Helena del Opón',27,5),(1109,'San Luis de Sincé',28,5),(1110,'El Carmen de Atrato',12,5),(1111,'San Juan de Betulia',28,5),(1112,'Carmen de Apicala',29,5),(1113,'Sabana de Torres',27,5),(1114,'San Pedro de Cartago',21,5),(1115,'Campo de La Cruz',4,5),(1116,'San Juan de Arama',20,5),(1117,'El Tablón de Gómez',21,5),(1118,'Valle de Guamez',23,5),(1119,'Santiago de Tolú',28,5),(1120,'El Carmen de Chucurí',27,5),(1121,'Belén de Umbría',25,5),(1122,'Valle de San José',27,5),(1123,'San Luis',29,5),(1124,'San Antonio',29,5),(1125,'San Benito',27,5),(1126,'Hato',27,5),(1127,'Silos',22,5),(1128,'Cácota',22,5),(1129,'El Dovio',30,5),(1130,'Toledo',22,5),(1131,'Roldanillo',30,5),(1132,'Mutiscua',22,5),(1133,'Argelia',30,5),(1134,'El Zulia',22,5),(1135,'Salazar',22,5),(1136,'Sevilla',30,5),(1137,'Zarzal',30,5),(1138,'Cucutilla',22,5),(1139,'El Cerrito',30,5),(1140,'Cartago',30,5),(1141,'Caicedonia',30,5),(1142,'Puerto Santander',22,5),(1143,'Gramalote',22,5),(1144,'El Cairo',30,5),(1145,'El Tarra',22,5),(1146,'La Unión',30,5),(1147,'Restrepo',30,5),(1148,'Teorama',22,5),(1149,'Dagua',30,5),(1150,'Arboledas',22,5),(1151,'Guacarí',30,5),(1152,'Lourdes',22,5),(1153,'Ansermanuevo',30,5),(1154,'Bochalema',22,5),(1155,'Bugalagrande',30,5),(1156,'Convención',22,5),(1157,'Hacarí',22,5),(1158,'La Victoria',30,5),(1159,'Herrán',22,5),(1160,'Ginebra',30,5),(1161,'Yumbo',30,5),(1162,'Obando',30,5),(1163,'Tibú',22,5),(1164,'San Cayetano',22,5),(1165,'San Calixto',22,5),(1166,'Bolívar',30,5),(1167,'La Playa',22,5),(1168,'San Pedro',30,5),(1169,'Guadalajara de Buga',30,5),(1170,'Chinácota',22,5),(1171,'Ragonvalia',22,5),(1172,'La Esperanza',22,5),(1173,'Villa del Rosario',22,5),(1174,'Chitagá',22,5),(1175,'Calima',30,5),(1176,'Sardinata',22,5),(1177,'Andalucía',30,5),(1178,'Pradera',30,5),(1179,'Abrego',22,5),(1180,'Los Patios',22,5),(1181,'Bucarasica',22,5),(1182,'Yotoco',30,5),(1183,'Riofrío',30,5),(1184,'Santiago',22,5),(1185,'Alcalá',30,5),(1186,'Versalles',30,5),(1187,'Labateca',22,5),(1188,'Cachirá',22,5),(1189,'Villa Caro',22,5),(1190,'Durania',22,5),(1191,'El Águila',30,5),(1192,'Toro',30,5),(1193,'Candelaria',30,5),(1194,'La Cumbre',30,5),(1195,'Ulloa',30,5),(1196,'Trujillo',30,5),(1197,'Vijes',30,5),(1198,'Chimá',27,5),(1199,'Sampués',28,5),(1200,'Pamplona',22,5),(1201,'Puerto Asís',23,5),(1202,'Buesaco',21,5),(1203,'Tuluá',30,5),(1204,'Casabianca',29,5),(1205,'San Andrés de Tumaco',21,5),(1206,'Capitanejo',27,5),(1207,'Anzoátegui',29,5),(1208,'Florida',30,5),(1209,'Pamplonita',22,5),(1210,'Puerto Colombia',4,5),(1211,'Belén',21,5),(1212,'Gama',14,5),(1213,'Chachagüí',21,5),(1214,'El Peñón',27,5),(1215,'Jamundí',30,5),(1216,'Líbano',29,5),(1217,'Calarcá',24,5),(1218,'El Carmen',22,5),(1219,'Lérida',29,5),(1220,'La Uvita',6,5),(1221,'Génova',24,5),(1222,'Suárez',29,5),(1223,'Castilla la Nueva',20,5),(1224,'Belén',6,5),(1225,'Villagarzón',23,5),(1226,'Arboleda',21,5);


CREATE TABLE IF NOT EXISTS influencer_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL UNIQUE,
    min_followers INT NOT NULL,
    max_followers INT DEFAULT NULL
);

INSERT INTO influencer_classes (class_name, min_followers, max_followers)
VALUES
    ('Nano', 1, 9999),
    ('Micro', 10000, 99999),
    ('Macro', 100000, 999999),
    ('Mega', 1000000, 9999999999);

-- Crear la tabla de etnias si no existe
CREATE TABLE IF NOT EXISTS ethnic_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ethnicity_name VARCHAR(255) NOT NULL UNIQUE
);

-- Insertar las etnias en la tabla
INSERT INTO ethnic_groups (ethnicity_name) VALUES
('Wayuu (Guajira)'),
('Embera (Chocó, Risaralda, Antioquia)'),
('Nasa (Cauca)'),
('Arhuaco (Sierra Nevada de Santa Marta)'),
('Kogui (Sierra Nevada de Santa Marta)'),
('Zenú (Córdoba y Sucre)'),
('Awá (Nariño y Putumayo)'),
('Ticuna (Amazonas)'),
('Uitoto (Amazonas y Caquetá)'),
('Sikuani (Orinoquía)'),
('Afrodescendiente');

-- Crear la tabla hair_types (tipos de cabello)
CREATE TABLE IF NOT EXISTS hair_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hair_type_name VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar datos de ejemplo para tipos de cabello
INSERT INTO hair_types (hair_type_name) VALUES 
('Liso'),
('Ondulado'),
('Rizado'),
('Crespo (Afro)');

-- Crear la tabla hair_colors (colores de cabello)
CREATE TABLE IF NOT EXISTS hair_colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hair_color_name VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar datos de ejemplo para colores de cabello
INSERT INTO hair_colors (hair_color_name) VALUES 
('Negro'),
('Castaño'),
('Rubio'),
('Pelirrojo'),
('Gris o Canoso');

-- Crear la tabla skin_colors (colores de piel)
CREATE TABLE IF NOT EXISTS skin_colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skin_color_name VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar datos de ejemplo para colores de piel
INSERT INTO skin_colors (skin_color_name) VALUES 
('Piel blanca'),
('Piel trigueña'),
('Piel morena'),
('Piel negra');

CREATE TABLE IF NOT EXISTS TagsCategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE);

CREATE TABLE IF NOT EXISTS SubCategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subcategory_name VARCHAR(100) NOT NULL,
  tag_category_id INT NOT NULL,
  FOREIGN KEY (tag_category_id) REFERENCES TagsCategories(id)
  ON DELETE CASCADE ON UPDATE CASCADE);

INSERT INTO TagsCategories (category_name) VALUES
('Moda'),
('Estilo de vida'),
('Salud'),
('Hogar y Decoración'),
('Viajes y Turismo'),
('Entretenimiento y Cultura'),
('Gastronomía y Comida'),
('Deportes y Fitness'),
('Tecnología y Gadgets'),
('Negocios y Educación'),
('Familia y Crianza'),
('Belleza'),
('Arte y Creatividad'),
('Animales y Mascotas'),
('Gaming'),
('Activismo y Causas sociales');

-- Insertar subcategorías
INSERT INTO SubCategories (subcategory_name, tag_category_id) VALUES
-- Subcategorías de Moda
('Diseño de Ropa', 1),
('Estilo Personal', 1),
('Modelo', 1),
('Tips y Tendencias de Moda', 1),
('Accesorios', 1),
('Calzado', 1),
-- Subcategorías de Estilo de Vida
('Rutina Diaria', 2),
('Lujo', 2),
('Familia', 2),
('Yoga y Meditación', 2),
('Estilo de Vida Saludable', 2),
('Minimalismo', 2),
('Vida en el Campo', 2),
('Espiritualidad', 2),
('Culturas Alternativas', 2),
-- Subcategorías de Salud
('Skin Care', 3),
('Cuidado del Cabello', 3),
('Cuidado de Manos y Uñas', 3),
('Salud Mental', 3),
('Médico', 3),
('Nutrición', 3),
('Espiritualidad', 3),
('Naturista', 3),
-- Subcategorías de Hogar y Decoración
('Decoración de Interiores', 4),
('Organización del Hogar', 4),
('Hazlo Tú Mismo/DIY', 4),
-- Subcategorías de Viajes y Turismo
('Viajes por el Mundo', 5),
('Turismo Urbano', 5),
('Ecoturismo', 5),
('Destinos de Playa', 5),
('Viajes de Lujo', 5),
('Mochileros', 5),
('Viajes Familiares', 5),
('Económicos', 5),
-- Subcategorías de Entretenimiento y Cultura
('Chisme y Farándula', 6),
('Humor', 6),
('Streamers', 6),
('Opinión Musical', 6),
-- Subcategorías de Gastronomía y Comida
('Foodies', 7),
('Recetas Caseras', 7),
('Chef\'s', 7),
('Comida Saludable', 7),
('Bebidas', 7),
('Recetas Keto', 7),
('Recetas para Niños', 7),
-- Subcategorías de Deportes y Fitness
('Deportistas Profesionales', 8),
('Moteros', 8),
('Fitness', 8),
('Gym', 8),
('Fútbol', 8),
-- Subcategorías de Tecnología y Gadgets
('Gadgets', 9),
('Computación', 9),
('Apps', 9),
('Unboxing', 9),
('Startups', 9),
('Celulares', 9),
('Cámaras', 9),
-- Subcategorías de Negocios y Educación
('Desarrollo Personal', 10),
('Emprendimiento', 10),
('Finanzas Personales', 10),
('Idiomas', 10),
('Ciencia y Tecnología', 10),
('Historia y Cultura', 10),
('Arquitectura', 10),
('Ingeniería Civil', 10),
('Derecho', 10),
('Desarrollo de Software', 10),
('Inteligencia Artificial', 10),
('Política', 10),
('Bienes Raíces', 10),
('Marketing', 10),
('Marketing Digital', 10),
-- Subcategorías de Familia y Crianza
('Maternidad y Paternidad', 11),
('Educación Infantil', 11),
('Crianza Positiva', 11),
('Actividades para Niños', 11),
-- Subcategorías de Belleza
('Tratamientos Estéticos', 12),
('Peinados', 12),
('Makeup', 12),
-- Subcategorías de Arte y Creatividad
('Fotografía', 13),
('Diseño Gráfico', 13),
('Músicos', 13),
('Actores', 13),
('Tatuajes', 13),
('Grafiti', 13),
-- Subcategorías de Animales y Mascotas
('Cuidado de Mascotas', 14),
('Entrenamiento de Mascotas', 14),
('Rescate', 14),
('Vida con Mascotas', 14),
('Ganadería', 14),
('Caballos', 14),
('Animales del Campo', 14),
-- Subcategorías de Gaming
('Gameplay en Vivo', 15),
('Esports', 15),
('Desarrollo de Juegos', 15),
('Accesorios Gaming', 15),
-- Subcategorías de Activismo y Causas Sociales
('Medio Ambiente', 16),
('Derechos Humanos', 16),
('Activismo Comunitario', 16),
('Conciencia Social', 16),
('Política', 16);


-- Crear tabla para las clases sociales
CREATE TABLE IF NOT EXISTS social_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar valores iniciales
INSERT INTO social_classes (class_name)
VALUES ('Alta'), ('Media'), ('Baja');

-- Tabla intermedia para relacionar influencers con tags
CREATE TABLE IF NOT EXISTS InfluencerSubcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    influencerId INT NOT NULL,
    subcategoryId INT NOT NULL,
    FOREIGN KEY (influencerId) REFERENCES influencers(idUser) ON DELETE CASCADE,
    FOREIGN KEY (subcategoryId) REFERENCES SubCategories(id) ON DELETE CASCADE
);

INSERT INTO InfluencerSubcategories (influencerId, subcategoryId) VALUES
(1, 2), -- Juan Pérez -> Technology
(1, 5), -- Juan Pérez -> Fashion
(2, 1), -- María Gómez -> Beauty
(2, 3), -- María Gómez -> Fitness
(3, 4), -- Carlos Rodríguez -> Gaming
(3, 6), -- Carlos Rodríguez -> Lifestyle
(4, 1), -- Ana Martínez -> Beauty
(4, 5), -- Ana Martínez -> Fashion
(5, 3), -- Pedro Ramírez -> Fitness
(5, 7), -- Pedro Ramírez -> Health
(6, 2), -- Laura Hernández -> Technology
(6, 8), -- Laura Hernández -> Travel
(7, 9), -- David Sánchez -> Music
(7, 10), -- David Sánchez -> Dance
(1, 6), -- Juan Pérez -> Lifestyle
(2, 8), -- María Gómez -> Travel
(3, 10), -- Carlos Rodríguez -> Dance
(4, 9), -- Ana Martínez -> Music
(5, 4), -- Pedro Ramírez -> Gaming
(6, 7); -- Laura Hernández -> Health


ALTER TABLE `influencers` 
ADD COLUMN `isUGC` TINYINT(1) NULL DEFAULT '1' AFTER `celebrity`;

ALTER TABLE `influencers` 
MODIFY COLUMN `isUGC` TINYINT(1) NOT NULL DEFAULT '1';

-- Agregar columna a la tabla influencers para referenciar a social_classes
ALTER TABLE influencers
  ADD CONSTRAINT fk_social_class
  FOREIGN KEY (social_class_id) REFERENCES social_classes(id)
  ON DELETE SET NULL 
  ON UPDATE CASCADE;

--
-- Indices de la tabla `influencers`

ALTER TABLE `influencers`
  ADD CONSTRAINT `fk_city`
  FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE `influencers`
  ADD CONSTRAINT `fk_state`
  FOREIGN KEY (`state_id`) REFERENCES `departments` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE `influencers`
  ADD CONSTRAINT `fk_countries`
  FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE `influencers`
  ADD CONSTRAINT `fk_gender`
  FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE `influencers`
  ADD CONSTRAINT `fk_hair_color`
  FOREIGN KEY (`hair_color_id`) REFERENCES `hair_colors` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE `influencers`
  ADD CONSTRAINT `fk_hair_type`
  FOREIGN KEY (`hair_type_id`) REFERENCES `hair_types` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE `influencers`
  ADD CONSTRAINT `fk_skin_color`
  FOREIGN KEY (`skin_color_id`) REFERENCES `skin_colors` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE influencers ENGINE=InnoDB;
ALTER TABLE SubCategories ENGINE=InnoDB;  
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD UNIQUE KEY `user_roles_userId_roleId_unique` (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Filtros para la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
