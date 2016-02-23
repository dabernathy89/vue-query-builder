import Vue from 'vue';
import VqbGroup from './VqbGroup.vue';

new Vue({
    el: '#query-builder',

    components: {
        'vqb-group': VqbGroup
    },

    data: {
        sources: ['foo','bar','baz'],
        comparisonOperators: ['=','<>','<','<=','>','>=','contains','does not contain','is empty','is not empty'],
        query: null
    },

    events: {
        'rebuild-query': function(child) {
            this.query = child.query;
        }
    }
})
