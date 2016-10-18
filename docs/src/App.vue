<template>
  <div id="app">
    <h2>Installation</h2>
    <pre>npm install vue-query-builder</pre>

    <div class="row">
      <div class="col-md-8">
        <h2>Basic Demo</h2>
        <p>This basic query can be used to search for a customer of the type "Premium" whose first name is 'John' or 'Sally'.</p>
        <vue-query-builder
          :rules="basicDemoRules"
          :maxDepth="2"
          :initialQuery="basicDemoInitialQuery"
          @queryUpdated="basicDemoQueryUpdated"
          ></vue-query-builder>
      </div>

      <div class="col-md-4">
        <h2>Output</h2>
        <p>The component outputs the following JSON, which you can use in your app's back end to generate some kind of report or output.</p>
        <pre><code id="basic-demo-output" class="language-json"></code></pre>
      </div>
    </div>

    <h2>Usage</h2>
    <pre><code class="language-markup">
      &lt;vue-query-builder
        :rules="rules"
        :maxDepth="2"
        @queryUpdated="queryUpdated"
        &gt;&lt;/vue-query-builder&gt;
    </code></pre>
    <pre><code class="language-javascript">
      import VueQueryBuilder from 'vue-query-builder';

      export default {
        name: 'app',

        components: {
          VueQueryBuilder
        },

        methods: {
          queryUpdated (query) {
            this.query = query;
          }
        },

        data () {
          return {
            query: null,
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
                id: "customer-type",
                label: "Customer Type",
                choices: [
                  {label: "Standard", value: "standard"},
                  {label: "Premium", value: "premium"}
                ]
              }
            ]
          }
        }
      }
    </code class="language-javascript"></pre>
  </div>
</template>

<script>
import Vue from 'vue';
import VueQueryBuilder from 'vue-query-builder';

export default {
  name: 'app',

  components: {
    VueQueryBuilder
  },

  data () {
    return {
      basicDemoInitialQuery: {
        "logicalOperator": "All",
        "children": [
          {
            "type": "query-builder-rule",
            "query": {
              "rule": "customer-type",
              "selectedOperand": "Customer Type",
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
      basicDemoQuery: null,
      basicDemoRules: [
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
          id: "customer-type",
          label: "Customer Type",
          choices: [
            {label: "Standard", value: "standard"},
            {label: "Premium", value: "premium"}
          ]
        }
      ]
    }
  },

  methods: {
    basicDemoQueryUpdated (query) {
      this.basicDemoQuery = query;

      Vue.nextTick(function () {
        var basicDemoOutput = document.getElementById('basic-demo-output');
        basicDemoOutput.innerHTML = JSON.stringify(query, null, 2);
        document.dispatchEvent( new Event('rerender-prism') );
      });
    }
  }
}
</script>

<style>

</style>
