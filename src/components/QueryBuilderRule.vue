<template>
  <div class="vqb-rule" :class="{ 'panel panel-default form-inline': styled }">
    <div :class="{ 'form-group': styled }">
      <slot name="ruleLabel" v-bind:rule="rule">
        <label>{{ rule.label }}</label>
      </slot>

      <slot v-if="typeof rule.operands !== 'undefined'" name="operand" v-bind:rule="rule" v-bind:query="query">
        <select v-model="query.selectedOperand" :class="{ 'form-control': styled }">
          <option v-for="operand in rule.operands" v-bind:value="operand">{{ operand }}</option>
        </select>
      </slot>

      <slot v-if="rule.operators.length" name="operator" v-bind:rule="rule" v-bind:query="query">
        <select v-model="query.selectedOperator" :class="{ 'form-control': styled }">
          <option v-for="operator in rule.operators" v-bind:value="operator">
            {{ operator }}
          </option>
        </select>
      </slot>

      <slot v-if="rule.inputType === 'text'" name="text" v-bind:rule="rule" v-bind:query="query">
        <input :class="{ 'form-control': styled }" type="text" v-model="query.value" :placeholder="labels.textInputPlaceholder">
      </slot>

      <slot v-if="rule.inputType === 'number'" name="text" v-bind:rule="rule" v-bind:query="query">
        <input :class="{ 'form-control': styled }" type="number" v-model="query.value">
      </slot>

      <template v-if="isCustomComponent">
        <component :value="query.value" @input="updateQuery" :is="rule.component"></component>
      </template>

      <slot v-if="rule.inputType === 'checkbox'" name="radio" v-bind:rule="rule" v-bind:query="query">
        <div class="checkbox">
          <label v-for="choice in rule.choices">
            <input type="checkbox" :value="choice.value" v-model="query.value"> {{ choice.label }}
          </label>
        </div>
      </slot>

      <slot v-if="rule.inputType === 'radio'" name="radio" v-bind:rule="rule" v-bind:query="query">
        <div class="radio">
          <label v-for="choice in rule.choices">
            <input type="radio" :value="choice.value" v-model="query.value"> {{ choice.label }}
          </label>
        </div>
      </slot>

      <slot v-if="rule.inputType === 'select'" name="select" v-bind:rule="rule" v-bind:query="query" v-bind:selectOptions="selectOptions">
        <select
          :class="{ 'form-control': styled }"
          :multiple="rule.type === 'multi-select'"
          v-model="query.value">

          <template v-for="(option, option_key) in selectOptions">
            <option v-if="!Array.isArray(option)" :value="option.value">
              {{ option.label }}
            </option>
            <optgroup v-if="Array.isArray(option)" :label="option_key">
              <option v-for="sub_option in option" :value="sub_option.value">{{ sub_option.label }}</option>
            </optgroup>
          </template>
        </select>
      </slot>

      <slot name="removeButton" v-bind:remove="remove">
        <button type="button" :class="{ 'close pull-right': styled }" @click="remove" v-html="labels.removeRule"></button>
      </slot>
    </div>
  </div>
</template>

<script>
import deepClone from '../utilities.js';

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

    selectOptions () {
      if (typeof this.rule.choices === 'undefined') {
        return {};
      }

      return this.rule.choices.reduce(function(groups, item, index) {
        let key = item['group'];
        if (typeof key !== 'undefined') {
          groups[key] = groups[key] || [];
          groups[key].push(item);
        } else {
          groups[index] = item;
        }

        return groups;
      }, {});
    },
  },

  mounted () {
    let updated_query = deepClone(this.query);

    // Set a default value for these types if one isn't provided already
    if(this.query.value === null){
      if (this.rule.inputType === 'checkbox') {
          updated_query.value = [];
      }
      if (this.rule.type === 'select') {
          updated_query.value = this.rule.choices[0].value;
      }
      if (this.rule.type === 'custom-component') {
          updated_query.value = this.rule.default || null;
      }

      this.$emit('update:query', updated_query);
    }
  }
}
</script>
