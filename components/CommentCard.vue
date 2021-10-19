<template>
  <v-card
    class='mb-3'
    elevation='5'
    v-bind='$attrs'
  >
    <v-card-title>
      <div class='header' style='width: 70%'>
        <fa :icon="['far', 'user']" size='lg' />
        <span class='author'>{{ author }}</span>
      </div>
      <v-spacer></v-spacer>
      <span>
        <v-btn
          icon
          small
          class='pb-1 mr-2'
          :loading='loading'
          @click='getAudio(id)'>
          <template #loader>
            <fa :icon="['fas', 'circle-notch']" size='lg' spin />
          </template>
          <fa :icon="['fas', 'headphones-alt']" size='lg' />
        </v-btn>
      </span>
      <span class='date'>
        <fa :icon="['far', 'calendar-alt']" />
        {{ getProperDate(date) }}
      </span>
    </v-card-title>
    <v-card-text class='pt-2 pb-3 text'>
      {{ text }}
      <div v-if='audioSource'>
        <v-divider class='my-3'></v-divider>
        <vue-plyr
          ref='plyr'
          dark
          :style='vuetifyDarkMode ? darkPlyrMode: whitePlyrMode'>
          <audio controls crossorigin playsinline>
            <source
              :src='audioSource'
              type='audio/wav'
            />
          </audio>
        </vue-plyr>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import commentService from '@/services/CommentService'
export default {
  name: 'CommentCard',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    author: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      audioSource: false
    }
  },
  computed: {
    vuetifyDarkMode() {
      return this.$vuetify.theme.dark
    },
    darkPlyrMode() {
      return {
        '--plyr-color-main': '#c0392b',
        '--plyr-menu-background': 'white',
        '--plyr-control-spacing': '5px',
        '--plyr-audio-control-color': 'white',
        '--plyr-audio-controls-background': '#1e1e1e',
        '--plyr-control-icon-size': '15px'
      }
    },
    whitePlyrMode() {
      return {
        '--plyr-color-main': '#c0392b',
        '--plyr-menu-background': 'white',
        '--plyr-control-spacing': '5px',
        '--plyr-audio-control-color': 'black',
        '--plyr-audio-controls-background': 'white',
        '--plyr-control-icon-size': '15px'
      }
    }
  },
  methods: {
    getAudio(id) {
      if (!this.audioSource) {
        this.loading = true
        return commentService.getAudio(id, {})
          .then(response => {
            this.audioSource = response.data.audio
            this.loading = false
          }).catch(reason => {
            console.log(reason)
          })
      } else {
        this.audioSource = null
      }
    },
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

<style scoped>

.header {
  font-family: 'Andada Pro', serif;
  font-size: 18px;
  font-weight: 900;
}

.text {
  font-family: 'Andada Pro', serif;
  font-size: 16px;
  font-weight: 500;
}

.date {
  font-family: 'Andada Pro', serif;
  font-size: 15px;
  font-weight: 700;
}

.author {
  background-color: #c0392b;
  padding: 3px 5px;
  border-radius: 3px;
  color: white;
}
</style>
