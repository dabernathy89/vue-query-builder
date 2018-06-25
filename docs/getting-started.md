# Getting Started

## Installation

You can install via npm or yarn:

```sh
npm install vue-query-builder
```

Instructions for CDN / script installation coming soon.

## Usage

In your JavaScript:

```js
import VueQueryBuilder from 'vue-query-builder';

new Vue({
    el: '#app',
    components: { VueQueryBuilder }
});
```

In your template:

```html
<vue-query-builder :rules="rules"></vue-query-builder>
```

See more details on how to use the component in the [Configuration](configuration.md) section.