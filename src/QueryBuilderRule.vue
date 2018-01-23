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

      <select
        v-if="rule.inputType === 'select' && hasGroups"
        :class="{ 'form-control': styled }"
        v-model="query.value">
        <optgroup v-for="(group, name) in optionGroups" :label="name">
          <option v-for="choice in group" :value="choice.value">{{ choice.label }}</option>
        </optgroup>
      </select>

      <select
        v-if="rule.inputType === 'select' && !hasGroups"
        :class="{ 'form-control': styled }"
        :multiple="rule.type === 'multi-select'"
        v-model="query.value">
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
    },  
  },

  computed: {
    isMultipleChoice () {
      return ['radio', 'checkbox', 'select'].indexOf(this.rule.inputType) >= 0;
    },

    isCustomComponent () {
      return this.rule.type === 'custom-component';
    },

    hasGroups () {
      return this.rule.choices[0].group !== null;
    },

    optionGroups () {
      if(this.hasGroups){
        var groups = this.rule.choices.reduce(function(groups, item) {
        var val = item['group'];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
        }, {});

        return groups;
      }
    }     
  },

  mounted () {
    let updated_query = deepClone(this.query);
    if (this.rule.inputType === 'checkbox') {
      if(this.query.value === null){
        updated_query.value = [];
      }
      this.$emit('update:query', updated_query);
    }
    if (this.rule.type === 'select') {
      if(this.query.value === null){
        updated_query.value = this.rule.choices[0].value;
      }
      this.$emit('update:query', updated_query);
    }
    if (this.rule.type === 'custom-component') {
      if(this.query.value === null){
        updated_query.value = this.rule.default || null;
      }
      this.$emit('update:query', updated_query);
    }
  }
}
</script>
