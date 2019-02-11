<template>
  <div class="vqb-group" :class="classObject">
    <div class="vqb-group-heading" :class="{ 'panel-heading': styled }">
      <div class="match-type-container" :class="{ 'form-inline': styled }">
        <div :class="{ 'form-group': styled }">
          <label for="vqb-match-type">{{ labels.matchType }}</label>
          <select id="vqb-match-type" :class="{ 'form-control': styled }" v-model="query.logicalOperator">
            <option>{{ labels.matchTypeAll }}</option>
            <option>{{ labels.matchTypeAny }}</option>
          </select>
        </div>
        <button type="button" :class="{ 'close pull-right': styled }" v-if="this.depth > 1" @click="remove" v-html="labels.removeGroup"></button>
      </div>
    </div>

    <div class="vqb-group-body" :class="{ 'panel-body': styled }">
      <div class="rule-actions" :class="{ 'form-inline': styled }">
        <div :class="{ 'form-group': styled }">

          <select v-model="selectedRule" :class="{ 'form-control': styled }">
            <option v-for="(rule, index) in rules" :key="index" :value="rule">{{ rule.label }}</option>
          </select>

          <button type="button" @click="addRule" :class="{ 'btn btn-default': styled }" v-html="labels.addRule"></button>
          <button type="button" :class="{ 'btn btn-default': styled }" v-if="this.depth < this.maxDepth" @click="addGroup" v-html="labels.addGroup"></button>
        </div>
      </div>

      <div class="children">
        <component
          v-for="(child, index) in query.children"
          :key="index"
          :is="child.type"
          :type="child.type"
          :query.sync="child.query"
          :ruleTypes="ruleTypes"
          :rules="rules"
          :rule="ruleById(child.query.rule)"
          :index="index"
          :maxDepth="maxDepth"
          :depth="depth + 1"
          :styled="styled"
          :labels="labels"
          v-on:child-deletion-requested="removeChild">
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import QueryBuilderRule from './QueryBuilderRule.vue';
import deepClone from '../utilities.js';

export default {
  name: "query-builder-group",

  components: {
    QueryBuilderRule
  },

  props: ['ruleTypes', 'type', 'query', 'rules', 'index', 'maxDepth', 'depth', 'styled', 'labels'],

  methods: {
    ruleById (ruleId) {
      var rule = null;

      this.rules.forEach(function(value){
        if ( value.id === ruleId ) {
          rule = value;
          return false;
        }
      });

      return rule;
    },

    addRule () {
      let updated_query = deepClone(this.query);
      let child = {
        type: 'query-builder-rule',
        query: {
          rule: this.selectedRule.id,
          selectedOperator: this.selectedRule.operators[0],
          selectedOperand: typeof this.selectedRule.operands === "undefined" ? this.selectedRule.label : this.selectedRule.operands[0],
          value: null
        }
      };
      // A bit hacky, but `v-model` on `select` requires an array.
      if (this.ruleById(child.query.rule).type === 'multi-select') {
        child.query.value = [];
      }
      updated_query.children.push(child);
      this.$emit('update:query', updated_query);
    },

    addGroup () {
      let updated_query = deepClone(this.query);
      if ( this.depth < this.maxDepth ) {
        updated_query.children.push({
          type: 'query-builder-group',
          query: {
            logicalOperator: "All",
            children: []
          }
        });
        this.$emit('update:query', updated_query);
      }
    },

    remove () {
      this.$emit('child-deletion-requested', this.index);
    },

    removeChild (index) {
      let updated_query = deepClone(this.query);
      updated_query.children.splice(index, 1);
      this.$emit('update:query', updated_query);
    }
  },

  data () {
    return {
      selectedRule: this.rules[0]
    }
  },

  computed: {
    classObject () {
      var classObject = {
        'panel panel-default': this.styled,
      }

      classObject['depth-' + this.depth.toString()] = this.styled;

      return classObject;
    }
  }
}
</script>
