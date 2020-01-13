# Custom Templates

By default, Vue Query Builder ships with an opinionated layout, using Bootstrap 4 classes for styling. However, you can provide your own template to rearrange parts of the component, to integrate with a different CSS framework, or even to provide additional logic to the query builder.

## Setting up your Vue Instance

To provide your own template to the query builder, you need to:

* Create your own components that extend the base components `QueryBuilderGroup` and `QueryBuilderRule`
* Pass your version of the `QueryBuilderGroup` component as the default slot content to the main query builder component

In your template, you **must**:

* Set the `query-builder-group` component as the default slot content
* Bind the slot props to the `query-builder-group` component
* Use `query.sync` for the initial group to access and update the query

Your main Vue instance might look like this:

```js
import VueQueryBuilder from 'vue-query-builder';
import MyCustomQueryBuilderGroup from './my-custom-query-builder-group.vue';

new Vue({
    el: '#app',
    components: { VueQueryBuilder, MyCustomQueryBuilderGroup }
});
```

```html
<vue-query-builder :rules="rules" v-model="query">
    <template v-slot:default="slotProps">
        <query-builder-group v-bind="slotProps" :query.sync="query"/>
    </template>
</vue-query-builder>
```

## Extending the base components

Using Vue's `extend` feature, you can import the logic for the `QueryBuilderGroup` and `QueryBuilderRule` base components, while overriding the template.

These base components are exported separately from the main query builder component. Using a bundler such as webpack, you should be able to import and then extend the components like so:


```html
<!-- MyCustomQueryBuilderGroup.vue -->
<template>
<!-- template here -->
</template>

<script>
import QueryBuilderGroup from "vue-query-builder/dist/group/QueryBuilderGroup.umd.js";
import QueryBuilderRule from "./MyCustomQueryBuilderRule.vue";

export default {
  name: "QueryBuilderGroup",

  components: {
    QueryBuilderRule: QueryBuilderRule
  },

  extends: QueryBuilderGroup
};
</script>
```

```html
<!-- MyCustomQueryBuilderRule.vue -->
<template>
  <!-- template here -->
</template>

<script>
import QueryBuilderRule from "vue-query-builder/dist/rule/QueryBuilderRule.umd.js";

export default {
  extends: QueryBuilderRule
};
</script>
```

## Tailwind example

Here is an example which uses Tailwind CSS instead of Bootstrap to style the query builder:

<iframe
     src="https://codesandbox.io/embed/vue-query-builder-demo-tailwind-82tun?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue Query Builder Demo - Tailwind"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

<style>
.content:not(.custom) {
  max-width: none;
}
</style>

## Complete template example

More documentation on custom templates is coming soon. However, the query builder actually uses the custom template functionality under the hood, so you can see a complete example - including sample HTML for all possible rule types - in the following files in the repo:

- [src/layouts/Bootstrap/BootstrapGroup.vue](https://github.com/dabernathy89/vue-query-builder/blob/master/src/layouts/Bootstrap/BootstrapGroup.vue)
- [src/layouts/Bootstrap/BootstrapRule.vue](https://github.com/dabernathy89/vue-query-builder/blob/master/src/layouts/Bootstrap/BootstrapRule.vue)