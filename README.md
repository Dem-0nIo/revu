## Influencer managment system revu

## Setup server production docker

# Step 1 -> Install Docker Desktop, https://www.docker.com/

- Download for your system preference:
  - Download for Mac - Intel Chip
  - Download for Mac - Apple Silicon
  - Download for Windows - AMD64
  - Download for Windows - ARM64
  - Download for Linux

# Step 2

```
# (Windows) -> Double click script.bat
# (Mac/Linux) -> 1) chmod +x script.sh 2) ./script.sh
```

###### THIS SECTION ONLY FOR SOFTWARE DEVELOPMENT

## Only local development xammp or wamp http serer whit mysql

## REVU_DEV_01

- .env file contain configuration local/server front-react

## step 1 -> First back-node and database

## Inside back-node

- .env file contain configuration local/server back-node
- README.md back API local start
  `npm install`
  `npm start`

## Import data to start software, use you prefer db manager on mac use DBeaver or xamp or wampp in windows or linux

```
(1, 'user', '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(2, 'moderator', '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(3, 'admin', '2024-10-08 17:03:32', '2024-10-08 17:03:32');


INSERT INTO users (`id`, `username`, `email`, `password`, `firstname`, `lastname`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@admin.com', '$2a$08$HiHPGHnPmOsbVcNRfMUQmeBGdGKZXM1MfebLF6sOlKoxUGP0KNoQe', 'Prueba', 'Admin', '123456789', '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(2, 'user', 'user@user.com', '$2a$08$KxxuGDdQVQYPMz2o4zP3ROIG0QZCKDG.sY2r0DtHHsdLsWo.mb2dy', 'User', 'Prueba', '123456789', '2024-10-08 17:03:32', '2024-10-08 17:03:32');


INSERT INTO user_roles (`roleId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 2, '2024-10-08 17:03:32', '2024-10-08 17:03:32'),
(3, 1, '2024-10-08 17:03:32', '2024-10-08 17:03:32');

```

### Inside front-react

- .env file port configuration an colors
- RADME.md front react local start

`npm install`
`npm start`
