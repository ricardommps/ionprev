<template>
  <div>
    <h4 class="grey--text mt-8 mb-2">{{ title }}</h4>
    <v-card class="py-1">
      <div class="px-3 py-2" v-if="this.$slots.actions">
        <slot name="actions"></slot>
      </div>
      <div>
        <slot v-if="this.$slots.default"></slot>
        <small v-else class="d-block pa-3">No data available</small>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>