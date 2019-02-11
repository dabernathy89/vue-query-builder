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
        "logicalOperator": "All",
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
              "logicalOperator": "Any",
              "children": [
                {
                  "type": "query-builder-rule",
                  "query": {
                    "rule": "first-name",
                    "selectedOperator": "equals",
                    "selectedOperand": "First Name",
                    "value": "John"
                  }
                },
                {
                  "type": "query-builder-rule",
                  "query": {
                    "rule": "first-name",
                    "selectedOperator": "equals",
                    "selectedOperand": "First Name",
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
<style lang="less">
.vue-query-builder, .vue-query-builder * {
  box-sizing: border-box;
}

@import "../node_modules/bootstrap/less/variables";
@import "../node_modules/bootstrap/less/mixins";

// Reset and dependencies
/*@import "../node_modules/bootstrap/less/normalize";*/
/*@import "../node_modules/bootstrap/less/print";*/
/*@import "../node_modules/bootstrap/less/glyphicons";*/

// Core CSS
/*@import "../node_modules/bootstrap/less/scaffolding";*/
/*@import "../node_modules/bootstrap/less/type";*/
/*@import "../node_modules/bootstrap/less/code";*/
/*@import "../node_modules/bootstrap/less/grid";*/
/*@import "../node_modules/bootstrap/less/tables";*/
@import "../node_modules/bootstrap/less/forms";
@import "../node_modules/bootstrap/less/buttons";

// Components
/*@import "../node_modules/bootstrap/less/component-animations";*/
@import "../node_modules/bootstrap/less/dropdowns";
@import "../node_modules/bootstrap/less/button-groups";
@import "../node_modules/bootstrap/less/input-groups";
/*@import "../node_modules/bootstrap/less/navs";*/
/*@import "../node_modules/bootstrap/less/navbar";*/
/*@import "../node_modules/bootstrap/less/breadcrumbs";*/
/*@import "../node_modules/bootstrap/less/pagination";*/
/*@import "../node_modules/bootstrap/less/pager";*/
@import "../node_modules/bootstrap/less/labels";
/*@import "../node_modules/bootstrap/less/badges";*/
/*@import "../node_modules/bootstrap/less/jumbotron";*/
/*@import "../node_modules/bootstrap/less/thumbnails";*/
/*@import "../node_modules/bootstrap/less/alerts";*/
/*@import "../node_modules/bootstrap/less/progress-bars";*/
/*@import "../node_modules/bootstrap/less/media";*/
/*@import "../node_modules/bootstrap/less/list-group";*/
@import "../node_modules/bootstrap/less/panels";
/*@import "../node_modules/bootstrap/less/responsive-embed";*/
/*@import "../node_modules/bootstrap/less/wells";*/
@import "../node_modules/bootstrap/less/close";

// Components w/ JavaScript
/*@import "../node_modules/bootstrap/less/modals";*/
/*@import "../node_modules/bootstrap/less/tooltip";*/
/*@import "../node_modules/bootstrap/less/popovers";*/
/*@import "../node_modules/bootstrap/less/carousel";*/

// Utility classes
@import "../node_modules/bootstrap/less/utilities";
/*@import "../node_modules/bootstrap/less/responsive-utilities";*/
</style>