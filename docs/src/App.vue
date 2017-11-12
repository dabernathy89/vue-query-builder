<template>
  <div id="app">
    <h2>Installation</h2>
    <pre>npm install vue-query-builder</pre>

    <div class="row">
      <div class="col-md-6">
        <h2>Basic Demo</h2>
        <p>This basic query has been set up to search for a customer on a "Premium" plan whose first name is 'John' or 'Sally'.</p>
        <vue-query-builder
          :rules="basicDemoRules"
          :maxDepth="2"
          :initialQuery="basicDemoInitialQuery"
          @queryUpdated="basicDemoQueryUpdated"
          ></vue-query-builder>
      </div>

      <div class="col-md-6">
        <h2>Output</h2>
        <p>The component outputs the following JSON, which you can use in your app's back end to generate some kind of report or output.</p>
        <pre><code id="basic-demo-output" class="language-json"></code></pre>
      </div>
    </div>

    <h2>Basic Demo Source</h2>
    <p>For simplicity, this does not include the option to set the default query. See documentation below.</p>
    <pre><code class="language-markup">&lt;vue-query-builder
  :rules="rules"
  :maxDepth="2"
  @queryUpdated="queryUpdated"
  &gt;&lt;/vue-query-builder&gt;</code></pre>

    <pre><code class="language-javascript">import VueQueryBuilder from 'vue-query-builder';
import RangeInput from 'range-input';

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
          id: "plan-type",
          label: "Plan Type",
          choices: [
            {label: "Standard", value: "standard"},
            {label: "Premium", value: "premium"}
          ]
        },
        {
          type: "select",
          id: 'select',
          label: 'Color',
          operators: ['=', '<>'],
          choices: [
            {label: "red", value: 'Red'},
            {label: "orange", value: 'Orange'},
            {label: "yellow", value: 'Yellow'},
            {label: "green", value: 'Green'},
            {label: "blue", value: 'Blue'},
            {label: "indigo", value: 'Indigo'},
            {label: "violet", value: 'Violet'},
          ]
        },
        {
          type: "custom-component",
          component: RangeInput,
          id: 'range',
          label: 'Range',
          operators: ['='],
          default: 1
        }
      ]
    }
  }
}</code class="language-javascript"></pre>

    <hr>

    <h2>Component Props</h2>
    <p>These are all of the props that can be defined on the component. See details for each prop below.</p>
    <pre><code class="language-markup">&lt;vue-query-builder
  :rules="rules"
  :maxDepth="3"
  :labels="labels"
  :initialQuery="initialQuery"
  :styled="styled"
  @queryUpdated="queryUpdated"
  &gt;&lt;/vue-query-builder&gt;</code></pre>

    <br>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">rules</h3><br>
        <p>Type: Array</p>
        <p>Required: yes</p>
      </div>
      <div class="panel-body">
        <p>The <code>rules</code> prop defines the different type of conditional statements that can be included in the query.</p>
        <p>The <code>rules</code> prop is an array of objects. Each object can contain the following properties:</p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Property</th>
              <th>Possible Values</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>type</td>
              <td>String from this list: <code>"text", "numeric", "custom", "radio", "checkbox", "select", "custom-component"</code></td>
              <td>Required. Determines the basic template for conditionals based on this rule. Each type has some basic defaults that can be overridden. You can include a custom component as long as it interacts properly with <code>v-model</code> (see more details <a href="https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events">in the Vue docs here</a>).</td>
            </tr>
            <tr>
              <td>id</td>
              <td>Any string</td>
              <td>Optional - will be included in the final query object. If not set, defaults to a sensible value. For custom components, this will be the component's HTML tag.</td>
            </tr>
            <tr>
              <td>label</td>
              <td>Any string</td>
              <td>Required. Label to be displayed to the user.</td>
            </tr>
            <tr>
              <td>operators</td>
              <td>Array of strings</td>
              <td>Optional. Override the operators for the rule type. If not defined, sensible defaults are provided.<br><br>
              Ex: <code>operators: ['=','&lt;&gt;','&lt;','&lt;=','&gt;','&gt;=']</code></td>
            </tr>
            <tr>
              <td>choices</td>
              <td>Array of objects, each with a `label` and `value` property.</td>
              <td>Required for checkbox, radio, and select rule types. Defines the individual radio and checkbox inputs, or select options. Select inputs will default to the first item in the `choices` list; if you want an empty option
              you must provide it yourself. <br><br>
              Ex: <code>choices: [{label: "Foo", value: "foo"}, {label: "Bar", value: "bar"}]</code>
              </td>
            </tr>
            <tr>
              <td>operands</td>
              <td>Array of strings or numbers</td>
              <td>Optional. Allows you to set a dropdown as the left side of the conditional. For example, you may have a rule for 'Address' that lets the
              user choose which kind of address the rule is referring to:<br><br>
              Ex: <code>operands: ['Home Address','Work Address']</code></td>
            </tr>
            <tr>
              <td>inputType</td>
              <td>String with an HTML input type</td>
              <td>Optional. Override the HTML input type for a rule type.<br><br>Ex: <code>inputType: "email"</code></td>
            </tr>
            <tr>
              <td>default</td>
              <td>Mixed</td>
              <td>Optional. Provide a default value. Currently only used for custom components.<br><br>Ex: <code>default: 123</code></td>
            </tr>
            <tr>
              <td>component</td>
              <td>An imported component</td>
              <td>Required for type <code>custom-component</code>. See example in 'Basic Demo Source' above.<br><br>Ex: <code>component: RangeInput</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">maxDepth</h3><br>
        <p>Type: Number</p>
        <p>Required: no</p>
      </div>
      <div class="panel-body">
        <p>Defines the maximum depth (nested layers) of the query. Defaults to 3.</p>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">labels</h3><br>
        <p>Type: Array of strings</p>
        <p>Required: no</p>
      </div>
      <div class="panel-body">
        <p>Replace the default labels used in the UI. The default values are:</p>
        <table class="table table-striped">
          <tbody>
            <tr><td><code>matchType</code></td><td><samp>Match Type</samp></td></tr>
            <tr><td><code>matchTypeAll</code></td><td><samp>All</samp></td></tr>
            <tr><td><code>matchTypeAny</code></td><td><samp>Any</samp></td></tr>
            <tr><td><code>addRule</code></td><td><samp>Add Rule</samp></td></tr>
            <tr><td><code>removeRule</code></td><td><samp>&amp;times;</samp></td></tr>
            <tr><td><code>addGroup</code></td><td><samp>Add Group</samp></td></tr>
            <tr><td><code>removeGroup</code></td><td><samp>&amp;times;</samp></td></tr>
            <tr><td><code>textInputPlaceholder</code></td><td><samp>value</samp></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">initialQuery</h3><br>
        <p>Type: Object</p>
        <p>Required: no</p>
      </div>
      <div class="panel-body">
        <p>If you want the component to have some initial state, you can pass it in here. This is the initialQuery value used in the basic demo above:</p>
        <pre><code class="language-json">{
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
}</code></pre>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">styled</h3><br>
        <p>Type: Boolean</p>
        <p>Required: no</p>
      </div>
      <div class="panel-body">
        <p>When true, the component will include Bootstrap CSS classes and some basic styling. Defaults to true.</p>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">updateQuery</h3><br>
        <p>Type: callback (Vue event)</p>
        <p>Required: no</p>
      </div>
      <div class="panel-body">
        <p>Use this event to retrieve the Query Builder data when it is updated.</p>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import VueQueryBuilder from '../../src/VueQueryBuilder.vue';
import RangeInput from '../../dev/RangeInput.vue';

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
          id: "plan-type",
          label: "Plan Type",
          choices: [
            {label: "Standard", value: "standard"},
            {label: "Premium", value: "premium"}
          ]
        },
        {
          type: "custom-component",
          component: RangeInput,
          id: 'range',
          label: 'Range',
          operators: ['='],
          default: 1
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
