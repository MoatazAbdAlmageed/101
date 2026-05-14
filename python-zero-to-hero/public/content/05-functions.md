# Functions 🧩

Functions are reusable blocks of code.

## Defining a Function
```python
def greet(name):
    return f"Hello, {name}!"

message = greet("World")
print(message)
```

## Default Parameters
```python
def power(base, exponent=2):
    return base ** exponent

print(power(3))    # 9
print(power(3, 3)) # 27
```

## Lambda Functions (Anonymous)
```python
add = lambda x, y: x + y
print(add(5, 3))
```

---
Next: [Data Structures](data-structures)
