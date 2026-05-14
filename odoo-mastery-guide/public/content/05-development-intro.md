# Chapter 5: Introduction to Odoo Development 💻

Now we enter the world of code. Odoo development is a unique mix of **Python** (Logic), **XML** (UI), and **PostgreSQL** (Data).

## 1. Anatomy of a Module

A standard module structure looks like this:
```text
my_module/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   └── my_model.py
├── views/
│   └── my_view.xml
├── security/
│   └── ir.model.access.csv
└── static/
    └── src/ (JS, CSS)
```

## 2. The Manifest File

The `__manifest__.py` is the identity card of your module. It defines dependencies, data files, and metadata.

```python
{
    'name': 'My Custom Module',
    'version': '1.0',
    'depends': ['base', 'sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/my_view.xml',
    ],
}
```

## 3. Creating a Model

In `models/my_model.py`:
```python
from odoo import models, fields

class MyCustomModel(models.Model):
    _name = 'hospital.patient'
    _description = 'Patient Record'

    name = fields.Char(string='Name', required=True)
    age = fields.Integer(string='Age')
    gender = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
    ], string='Gender')
```

## 4. Defining the View

In `views/my_view.xml`:
```xml
<record id="view_patient_form" model="ir.ui.view">
    <field name="name">hospital.patient.form</field>
    <field name="model">hospital.patient</field>
    <field name="arch" type="xml">
        <form>
            <sheet>
                <group>
                    <field name="name"/>
                    <field name="age"/>
                </group>
            </sheet>
        </form>
    </field>
</record>
```

## Practical Exercise

1. Inside your `addons` folder, create a new folder named `hospital_mgmt`.
2. Create the `__init__.py` and `__manifest__.py` files.
3. Try to define the `hospital.patient` model as shown above.
4. Restart your Odoo server and update the App list to find your new module.

---

**Congratulations!** You have completed the first part of Odoo Mastery. You are now ready to build real business applications.
