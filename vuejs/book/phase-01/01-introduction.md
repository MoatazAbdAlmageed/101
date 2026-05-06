# Phase 1: Introduction to Vue.js Foundations

Welcome to the beginning of your Vue.js journey! In this phase, we focus on the core principles of reactivity and the declarative nature of Vue.

## 1. What is Vue.js?
Vue is a **progressive framework** for building user interfaces. Unlike monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.

### Core Features:
- **Declarative Rendering**: Vue uses a template syntax that allows you to declaratively render data to the DOM.
- **Reactivity**: Vue automatically tracks changes to your JavaScript state and updates the DOM efficiently.

## 2. Getting Started (The CDN Way)
For beginners, the easiest way to start is by including Vue via a script tag. This avoids the complexity of build tools like Vite for now.

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

## 3. The Vue Instance
Every Vue application starts by creating a new **application instance** with the `createApp` function.

```javascript
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}).mount('#app');
```

## 4. Basic Directives
Directives are special attributes with the `v-` prefix.
- `v-bind`: Dynamically bind one or more attributes, or a component prop to an expression.
- `v-if`: Conditionally render an element.
- `v-for`: Render a list of items based on an array.
- `v-on`: Attach an event listener to the element.
- `v-model`: Create two-way data binding on form input.
