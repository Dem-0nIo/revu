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
SET GLOBAL time_zone = '-05:00';
CREATE USER IF NOT EXISTS 'robot'@'%' IDENTIFIED BY '12345678';
GRANT SELECT, REFERENCES ON revu_db.* TO 'robot'@'%';

CREATE USER IF NOT EXISTS 'robot'@'localhost' IDENTIFIED BY '12345678';
GRANT SELECT, REFERENCES ON revu_db.* TO 'robot'@'localhost';

FLUSH PRIVILEGES;


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

CREATE TABLE `cotizaciones` (
  `idCotizacion` int(11) NOT NULL,
  `influencerId` varchar(255) DEFAULT NULL,
  `numCotizacion` varchar(255) NOT NULL,
  `numContacto` varchar(255) NOT NULL,
  `personaContacto` varchar(255) NOT NULL,
  `emailContacto` varchar(255) NOT NULL,
  `whatsappContacto` varchar(255) NOT NULL,
  `status` enum('APPROVED','PENDING','CANCELED') NOT NULL DEFAULT 'PENDING',
  `price` varchar(255) NOT NULL,
  `dateCreated` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
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

CREATE TABLE `influencers` (
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idUser`)
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

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(2, 'moderator', '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(3, 'admin', '2024-10-08 17:03:32', '2024-10-08 17:03:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
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

CREATE TABLE `user_roles` (
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
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
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert major cities for each country
INSERT INTO cities (city_name, country_id) VALUES

-- Colombia


('Leticia',(SELECT id FROM countries WHERE iso_code = 'COL')),
('Puerto Nariño', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Antioquia
('Medellín', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Bello', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Itagüí', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Envigado', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Rionegro', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Turbo', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Arauca
('Arauca',(SELECT id FROM countries WHERE iso_code = 'COL')),
('Arauquita', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Saravena', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Atlántico
('Barranquilla', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Soledad', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Malambo', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Sabanalarga', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Bolívar
('Cartagena', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Magangué', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Turbaco', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Arjona', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Boyacá
('Tunja', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Duitama', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Sogamoso', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Chiquinquirá', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Caldas
('Manizales', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Chinchiná', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Villamaría', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Caquetá
('Florencia', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Morelia', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Casanare
('Yopal', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Aguazul', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Cauca
('Popayán', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Santander de Quilichao', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Cesar
('Valledupar', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Aguachica', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Chocó
('Quibdó', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Istmina', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Córdoba
('Montería', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Lorica', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Cundinamarca
('Bogotá', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Zipaquirá', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Girardot', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Guainía
('Inírida', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Guaviare
('San José del Guaviare', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Huila
('Neiva', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Pitalito', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- La Guajira
('Riohacha', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Maicao', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Magdalena
('Santa Marta', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Ciénaga', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Meta
('Villavicencio', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Acacías', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Nariño
('Pasto', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Tumaco', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Norte de Santander
('Cúcuta', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Ocaña', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Putumayo
('Mocoa', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Quindío
('Armenia', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Montenegro', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Risaralda
('Pereira', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Dosquebradas', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- San Andrés y Providencia
('San Andrés', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Santander
('Bucaramanga', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Floridablanca', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Sucre
('Sincelejo', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Corozal', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Tolima
('Ibagué', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Espinal', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Valle del Cauca
('Cali', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Palmira', (SELECT id FROM countries WHERE iso_code = 'COL')),
('Buenaventura', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Vaupés
('Mitú', (SELECT id FROM countries WHERE iso_code = 'COL')),

-- Vichada
('Puerto Carreño', (SELECT id FROM countries WHERE iso_code = 'COL'));
-- Argentina
('Buenos Aires', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('Córdoba', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('Rosario', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('Mendoza', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('San Miguel de Tucumán', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('La Plata', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('Mar del Plata', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('Salta', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('Santa Fe', (SELECT id FROM countries WHERE iso_code = 'ARG')),
('San Juan', (SELECT id FROM countries WHERE iso_code = 'ARG')),

-- Bolivia
('La Paz', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Santa Cruz de la Sierra', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Cochabamba', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Sucre', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Oruro', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Potosí', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Tarija', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Trinidad', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('Cobija', (SELECT id FROM countries WHERE iso_code = 'BOL')),
('El Alto', (SELECT id FROM countries WHERE iso_code = 'BOL')),

-- Brazil
('São Paulo', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Rio de Janeiro', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Brasilia', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Salvador', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Fortaleza', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Belo Horizonte', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Manaus', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Curitiba', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Recife', (SELECT id FROM countries WHERE iso_code = 'BRA')),
('Porto Alegre', (SELECT id FROM countries WHERE iso_code = 'BRA')),

-- Chile
('Santiago', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Valparaíso', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Concepción', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('La Serena', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Antofagasta', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Temuco', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Rancagua', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Arica', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Puerto Montt', (SELECT id FROM countries WHERE iso_code = 'CHL')),
('Iquique', (SELECT id FROM countries WHERE iso_code = 'CHL')),

-- Ecuador
('Quito', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Guayaquil', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Cuenca', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Ambato', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Machala', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Portoviejo', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Loja', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Ibarra', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Manta', (SELECT id FROM countries WHERE iso_code = 'ECU')),
('Esmeraldas', (SELECT id FROM countries WHERE iso_code = 'ECU')),

-- Peru
('Lima', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Arequipa', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Cusco', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Trujillo', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Chiclayo', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Piura', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Iquitos', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Tacna', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Pucallpa', (SELECT id FROM countries WHERE iso_code = 'PER')),
('Juliaca', (SELECT id FROM countries WHERE iso_code = 'PER')),

-- Mexico
('Mexico City', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('Guadalajara', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('Monterrey', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('Puebla', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('Tijuana', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('Mérida', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('Cancún', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('San Luis Potosí', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('León', (SELECT id FROM countries WHERE iso_code = 'MEX')),
('Querétaro', (SELECT id FROM countries WHERE iso_code = 'MEX'));

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
CREATE TABLE social_classes (
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
ALTER TABLE sub_categories ENGINE=InnoDB;  
--

-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`idCotizacion`);

-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
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
