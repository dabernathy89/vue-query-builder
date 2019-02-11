# Getting Started

## Installation

You can install via npm or yarn:

```sh
npm install vue-query-builder
```

If you are not using a bundler like Webpack, or just want to load the component via a `<script>` tag, you can use the Unpkg CDN. Don't forget to load Vue as well!

```html
<script src="https://unpkg.com/vue-query-builder@0.7.1/dist/VueQueryBuilder.umd.min.js"></script>
```

## Usage

In your JavaScript (when using Webpack or another bundler):

```js
import VueQueryBuilder from 'vue-query-builder';

new Vue({
    el: '#app',
    // See the Configuration page for formatting of the rules prop
    data: { rules: [] },
    components: { VueQueryBuilder }
});
```

In your template:

```html
<vue-query-builder :rules="rules"></vue-query-builder>
```

If you're loading via a script tag, the component will be set as a global variable named `VueQueryBuilder`:

```html
<div id="#app">
    <vue-query-builder :rules="rules"></vue-query-builder>
</div>

<script>
new Vue({
    el: '#app',
    data: { rules: [] },
    components: { VueQueryBuilder: window.VueQueryBuilder }
});
</script>
```

See more details on how to use the component in the [Configuration](configuration.md) section.