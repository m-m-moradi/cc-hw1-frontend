<template>
  <v-card
    class='mx-auto'
    elevation='5'
    v-bind='$attrs'
  >
    <v-card-title>
      <slot name='title'></slot>
      <v-spacer></v-spacer>
      <slot name='icon'>
        <v-icon>mdi-icon</v-icon>
      </slot>
    </v-card-title>
    <v-card-subtitle class='pt-2 pb-1'>
      <slot name='subtitle'></slot>
    </v-card-subtitle>
    <v-card-text>
      <slot name='text'></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CategoryCard'
}
</script>

<style scoped>

</style>
