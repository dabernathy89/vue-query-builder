<template>
    <div class="range-input">
        <input :value="value" @input="updateValue($event.target.value)" type="range" min="1" max="100" step="1">
        <span class="result-display">Value: {{ value }}</span>
    </div>
</template>

<script>
export default {
    props: {
        value: Number
    },

    methods: {
        updateValue(val) {
            this.$emit('input', parseInt(val));
        }
    }
}
</script>

<style scoped>
    .range-input, input, .result-display {
        width: auto;
        display: inline-block;
        vertical-align: middle;
    }

    input {
        width: 300px;
        max-width: 100%;
        margin: 0 15px;
    }
</style>