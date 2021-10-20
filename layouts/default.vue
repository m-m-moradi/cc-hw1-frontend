<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row>
          <v-col></v-col>
          <v-col cols='10' class='my-0 py-0'>
            <v-container class='my-0 py-0'>
              <v-row justify='end'>
                <div class='d-flex pt-5 pr-5'>
                  <div style='float: left; padding-top: 20px; padding-right: 10px'>
                    <fa v-if='$vuetify.theme.dark' :icon='["far", "moon"]' size='lg'/>
                    <fa v-else :icon='["far", "sun"]' size='lg'/>
                  </div>
                  <div style='float: left'>
                    <v-switch color='grey' @change=toggleTheme()>
                      Toggle Theme
                    </v-switch>
                  </div>
                </div>
              </v-row>
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
  mounted() {
    const theme = localStorage.getItem('useDarkTheme')
    if (theme) {
      // eslint-disable-next-line eqeqeq
      if (theme == 'true') {
        this.$vuetify.theme.dark = true
      } else this.$vuetify.theme.dark = false
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('useDarkTheme', this.$vuetify.theme.dark.toString())
    }
  }
}
</script>

