<template>
  <v-row>
    <v-col class='my-0 py-0'>
      <div style='margin-top: 80px'>
        <div>
          <v-btn class='button' to='/' nuxt>
            <fa :icon='["fas", "angle-left"]' />
            <span class='pl-3'>Home</span>
          </v-btn>
        </div>
      </div>
      <div style='height: 50px'></div>
      <div class='d-flex'>
        <div>
          <h1 class='page_title'>{{ title }}</h1>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            style='margin-top: 30px'
            elevation='5'
            class='button'
            :to='{name: createButtonLink}'
            nuxt
          >
            {{ buttonText }}
          </v-btn>
        </div>
      </div>
      <div>
        <fa :icon='["fas", "hashtag"]' />
        <span class='total'>{{ totalItems }}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ListPageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    totalItems: {
      type: [String, Number],
      required: true
    },
    createButtonLink: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
