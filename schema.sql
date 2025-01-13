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
SET time_zone = "+00:00";


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
('Masculino'),
('Femenino'),
('Homosexual'),
('No binario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `influencers`
--

CREATE TABLE `influencers` (
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `cityNac` varchar(255) DEFAULT NULL,
  `birthdayDate` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `gender_id` INT DEFAULT NULL,
  `eps` varchar(255) DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `addressLine` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
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
  `socialNetwork` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`socialNetwork`)),
  `img` varchar(255) DEFAULT NULL,
  `costo_1` int(11) DEFAULT NULL,
  `costo_2` int(11) DEFAULT NULL,
  `costo_3` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

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
  `id` int(11) NOT NULL,
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

-- Crear la tabla de ciudades
CREATE TABLE IF NOT EXISTS cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Insertar ciudades con su respectivo departamento
INSERT INTO cities (city_name, department_id) VALUES
-- Amazonas
('Leticia', (SELECT id FROM departments WHERE department_name = 'Amazonas')),
('Puerto Nariño', (SELECT id FROM departments WHERE department_name = 'Amazonas')),

-- Antioquia
('Medellín', (SELECT id FROM departments WHERE department_name = 'Antioquia')),
('Bello', (SELECT id FROM departments WHERE department_name = 'Antioquia')),
('Itagüí', (SELECT id FROM departments WHERE department_name = 'Antioquia')),
('Envigado', (SELECT id FROM departments WHERE department_name = 'Antioquia')),
('Rionegro', (SELECT id FROM departments WHERE department_name = 'Antioquia')),
('Turbo', (SELECT id FROM departments WHERE department_name = 'Antioquia')),

-- Arauca
('Arauca', (SELECT id FROM departments WHERE department_name = 'Arauca')),
('Arauquita', (SELECT id FROM departments WHERE department_name = 'Arauca')),
('Saravena', (SELECT id FROM departments WHERE department_name = 'Arauca')),

-- Atlántico
('Barranquilla', (SELECT id FROM departments WHERE department_name = 'Atlántico')),
('Soledad', (SELECT id FROM departments WHERE department_name = 'Atlántico')),
('Malambo', (SELECT id FROM departments WHERE department_name = 'Atlántico')),
('Sabanalarga', (SELECT id FROM departments WHERE department_name = 'Atlántico')),

-- Bolívar
('Cartagena', (SELECT id FROM departments WHERE department_name = 'Bolívar')),
('Magangué', (SELECT id FROM departments WHERE department_name = 'Bolívar')),
('Turbaco', (SELECT id FROM departments WHERE department_name = 'Bolívar')),
('Arjona', (SELECT id FROM departments WHERE department_name = 'Bolívar')),

-- Boyacá
('Tunja', (SELECT id FROM departments WHERE department_name = 'Boyacá')),
('Duitama', (SELECT id FROM departments WHERE department_name = 'Boyacá')),
('Sogamoso', (SELECT id FROM departments WHERE department_name = 'Boyacá')),
('Chiquinquirá', (SELECT id FROM departments WHERE department_name = 'Boyacá')),

-- Caldas
('Manizales', (SELECT id FROM departments WHERE department_name = 'Caldas')),
('Chinchiná', (SELECT id FROM departments WHERE department_name = 'Caldas')),
('Villamaría', (SELECT id FROM departments WHERE department_name = 'Caldas')),

-- Caquetá
('Florencia', (SELECT id FROM departments WHERE department_name = 'Caquetá')),
('Morelia', (SELECT id FROM departments WHERE department_name = 'Caquetá')),

-- Casanare
('Yopal', (SELECT id FROM departments WHERE department_name = 'Casanare')),
('Aguazul', (SELECT id FROM departments WHERE department_name = 'Casanare')),

-- Cauca
('Popayán', (SELECT id FROM departments WHERE department_name = 'Cauca')),
('Santander de Quilichao', (SELECT id FROM departments WHERE department_name = 'Cauca')),

-- Cesar
('Valledupar', (SELECT id FROM departments WHERE department_name = 'Cesar')),
('Aguachica', (SELECT id FROM departments WHERE department_name = 'Cesar')),

-- Chocó
('Quibdó', (SELECT id FROM departments WHERE department_name = 'Chocó')),
('Istmina', (SELECT id FROM departments WHERE department_name = 'Chocó')),

-- Córdoba
('Montería', (SELECT id FROM departments WHERE department_name = 'Córdoba')),
('Lorica', (SELECT id FROM departments WHERE department_name = 'Córdoba')),

-- Cundinamarca
('Bogotá', (SELECT id FROM departments WHERE department_name = 'Cundinamarca')),
('Zipaquirá', (SELECT id FROM departments WHERE department_name = 'Cundinamarca')),
('Girardot', (SELECT id FROM departments WHERE department_name = 'Cundinamarca')),

-- Guainía
('Inírida', (SELECT id FROM departments WHERE department_name = 'Guainía')),

-- Guaviare
('San José del Guaviare', (SELECT id FROM departments WHERE department_name = 'Guaviare')),

-- Huila
('Neiva', (SELECT id FROM departments WHERE department_name = 'Huila')),
('Pitalito', (SELECT id FROM departments WHERE department_name = 'Huila')),

-- La Guajira
('Riohacha', (SELECT id FROM departments WHERE department_name = 'La Guajira')),
('Maicao', (SELECT id FROM departments WHERE department_name = 'La Guajira')),

-- Magdalena
('Santa Marta', (SELECT id FROM departments WHERE department_name = 'Magdalena')),
('Ciénaga', (SELECT id FROM departments WHERE department_name = 'Magdalena')),

-- Meta
('Villavicencio', (SELECT id FROM departments WHERE department_name = 'Meta')),
('Acacías', (SELECT id FROM departments WHERE department_name = 'Meta')),

-- Nariño
('Pasto', (SELECT id FROM departments WHERE department_name = 'Nariño')),
('Tumaco', (SELECT id FROM departments WHERE department_name = 'Nariño')),

-- Norte de Santander
('Cúcuta', (SELECT id FROM departments WHERE department_name = 'Norte de Santander')),
('Ocaña', (SELECT id FROM departments WHERE department_name = 'Norte de Santander')),

-- Putumayo
('Mocoa', (SELECT id FROM departments WHERE department_name = 'Putumayo')),

-- Quindío
('Armenia', (SELECT id FROM departments WHERE department_name = 'Quindío')),
('Montenegro', (SELECT id FROM departments WHERE department_name = 'Quindío')),

-- Risaralda
('Pereira', (SELECT id FROM departments WHERE department_name = 'Risaralda')),
('Dosquebradas', (SELECT id FROM departments WHERE department_name = 'Risaralda')),

-- San Andrés y Providencia
('San Andrés', (SELECT id FROM departments WHERE department_name = 'San Andrés y Providencia')),

-- Santander
('Bucaramanga', (SELECT id FROM departments WHERE department_name = 'Santander')),
('Floridablanca', (SELECT id FROM departments WHERE department_name = 'Santander')),

-- Sucre
('Sincelejo', (SELECT id FROM departments WHERE department_name = 'Sucre')),
('Corozal', (SELECT id FROM departments WHERE department_name = 'Sucre')),

-- Tolima
('Ibagué', (SELECT id FROM departments WHERE department_name = 'Tolima')),
('Espinal', (SELECT id FROM departments WHERE department_name = 'Tolima')),

-- Valle del Cauca
('Cali', (SELECT id FROM departments WHERE department_name = 'Valle del Cauca')),
('Palmira', (SELECT id FROM departments WHERE department_name = 'Valle del Cauca')),
('Buenaventura', (SELECT id FROM departments WHERE department_name = 'Valle del Cauca')),

-- Vaupés
('Mitú', (SELECT id FROM departments WHERE department_name = 'Vaupés')),

-- Vichada
('Puerto Carreño', (SELECT id FROM departments WHERE department_name = 'Vichada'));


CREATE TABLE IF NOT EXISTS influencer_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL UNIQUE,
    min_followers INT NOT NULL,
    max_followers INT DEFAULT NULL
);

INSERT INTO influencer_classes (class_name, min_followers, max_followers)
VALUES
    ('Nano', 1000, 9999),
    ('Micro', 10000, 99999),
    ('Macro', 100000, 999999),
    ('Mega', 1000000, NULL);

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`idCotizacion`);

--
-- Indices de la tabla `influencers`
--
ALTER TABLE `influencers`
  ADD PRIMARY KEY (`idUser`),
  ADD CONSTRAINT `fk_gender`
  FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

--
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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

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
