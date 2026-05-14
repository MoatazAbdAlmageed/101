# Chapter 2: Installation & Environment Setup 🛠️

A successful Odoo project starts with a robust environment. We will cover the two most popular ways to get Odoo running: **Docker** (for speed and consistency) and **Source Install** (for deep development).

## 1. The Developer's Choice: Docker

Docker is the industry standard for Odoo development because it isolates dependencies.

### Quick Start with Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.1'
services:
  web:
    image: odoo:17.0
    depends_on:
      - db
    ports:
      - "8069:8069"
    environment:
      - HOST=db
      - USER=odoo
      - PASSWORD=odoo
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD=odoo
      - POSTGRES_USER=odoo
```

## 2. Source Installation (Linux/Ubuntu)

For developers who want to modify core behavior or debug deeply.

### Prerequisites

```bash
sudo apt update && sudo apt upgrade
sudo apt install python3-pip python3-dev libxml2-dev libxslt1-dev libevent-dev libsasl2-dev libldap2-dev pkg-config libpq-dev libjpeg-dev
```

### Cloning Odoo

```bash
git clone https://www.github.com/odoo/odoo --depth 1 --branch 17.0
```

## 3. The Odoo Configuration File

Every Odoo instance needs an `odoo.conf`. Key parameters include:

- `addons_path`: Where Odoo looks for modules.
- `db_host`, `db_user`, `db_password`: Database credentials.
- `admin_passwd`: The master password for database operations.

## Practical Exercise

1. Install Docker on your machine.
2. Launch the Odoo container using the compose file above.
3. Access Odoo at `http://localhost:8069` and create your first database.

---

Next: [Chapter 3: Core Concepts & Navigation](core-concepts)
