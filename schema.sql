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
  `idUser` INT AUTO_INCREMENT PRIMARY KEY,
  `birthdayDate` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `gender_id` INT DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `eps` varchar(255) DEFAULT NULL,
  `hair_color_id` INT DEFAULT NULL,
  `hair_type_id` INT DEFAULT NULL,
  `skin_color_id` INT DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `addressLine` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
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
  `celebrity` TINYINT(1) NOT NULL DEFAULT 1,
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
