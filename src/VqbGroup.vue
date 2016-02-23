<template>
    <div class="vqb-group form-inline">
        <select class="form-control" v-model="logicalOperator">
            <option selected>AND</option>
            <option>OR</option>
        </select>

        <button class="btn btn-add" @click="addRule">Add Rule</button>
        <button class="btn btn-add" @click="addGroup">Add Group</button>
        <button class="btn btn-remove" @click="remove">Remove Group</button>

        <div class="children">
            <component
                v-for="child in children"
                :is="child.type"
                :index="$index"
                :sources="sources"
                :comparison-operators="comparisonOperators">
            </component>
        </div>
    </div>
</template>

<script>
import VqbRule from './VqbRule.vue';

module.exports = {
    name: 'vqb-group',

    props: ['sources','comparisonOperators','index'],

    components: {
        'vqb-rule': VqbRule
    },

    data: function() {
        return {
            logicalOperator: null,
            children: [],
            query: null
        };
    },

    methods: {
        addRule: function() {
            this.children.push({type: 'vqb-rule'});
        },
        addGroup: function() {
            this.children.push({type: 'vqb-group'});
        },
        remove: function() {
            this.$dispatch('child-deletion-requested', this);
        },
        buildQuery: function() {
            var query = {
                'logicalOperator': this.logicalOperator,
                'type': 'group',
                children: []
            };

            this.$children.forEach(function(child){
                query.children.push(child.query);
            });

            this.query = query;

            this.$dispatch('rebuild-query',this);
        }
    },

    events: {
        'child-deletion-requested': function(child) {
            if (child !== this && typeof child.index !== "undefined") {
                this.$children[child.index].$destroy(true);
                this.children.splice(child.index,1);
            }
        },
        'rebuild-query': function(child) {
            if (child !== this) {
                this.buildQuery();
            }
        }
    },

    ready: function() {
        this.buildQuery();
        this.$watch('logicalOperator', function(){
            this.buildQuery();
        });
        this.$watch('children', function(){
            this.buildQuery();
        });
    }
};
</script>
