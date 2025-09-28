# Usof Backend API

A backend API for a **StackOverflow-like website** that allows users to register, post questions, comment, like, and interact with each other.  
Built with **Node.js**, **Express**, **MySQL**, **MVC architecture**, and includes an **admin panel** powered by **Kottster**.

---

## Features

- **User features**: registration, login/logout, create/update/delete posts and comments, like/dislike based rating.
- **Admin panel**: manages users, posts, categories, comments, likes.
- **Roles**: user & admin, with different access rights.
- **File uploads**: handled with [multer](https://github.com/expressjs/multer).
- **Security**: request validation using [zod](https://github.com/colinhacks/zod), JWT utilized for stateless session persistence.
- **Database**: MySQL, custom Active Record implementation for models.
- **Architecture**: MVC + OOP + SOLID principles.

---

## Requirements

- [Node.js](https://nodejs.org/) v20+
- [MySQL](https://dev.mysql.com/downloads/)
- npm (comes with Node.js)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/usof-backend.git
## The api server
cd usof-backend
npm install
## The admin panel
cd usof
npm install
```
## Database setup
- Use this to initialize the tables:
```bash
sudo mysql < db/db.sql
```
- Use this to generate mock data:
```bash
sudo mysql < db/data.sql
```
## How to run

```bash
## The api server
npm start
## The admin panel
npm run dev
```
The API will be available at:
http://localhost:8080/api

The admin panel will be available at:
http://localhost:5480/

*Beware, to use the admin panel, you'll need to create a Kottster account, if you don't have one*

## Examples of API responses:



## Admin panel behaviour:



## Testing

A postman collection file is provided at *usof-backend/usof.postman_collection.json*
