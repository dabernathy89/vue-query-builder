import Vue from 'vue'
import VueQueryBuilder from './VueQueryBuilder.vue'

Vue.config.productionTip = false

let rules = [
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
      type: "text",
      id: "date",
      inputType:"date",
      label: "Date"
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
  ];

new Vue({
  el: '#app',

  components: { VueQueryBuilder },

  data: {
    rules: rules,
    output: {},
  },

  methods: {
    updateQuery: function(value){
      this.output = value;
    }
  },

  computed: {
    outputFormatted: function() {
      return JSON.stringify(this.output, null, 2);
    }
  },
});
