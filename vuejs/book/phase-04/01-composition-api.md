# Phase 4: Composition API & Mastery

The **Composition API** is the modern way to write Vue components. It solves the issue of code organization in large components by allowing us to group logical concerns together.

## 1. Why Composition API?
In the **Options API** (data, methods, computed), logic for a single feature is often spread across these different options. In the **Composition API**, we use a `setup()` function to keep logic co-located.

## 2. Core Reactivity API
- `ref()`: Takes an inner value and returns a reactive and mutable ref object.
- `reactive()`: Returns a reactive proxy of the object.
- `computed()`: Takes a getter function and returns a readonly reactive ref.
- `watch()`: Watches one or more reactive data sources and invokes a callback.

## 3. Composables
A "composable" is a function that leverages Vue's Composition API to encapsulate and reuse **stateful logic**.

```javascript
// useMouse.js
function useMouse() {
  const x = ref(0)
  const y = ref(0)
  // ... event listeners
  return { x, y }
}
```

## 4. Performance Optimization
- **`v-memo`**: Caches a sub-tree of the template and only re-renders if dependencies change.
- **Async Components**: Load components only when needed to reduce initial bundle size.
- **`v-once`**: Render the element and component only once.

## 5. Conclusion
Mastering the Composition API allows you to build highly scalable, testable, and clean applications.
