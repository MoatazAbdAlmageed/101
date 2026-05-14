# Chapter 3: Core Concepts & Navigation 🧭

Before diving into development, you must understand how Odoo thinks. Odoo is an **Object-Relational Mapping (ORM)** based system, which means everything revolves around "Models."

## 1. Everything is a Model

In Odoo, a "Model" represents a table in the database. For example:

- `res.partner`: Stores Customers and Vendors.
- `sale.order`: Stores Sales Orders.
- `product.template`: Stores Product information.

## 2. The User Interface (Views)

Odoo provides several standard views to interact with data:

- **Kanban View:** Visual cards (great for CRM or Projects).
- **List (Tree) View:** Spreadsheet-like row/column data.
- **Form View:** Detailed view of a single record.
- **Pivot/Graph Views:** For reporting and analysis.

## 3. The Developer Mode (Magic Wand)

To see what's happening under the hood, you need to enable **Developer Mode**.

1. Go to **Settings**.
2. Scroll to the bottom and click **"Activate the developer mode"**.
3. Now, you can hover over any field to see its technical name and model.

## 4. Understanding Addons

Odoo's functionality is split into "Addons" (Modules).

- **Base Modules:** Provided by Odoo (Sales, CRM, Accounting).
- **Custom Modules:** Created by you or downloaded from the App Store.
- **Inheritance:** The most powerful feature of Odoo. You don't change core code; you "inherit" and modify it.

## Practical Exercise

1. Log in to your Odoo instance.
2. Enable Developer Mode.
3. Go to the **Contacts** app, hover over the "Internal Notes" field, and identify the field name and model.
4. Try switching between List and Kanban views in the **Apps** menu.

---

Next: [Chapter 4: Implementation Strategy](implementation)
