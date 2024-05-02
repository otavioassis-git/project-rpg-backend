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

## How to host

The frontend app will be pointed to http://project.rpg.backend:3000 so you can use the backend localy. Note that this is a private connection created by me and won't work with your app.

You have 2 options on how to use it:

If you want to host it on your machine or an URL, you can change the environment in the app by clicking 5 times the version on the bottom of the login/sign up page. Then set any environment that you want.

Or you can set the DNS manually on windows following this steps:

- Step 1 – Open Notepad as an Administrator.

- Step 2 – Browse to and open the Host File c:\windows\system32\drivers\etc\hosts.file

- Step 3 – Add in the required entry in the format of Ip Addresss > TAB > DNS Name.

For example: ```127.0.0.1  project.rpg.backend```

- Step 4 - Save the file

### Suggestion on how to host locally

You can use the Zerotier one app to create a virtual network and then send your IP to your friends. Don't forget to set the port to 3000.
