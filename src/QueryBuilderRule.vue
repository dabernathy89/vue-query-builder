<template>
  <div class="vqb-rule" :class="{ 'panel panel-default form-inline': styled }">
    <div :class="{ 'form-group': styled }">
      <label>{{ rule.label }}</label>

      <select v-if="typeof rule.operands !== 'undefined'" v-model="query.selectedOperand" :class="{ 'form-control': styled }">
        <option v-for="operand in rule.operands">{{ operand }}</option>
      </select>

      <select v-if="! isMultipleChoice" v-model="query.selectedOperator" :class="{ 'form-control': styled }">
        <option v-for="operator in rule.operators" v-bind:value="operator">
          {{ operator }}
        </option>
      </select>

      <input :class="{ 'form-control': styled }" v-if="rule.inputType === 'text'" type="text" v-model="query.value" :placeholder="labels.textInputPlaceholder"></input>
      <input :class="{ 'form-control': styled }" v-if="rule.inputType === 'number'" type="number" v-model="query.value"></input>

      <template v-if="isCustomComponent">
        <component :value="query.value" @input="updateQuery" :is="rule.component"></component>
      </template>

      <div class="checkbox" v-if="rule.inputType === 'checkbox'">
        <label v-for="choice in rule.choices">
          <input type="checkbox" :value="choice.value" v-model="query.value"> {{ choice.label }}
        </label>
      </div>

      <div class="radio" v-if="rule.inputType === 'radio'">
        <label v-for="choice in rule.choices">
          <input type="radio" :value="choice.value" v-model="query.value"> {{ choice.label }}
        </label>
      </div>

      <select :class="{ 'form-control': styled }" v-if="rule.inputType === 'select'" v-model="query.value">
        <option selected=""></option>
        <option v-for="choice in rule.choices" :value="choice.value">{{ choice.label }}</option>
      </select>

      <button :class="{ 'close pull-right': styled }" @click="remove" v-html="labels.removeRule"></button>
    </div>
  </div>
</template>

<script>
import deepClone from './utilities.js';

export default {
  name: "query-builder-rule",

  props: ['query', 'index', 'rule', 'styled', 'labels'],

  beforeMount () {
    if (this.rule.type === 'custom-component') {
      this.$options.components[this.id] = this.rule.component;
    }
  },

  methods: {
    remove: function() {
      this.$emit('child-deletion-requested', this.index);
    },
    updateQuery(value) {
      let updated_query = deepClone(this.query);
      updated_query.value = value;
      this.$emit('update:query', updated_query);
    }
  },

  computed: {
    isMultipleChoice () {
      return this.rule.inputType === 'radio' || this.rule.inputType === 'checkbox';
    },

    isCustomComponent () {
      return this.rule.type === 'custom-component';
    }
  },

  mounted () {
    let updated_query = deepClone(this.query);
    if (this.rule.inputType === 'checkbox') {
      updated_query.value = [];
      this.$emit('update:query', updated_query);
    }
    if (this.rule.type === 'custom-component') {
      updated_query.value = this.rule.default || null;
      this.$emit('update:query', updated_query);
    }
  }
}
</script>
