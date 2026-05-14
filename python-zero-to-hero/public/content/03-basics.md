# Variables & Data Types 📦

In programming, variables are containers for storing data values.

## Variables

In Python, you don't need to declare the type of a variable. You just assign a value:

```python
name = "Alice"
age = 25
is_student = True
price = 19.99
```

## Data Types

1. **Strings (`str`):** Text wrapped in quotes. `"Hello"`
2. **Integers (`int`):** Whole numbers. `10`, `-5`
3. **Floats (`float`):** Decimal numbers. `10.5`, `3.14`
4. **Booleans (`bool`):** True or False. `True`, `False`

## Type Conversion

You can change one type to another:

```python
age_str = "25"
age_int = int(age_str) # Converts "25" to 25
```

## String Formatting

The modern way to put variables inside strings is using `f-strings`:

```python
name = "Moataz"
print(f"Hello, {name}!")
```

---
Next: [Control Flow](control-flow)
