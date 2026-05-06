# Phase 2: Component Architecture

In this phase, we move beyond a single global application and start building modular, reusable blocks called **Components**.

## 1. What are Components?
Components allow us to split the UI into independent, reusable pieces, and think about each piece in isolation. In Vue, a component is essentially a Vue instance with pre-defined options.

## 2. Props: Passing Data Down
Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance.

```javascript
app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})
```

## 3. Emits: Sending Data Up
Components can communicate back to their parents by emitting custom events.

```javascript
app.component('custom-button', {
  emits: ['enlarge-text'],
  template: `
    <button @click="$emit('enlarge-text')">
      Enlarge text
    </button>
  `
})
```

## 4. Lifecycle Hooks
Each Vue component instance goes through a series of initialization steps when it's created. For example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes.

Common hooks:
- `onMounted()`: Called after the component has been mounted.
- `onUpdated()`: Called after the component has updated its DOM tree.
- `onUnmounted()`: Called after the component has been unmounted.

## 5. Single File Components (SFCs)
While we are using the CDN for these demos, in a real-world project, you would use `.vue` files which contain:
- `<template>`: The HTML structure.
- `<script>`: The logic.
- `<style>`: The component-specific styling.
