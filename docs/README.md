---
footer: MIT Licensed | Copyright © 2017-present Daniel Abernathy
---

# Vue Query Builder

Vue Query Builder is a user interface that makes it easy for your users to create queries of any kind. It's useful if you need a tool for generating reports, filtering data, and more.

Each instance of Vue Query Builder consists of groups and rules. Groups can contain rules and other groups. Each group has, by default, a match type of either "match all" (AND) or "match any" (OR). The component outputs JSON which you can pass to your server to parse.

### Basic Demo

<br>

<vue-query-builder :rules="rules" v-model="query"></vue-query-builder>

<script>
export default {
  data() {
    return {
      rules: [
        {
          type: "text",
          id: "first-name",
          label: "First Name",
        },
        {
          type: "text",
          id: "last-name",
          label: "Last Name",
        },
        {
          type: "radio",
          id: "plan-type",
          label: "Plan Type",
          choices: [
            {label: "Standard", value: "standard"},
            {label: "Premium", value: "premium"}
          ]
        },
      ],
      query: {
        "logicalOperator": "all",
        "children": [
          {
            "type": "query-builder-rule",
            "query": {
              "rule": "plan-type",
              "selectedOperand": "Plan Type",
              "value": "premium"
            }
          },
          {
            "type": "query-builder-group",
            "query": {
              "logicalOperator": "any",
              "children": [
                {
                  "type": "query-builder-rule",
                  "query": {
                    "rule": "first-name",
                    "operator": "equals",
                    "operand": "First Name",
                    "value": "John"
                  }
                },
                {
                  "type": "query-builder-rule",
                  "query": {
                    "rule": "first-name",
                    "operator": "equals",
                    "operand": "First Name",
                    "value": "Sally"
                  }
                }
              ]
            }
          }
        ]
      },
    }
  }
}
</script>
<style lang="scss">
.vue-query-builder, .vue-query-builder * {
  box-sizing: border-box;
}

@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

@import "../node_modules/bootstrap/scss/forms";
@import "../node_modules/bootstrap/scss/buttons";

// Components
@import "../node_modules/bootstrap/scss/dropdown";
@import "../node_modules/bootstrap/scss/button-group";
@import "../node_modules/bootstrap/scss/input-group";
@import "../node_modules/bootstrap/scss/card";
@import "../node_modules/bootstrap/scss/close";

// Utility classes
@import "../node_modules/bootstrap/scss/utilities";
</style>