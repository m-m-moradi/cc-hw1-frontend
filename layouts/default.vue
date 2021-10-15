<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row>
          <v-col></v-col>
          <v-col cols='10' class='my-0 py-0'>
            <v-container class='my-0 py-0'>
              <Nuxt />
            </v-container>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      :absolute='!fixed'
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    getProperDate(date) {
      const tempDate = new Date(date)
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }
      return Intl.DateTimeFormat('en-US', options).format(tempDate)
    }
  }
}
</script>

