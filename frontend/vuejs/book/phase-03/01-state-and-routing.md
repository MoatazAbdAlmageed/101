# Phase 3: Scaling with the Vue Ecosystem

As applications grow, managing state across many components and handling navigation becomes complex. This is where **Vue Router** and **Pinia** come in.

## 1. Vue Router: Client-Side Navigation
In a Single Page Application (SPA), we don't actually navigate to different HTML files. Instead, the router intercepts URL changes and swaps components dynamically.

### Basic Setup:
```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
```

## 2. Pinia: Global State Management
If many components need the same piece of data (like user info or a shopping cart), passing props through dozens of layers (Prop Drilling) is inefficient. Pinia provides a central store.

### Concepts:
- **State**: The data source (e.g., `count: 0`).
- **Getters**: Computed properties for the store (e.g., `doubleCount`).
- **Actions**: Methods to change the state (e.g., `increment()`).

## 3. Data Fetching
Most modern apps need to talk to a server. We usually use the `fetch()` API or a library like `Axios` within the `onMounted` lifecycle hook.

```javascript
async onMounted() {
  const response = await fetch('https://api.example.com/data');
  this.items = await response.json();
}
```
