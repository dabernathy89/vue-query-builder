---
sidebarDepth: 3
---

# Configuration

## Props & Events

These are all of the props and events that can be defined on the Vue Query Builder component. See below for a detailed explanation of each one.

```html
<vue-query-builder
  :rules="rules"
  :maxDepth="3"
  :labels="labels"
  v-model="query"
  ></vue-query-builder>
```

### rules <Badge text="required" type="error" vertical="middle" /> <Badge text="Type: Array" vertical="middle" />

The `rules` prop provides all of the rules that can be selected within the UI and added to a group.

The rules prop is an array of objects. A simple set of rules might look like this:

```js
rules = [
    {
        type: "text",
        id: "vegetable",
        label: "Vegetable",
    },
    {
        type: "radio",
        id: "fruit",
        label: "Fruit",
        choices: [
            {label: "Apple", value: "apple"},
            {label: "Banana", value: "banana"}
        ]
    },
];
```

Each object in the `rules` array can contain the following properties:

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
      <td><Badge text="required" type="error" vertical="middle" /> Determines the basic template for conditionals based on this rule. Each type has some basic defaults that can be overridden. You can include a custom component as long as it interacts properly with <code>v-model</code> (see more details <a href="https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events">in the Vue docs here</a>).</td>
    </tr>
    <tr>
      <td>id</td>
      <td>Any string</td>
      <td>Optional - will be included in the final query object. If not set, defaults to a sensible value. For custom components, this will be the component's HTML tag.</td>
    </tr>
    <tr>
      <td>label</td>
      <td>Any string</td>
      <td><Badge text="required" type="error" vertical="middle" /> Label to be displayed to the user.</td>
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
      <td><Badge text="may be required" type="error" vertical="middle" /> Required for checkbox, radio, and select rule types. Defines the individual radio and checkbox inputs, or select options. Select inputs will default to the first item in the `choices` list; if you want an empty option
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
      <td><Badge text="may be equired" type="error" vertical="middle" /> Required for type <code>custom-component</code>. <br><br>Ex: <code>component: RangeInput</code></td>
    </tr>
  </tbody>
</table>

---

### maxDepth <Badge text="optional" type="warn" vertical="middle" /> <Badge text="Type: Number" vertical="middle" /> <Badge text="Default: 3" vertical="middle" />

Defines the maximum depth (nested layers) of the query.

---

### labels <Badge text="optional" type="warn" vertical="middle" /> <Badge text="Type: Object" vertical="middle" />

Replace the default labels used in the UI. The default values are:

```json
{
  "matchType": "Match Type",
  "matchTypes": [
    {"id": "all", "label": "All"},
    {"id": "any", "label": "Any"}
  ],
  "addRule": "Add Rule",
  "removeRule": "&times;",
  "addGroup": "Add Group",
  "removeGroup": "&times;",
  "textInputPlaceholder": "value",
}
```

---

### v-model <Badge text="optional" type="warn" vertical="middle" /> <Badge text="Type: Object" vertical="middle" />

Provide a value to the `v-model` attribute to give some initial state to the query builder, and to automatically get the updated value of the query as it changes. If you don't want to provide initial state, you can just pass an empty object:

```html
<vue-query-builder
  v-model="query"
  ></vue-query-builder>
```

```js
  // Inside your Vue app / component
  data() {
    return {
      query: {},
    }
  }
```
