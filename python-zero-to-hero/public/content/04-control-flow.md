# Control Flow 🚦

How does a program make decisions? Using conditions and loops.

## If Statements
```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C")
```

## Loops
### 1. For Loops (Iterating over a sequence)
```python
for i in range(5):
    print(f"Counting: {i}")
```

### 2. While Loops (Running as long as a condition is true)
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## List Comprehensions (Pro Tip)
A concise way to create lists:
```python
squares = [x**2 for x in range(10)]
```

---
Next: [Functions](functions)
