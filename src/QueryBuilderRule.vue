<template>
  <div class="vqb-rule" :class="{ 'card ': styled }">
    <div :class="{ 'form-inline': styled }">
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
        <label v-for="choice in rule.choices" :class="{ 'float-left': styled }">
          <input type="checkbox" :value="choice.value" v-model="query.value"> {{ choice.label }}
        </label>
      </div>

      <div class="radio" v-if="rule.inputType === 'radio'">
        <label v-for="choice in rule.choices" :class="{ 'float-left': styled }">
          <input type="radio" :value="choice.value" v-model="query.value"> {{ choice.label }}
        </label>
      </div>

      <div v-if="rule.inputType === 'select2'" class="bg-white">
        <v-select multiple @input="updateVSelectValue" v-model="rule.selected"  :options="rule.choices"></v-select>        
      </div>
      <div v-if="rule.inputType === 'date'" class="bg-white">
        <input
            type="text"
            ref="node"
            class="form-control date-picker"
            v-model="query.value" 
            >
      </div>

      <select
        v-if="rule.inputType === 'select'"
        :class="{ 'form-control': styled }"
        :multiple="rule.type === 'multi-select'"
        v-model="query.value">
        <option v-for="choice in rule.choices" :value="choice.value">{{ choice.label }}</option>
      </select>

      <span class="ml-auto"><button :class="{ 'close float-right': styled }" @click="remove" v-html="labels.removeRule"></button></span>
    </div>
  </div>
</template>

<script>
import deepClone from './utilities.js';
import Pikaday from 'pikaday'

export default {
  name: "query-builder-rule",

  props: ['query', 'index', 'rule', 'styled', 'labels'],

  beforeMount () {
    if (this.rule.type === 'custom-component' || this.rule.type =='select2') {
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
    updateVSelectValue: function(val){
         this.$emit('input', val);
         console.log(this.query);
         this.query.value = val.map((item) => {return item.id }).join(",");
         
    }
  },

  computed: {
    isMultipleChoice () {
      return ['radio', 'checkbox', 'select'].indexOf(this.rule.inputType) >= 0;
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
    if (this.rule.type === 'select') {
      updated_query.value = this.rule.choices[0].value;
      this.$emit('update:query', updated_query);
    }
    if (this.rule.type === 'custom-component') {
      updated_query.value = this.rule.default || null;
      this.$emit('update:query', updated_query);
    }

    if (this.rule.type === 'select2') {
      updated_query.value = this.rule.default || null;
      this.$emit('update:query', updated_query);
    }
     if (this.rule.type === 'date') {
      updated_query.value = this.rule.default || null;
      this.$emit('update:query', updated_query);
      this.htmlNode = this.$refs.node
      let vm = this
      this.picker = new Pikaday({
      field: this.htmlNode,
      format: vm.rule.format!=null && vm.rule.format!= 'undefined' ? vm.rule.format: "DD/MM/YYYY",
      showMonthAfterYear: this.showMonthAfterYear,
      onSelect () {
        
        vm.currentDate = this.getMoment().toDate()
        vm.$emit('onSelect', vm.currentDate);
        vm.query.value = vm.picker.toString();
      }
    });
    }
  }
}
</script>

<style src="pikaday/css/pikaday.css"></style>
<style scoped>
input.date-picker.calendar-icon {
  background-image: url(/static/calendar.png);
  background-repeat: no-repeat;
  background-position: right;
}
.date-picker {
  margin-right: 0;
  margin-left: 0;
  border: 1px solid #ccc;
  padding: 9px 0;
  line-height: 1.1;
  color: #444;
  border-radius: 3px;
  text-indent: 13px;
  cursor: pointer;
}
</style>