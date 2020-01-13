<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="vqb-group card"
    :class="'depth-' + depth.toString()"
  >
    <div class="vqb-group-heading card-header">
      <div class="match-type-container form-inline">
        <label
          class="mr-2"
          for="vqb-match-type"
        >
          {{ labels.matchType }}
        </label>

        <select
          id="vqb-match-type"
          v-model="query.logicalOperator"
          class="form-control"
        >
          <option
            v-for="label in labels.matchTypes"
            :key="label.id"
            :value="label.id"
          >
            {{ label.label }}
          </option>
        </select>

        <button
          v-if="depth > 1"
          type="button"
          class="close ml-auto"
          @click="remove"
          v-html="labels.removeGroup"
        >
        </button>
      </div>
    </div>

    <div class="vqb-group-body card-body">
      <div class="rule-actions form-inline">
        <div class="form-group">
          <select
            v-model="selectedRule"
            class="form-control mr-2"
          >
            <option
              v-for="rule in rules"
              :key="rule.id"
              :value="rule"
            >
              {{ rule.label }}
            </option>
          </select>

          <button
            type="button"
            class="btn btn-secondary mr-2"
            @click="addRule"
          >
            {{ labels.addRule }}
          </button>

          <button
            v-if="depth < maxDepth"
            type="button"
            class="btn btn-secondary"
            @click="addGroup"
          >
            {{ labels.addGroup }}
          </button>
        </div>
      </div>

      <query-builder-children v-bind="$props" />
    </div>
  </div>
</template>

<script>
import QueryBuilderGroup from '../../components/QueryBuilderGroup';
import QueryBuilderRule from './BootstrapRule.vue';

export default {
  name: "QueryBuilderGroup",

  components: {
    // eslint-disable-next-line vue/no-unused-components
    'QueryBuilderRule': QueryBuilderRule
  },

  extends: QueryBuilderGroup,
}
</script>

<style>
  .vue-query-builder .vqb-group .rule-actions {
    margin-bottom: 20px;
  }

  .vue-query-builder .vqb-rule {
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: #f5f5f5;
    border-color: #ddd;
    padding: 15px;
  }

  .vue-query-builder .vqb-group.depth-1 .vqb-rule,
  .vue-query-builder .vqb-group.depth-2 {
    border-left: 2px solid #8bc34a;
  }

  .vue-query-builder .vqb-group.depth-2 .vqb-rule,
  .vue-query-builder .vqb-group.depth-3 {
    border-left: 2px solid #00bcd4;
  }

  .vue-query-builder .vqb-group.depth-3 .vqb-rule,
  .vue-query-builder .vqb-group.depth-4 {
    border-left: 2px solid #ff5722;
  }

  .vue-query-builder .close {
    opacity: 1;
    color: rgb(150,150,150);
  }

  @media (min-width: 768px) {
    .vue-query-builder .vqb-rule.form-inline .form-group {
      display: block;
    }
  }
</style>