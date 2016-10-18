<template>
  <div class="vue-query-builder" :class="{ 'vue-query-builder-styled': styled }">
    <query-builder-group
      :index="0"
      :query="query"
      :ruleTypes="ruleTypes"
      :rules="mergedRules"
      :maxDepth="maxDepth"
      :depth="depth"
      :styled="styled"
      :labels="mergedLabels"
      type="query-builder-group"
      ></query-builder-group>
  </div>
</template>

<script>
import QueryBuilderGroup from './QueryBuilderGroup.vue';
import deepClone from './utilities.js';

var defaultLabels = {
  matchType: "Match Type",
  matchTypeAll: "All",
  matchTypeAny: "Any",
  addRule: "Add Rule",
  removeRule: "&times;",
  addGroup: "Add Group",
  removeGroup: "&times;",
  textInputPlaceholder: "value",
};

export default {

  components: {
    QueryBuilderGroup
  },

  props: {
    rules: Array,
    labels: {
      type: Object,
      default () {
        return defaultLabels;
      }
    },
    styled: {
      type: Boolean,
      default: true
    },
    maxDepth: {
      type: Number,
      default: 3,
      validator: function (value) {
        return value >= 1
      }
    },
    initialQuery: Object
  },

  data () {
    return {
      depth: 1,
      query: {
        logicalOperator: "All",
        children: []
      },
      ruleTypes: {
        "text": {
          operators: ['equals','contains','does not contain','is empty','is not empty','begins with','ends with'],
          inputType: "text",
          id: "text-field"
        },
        "numeric": {
          operators: ['=','<>','<','<=','>','>='],
          inputType: "number",
          id: "number-field"
        },
        "custom": {
          operators: [],
          inputType: "text",
          id: "custom-field"
        },
        "radio": {
          operators: [],
          choices: [],
          inputType: "radio",
          id: "radio-field"
        },
        "checkbox": {
          operators: [],
          choices: [],
          inputType: "checkbox",
          id: "checkbox-field"
        },
      }
    }
  },

  computed: {
    mergedLabels () {
      return Object.assign({}, defaultLabels, this.labels);
    },

    mergedRules () {
      var mergedRules = [];
      var vm = this;

      vm.rules.forEach(function(rule){
        if ( typeof vm.ruleTypes[rule.type] !== "undefined" ) {
          mergedRules.push( Object.assign({}, vm.ruleTypes[rule.type], rule) );
        } else {
          mergedRules.push( rule );
        }
      });

      return mergedRules;
    }
  },

  mounted () {
    this.$emit('queryUpdated', deepClone(this.query) );

    this.$watch(
      'query',
      function( newQuery ){
        this.$emit('queryUpdated', deepClone(newQuery) );
      }, {
      deep: true
    });

    if ( typeof this.$options.propsData.initialQuery !== "undefined" ) {
      this.query = deepClone(this.$options.propsData.initialQuery);
    }
  }
}
</script>

<style>
  .vue-query-builder-styled .vqb-group .rule-actions {
    margin-bottom: 20px;
  }

  .vue-query-builder-styled .vqb-rule {
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: #f5f5f5;
    border-color: #ddd;
    padding: 15px;
  }

  .vue-query-builder-styled .vqb-rule label {
    margin-right: 10px;
  }

  .vue-query-builder-styled .vqb-group.depth-1 .vqb-rule,
  .vue-query-builder-styled .vqb-group.depth-2 {
    border-left: 2px solid #8bc34a;
  }

  .vue-query-builder-styled .vqb-group.depth-2 .vqb-rule,
  .vue-query-builder-styled .vqb-group.depth-3 {
    border-left: 2px solid #00bcd4;
  }

  .vue-query-builder-styled .vqb-group.depth-3 .vqb-rule,
  .vue-query-builder-styled .vqb-group.depth-4 {
    border-left: 2px solid #ff5722;
  }

  .vue-query-builder-styled .close {
    opacity: 1;
    color: rgb(150,150,150);
  }

  @media (min-width: 768px) {
    .vue-query-builder-styled .vqb-rule.form-inline .form-group {
      display: block;
    }
  }
</style>
