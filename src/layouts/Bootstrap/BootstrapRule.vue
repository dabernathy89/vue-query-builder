<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="vqb-rule panel panel-default form-inline">
    <div class="form-group">
      <label>{{ rule.label }}</label>

      <!-- List of operands (optional) -->
      <select
        v-if="typeof rule.operands !== 'undefined'"
        v-model="query.operand"
        class="form-control"
      >
        <option
          v-for="operand in rule.operands"
          :key="operand"
        >
          {{ operand }}
        </option>
      </select>

      <!-- List of operators (e.g. =, !=, >, <) -->
      <select
        v-if="typeof rule.operators !== 'undefined' && rule.operators.length > 1"
        v-model="query.operator"
        class="form-control"
      >
        <option
          v-for="operator in rule.operators"
          :key="operator"
          :value="operator"
        >
          {{ operator }}
        </option>
      </select>

      <!-- Basic text input -->
      <input
        v-if="rule.inputType === 'text'"
        v-model="query.value"
        class="form-control"
        type="text"
        :placeholder="labels.textInputPlaceholder"
      >

      <!-- Basic number input -->
      <input
        v-if="rule.inputType === 'number'"
        v-model="query.value"
        class="form-control"
        type="number"
      >

      <!-- Datepicker -->
      <input
        v-if="rule.inputType === 'date'"
        v-model="query.value"
        class="form-control"
        type="date"
      >

      <!-- Custom component input -->
      <template v-if="isCustomComponent">
        <component
          :is="rule.component"
          :value="query.value"
          @input="updateQuery"
        />
      </template>

      <!-- Checkbox input -->
      <div
        v-if="rule.inputType === 'checkbox'"
        class="checkbox"
      >
        <label
          v-for="choice in rule.choices"
          :key="choice.value"
        >
          <input
            v-model="query.value"
            type="checkbox"
            :value="choice.value"
          >
          {{ choice.label }}
        </label>
      </div>

      <!-- Radio input -->
      <div
        v-if="rule.inputType === 'radio'"
        class="radio"
      >
        <label
          v-for="choice in rule.choices"
          :key="choice.value"
        >
          <input
            v-model="query.value"
            :value="choice.value"
            type="radio"
          >
          {{ choice.label }}
        </label>
      </div>

      <!-- Select without groups -->
      <select
        v-if="rule.inputType === 'select' && !hasOptionGroups"
        v-model="query.value"
        class="form-control"
        :multiple="rule.type === 'multi-select'"
      >
        <option
          v-for="option in selectOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Select with groups -->
      <select
        v-if="rule.inputType === 'select' && hasOptionGroups"
        v-model="query.value"
        class="form-control"
        :multiple="rule.type === 'multi-select'"
      >
        <optgroup
          v-for="(option, option_key) in selectOptions"
          :key="option_key"
          :label="option_key"
        >
          <option
            v-for="sub_option in option"
            :key="sub_option.value"
            :value="sub_option.value"
          >
            {{ sub_option.label }}
          </option>
        </optgroup>
      </select>

      <!-- Remove rule button -->
      <button
        type="button"
        class="close pull-right"
        @click="remove"
        v-html="labels.removeRule"
      >
      </button>
    </div>
  </div>
</template>

<script>
import QueryBuilderRule from '../../components/QueryBuilderRule';

export default {
  extends: QueryBuilderRule
}
</script>
