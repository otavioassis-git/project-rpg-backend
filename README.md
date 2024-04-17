# Project RPG Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Description

Backend support for https://github.com/otavioassis-git/project-rpg

## Installation

Run the following command to deploy the MySQL database to Docker, using docker-compose:

```bash
$ docker-compose up -d
```

Then install NestJS dependencies:

```bash
$ npm install
```

Then, using sequelize cli, run migrations:

```bash
$ npx sequelize-cli db:migrate
```

## Running the app

```bash
# development watch mode
$ npm start

# development watch and debug mode

$ npm run start:debug

# development
$ npm run dev

# production mode
$ npm run prod
```
