<template>
  <div class="vqb-children">
    <component
      :is="getComponent(child.type)"
      v-for="(child, index) in query.children"
      :key="index"
      :type="child.type"
      :query.sync="child.query"
      :rule-types="ruleTypes"
      :rules="rules"
      :rule="$parent.ruleById(child.query.rule)"
      :index="index"
      :max-depth="maxDepth"
      :depth="depth + 1"
      :labels="labels"
      @child-deletion-requested="$parent.removeChild"
    />
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['query', 'ruleTypes', 'rules', 'maxDepth', 'labels', 'depth'],

  data() {
    return {
      groupComponent: null,
      ruleComponent: null
    }
  },

  mounted() {
    this.groupComponent = this.$parent.$options.components['QueryBuilderGroup'];
    this.ruleComponent = this.$parent.$options.components['QueryBuilderRule'];
  },

  methods: {
    getComponent(type) {
      return type === 'query-builder-group'
        ? this.groupComponent
        : this.ruleComponent;
    }
  }
}
</script>