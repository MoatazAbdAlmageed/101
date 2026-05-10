# Phase 6: Persistence & Mastery

Real-world applications need to store data permanently.

## 1. Database Basics (MySQL)
To store data, we use MySQL. You will interact with it using **PDO (PHP Data Objects)**, which is the most secure and flexible method.

## 2. CRUD Operations
- **Create:** Inserting new data.
- **Read:** Retrieving data.
- **Update:** Changing existing data.
- **Delete:** Removing data.

## 3. Prepared Statements
Always use prepared statements to prevent **SQL Injection** attacks.

### Exercise 1: Database Connection
Create a file `database.php`. Set up a PDO connection to a local database (you can create one in `phpMyAdmin` first).

### Exercise 2: Capstone - Simple Guestbook
Build a script that takes a user's message from a form and saves it to a database table, then displays all saved messages on the page.

## 4. Introduction to Frameworks
Once you master native PHP, you can explore frameworks like **Laravel** or **Symfony** to build complex apps faster.

## Objectives Checklist
- [ ] Successfully connected to a MySQL database using PDO.
- [ ] Performed a `SELECT` query to read data.
- [ ] Performed an `INSERT` query using a Prepared Statement.
- [ ] Understand the basic concept of a Model-View-Controller (MVC) framework.
