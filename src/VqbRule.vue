<template>
    <div class="vqb-rule">
        <div class="form-group">
            <select class="form-control" v-model="selectedColumn">
                <option v-for="source in sources">{{ source }}</option>
            </select>
            <select class="form-control" v-model="selectedComparisonOperator">
                <option v-for="comparisonOperator in comparisonOperators">{{ comparisonOperator }}</option>
            </select>
            <input class="form-control" type="text" v-model="value" placeholder="value"></input>
            <button class="btn btn-remove" @click="remove">Remove Rule</button>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['sources','comparisonOperators','index'],

    data: function() {
        return {
            selectedComparisonOperator: this.comparisonOperators[0],
            selectedColumn: this.sources[0],
            value: null
        };
    },

    computed: {
        query: function() {
            return {
                type: 'rule',
                selectedComparisonOperator: this.selectedComparisonOperator,
                selectedColumn: this.selectedColumn,
                value: this.value
            };
        }
    },

    methods: {
        remove: function() {
            this.$dispatch('child-deletion-requested', this);
        }
    },

    ready: function() {
        this.$watch('query', function() {
            this.$dispatch('rebuild-query',this);
        });
    }
};
</script>
