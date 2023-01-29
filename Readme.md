## About Moffin

Moffin is a free open source Note site providing you a free unlimited account, you can have Notes as much as you want, you can also customize your account with changing wallpaper and your profile picture.

- moffin is hosted on : https://moffin.fitdesign.ir

Moffin is based on Node.js and some packages that are mentioned down below :

- express
- ejs
- express-ejs-layouts
- mysql
- bcrypt
- validator
- cors
- persian-date
- multer
- client-sessions
- dotenv (optional)

## How to use?

1_ Clone project : ``` git clone https://github.com/MRGando/Moffin.git ```    
2_ Start ``` Apache ``` and ``` mySQL ``` in Xampp    
3_ Create your database ( structure has mentioned below )    
4_ Replace ``` /database/connetion.js ``` information    
5_ Open terminal in Moffin folder and run this code : ``` npm i; npm start ```    
6_ Open browser and search : ``` localhost:3000 ```    

## Requirements

you must have Node.js installed on your system

## mySql database structure

your database must have three tables ( events, folders, users ), use this code :

<!-- creating events table -->

```
CREATE TABLE events(
userId INT NOT NULL,
title VARCHAR(255) DEFAULT 'no title',
content VARCHAR(300) DEFAULT 'no content',
date\_ VARCHAR(20),
themeColor VARCHAR(8),
eventId VARCHAR(125),
folderName VARCHAR(60)
) 
```

<!-- creating users table -->
```
CREATE TABLE users(
ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
Name VARCHAR(255) NOT NULL,
Email VARCHAR(255) NOT NULL,
Pass VARCHAR(100) NOT NULL,
Avatar VARCHAR(255) DEFAULT '',
Banner VARCHAR(255) DEFAULT '',
isAdmin BOOLEAN DEFAULT 0
)
```
<!-- creating folders table -->
```
CREATE TABLE folders (
folderID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
folderName VARCHAR(100) NOT NULL,
folderColor VARCHAR(10) NOT NULL,
userID VARCHAR(255) NOT NULL
)
```
## Copyright

it will be greatly appreciated if you mention developers name (Reza Kamali) on your clone version.    

## Project status

Version: ``` 1.0.0 ```    
Progress: ``` working on it ... ```
