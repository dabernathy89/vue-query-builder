<template>
  <div id="app">
    <h1 class="title">Vue Query Builder Demo</h1>
    <a class="github-link" href="https://github.com/dabernathy89/vue-query-builder">Source on GitHub</a>

    <vue-query-builder></vue-query-builder>
  </div>
</template>

<script>
  import VueQueryBuilder from '../src/index.vue';
  export default {
    components: {
      VueQueryBuilder,
    },
  };
</script>