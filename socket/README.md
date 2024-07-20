
# EHD

EHD is an online meeting project which I made it for the Ege Universty Hospital in Turkey. It is using React in front-end, node.js and socket.io in backend.

![Ekran görüntüsü 2024-07-18 085123](https://github.com/user-attachments/assets/4e843afe-52c1-4513-8f36-4ce33e60bcbc)

### Installation

#### Clone project
First of all you will be clone this project with this code:

```bash
  git clone https://github.com/HarunBulbull/EHD-Meet.git
```
###
#### Install packages
After clone the project follow codes:

```bash
  cd EHD
  npm install
  cd socket
  npm install
  cd .. 
  cd meetfront
  npm install
```
###
#### SQL:
```bash
CREATE SCHEMA `meeting` ;
CREATE TABLE `meeting`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(60) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE);
CREATE TABLE `meeting`.`notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sendername` VARCHAR(45) NOT NULL,
  `receiverid` INT NOT NULL,
  `roomid` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
CREATE TABLE `meeting`.`news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `header` VARCHAR(45) NOT NULL,
  `content` VARCHAR(3000) NOT NULL,
  `img` VARCHAR(70) NOT NULL,
  `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
INSERT INTO `meeting`.`users` (name, mail, password, isAdmin) values ("Test Account", "test@test.com", "12345678", true);
```
#### Run
You are ready to press the big red button! :)
###### *Run node.js server:*
```bash
  cd EHD
  npm start
```
##### *Run socket.io server:*
```bash
  cd EHD/socket
  npm start
```
##### *Run react server:*
```bash
  cd EHD/meetfront
  npm run dev
```

**Run  all servers for use the all services healthy**
#####

## Todos:
* *Merge backend servers.*
* *Add check mic area to start meet screen.*
* *Add cookies for account infos*

  ![ehd](https://github.com/user-attachments/assets/1ee63236-9f8a-4f5f-abfc-52d12700ece9)
