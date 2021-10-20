<template>
  <v-card
    class='mb-3'
    elevation='5'
    v-bind='$attrs'
  >
    <v-card-title>
      <div class='comment-header' style='width: 30%'>
        <fa :icon="['far', 'user']" size='lg' />
        <span class='comment-author-name-tag'>{{ author }}</span>
      </div>
      <v-spacer></v-spacer>
      <span>
        <template v-if='$isEmpty(sentiment) || $isNothing(sentiment)'>
          <v-btn
            icon
            small
            class='pb-1'
            :loading='sentimentLoading'
            @click='getCommentSentiment({id: id, config: {}})'>
            <template #loader>
              <fa :icon="['fas', 'circle-notch']" size='lg' spin />
            </template>
            <fa :icon="['far', 'question-circle']" size='lg' />
          </v-btn>
        </template>
        <template v-else>
          <fa style='font-size: 18px;' :icon='$emoji(sentiment.sentiment.document.score)' />
          <span class='comment-detail-info pr-1'> {{ $capitalizeFirstLetter(sentiment.sentiment.document.label)
            }} </span>
          <span class='comment-detail-info pr-1'> {{ sentiment.language.toUpperCase() }} </span>
        </template>
      </span>
      <span class='comment-detail-info pl-2'>
        <fa :icon="['far', 'calendar-alt']" />
        {{ $getProperDate(date) }}
      </span>
      <span>
        <v-btn
          icon
          small
          class='pb-1 ml-2'
          :loading='audioLoading'
          @click='getAudio(id)'>
          <template #loader>
            <fa :icon="['fas', 'circle-notch']" size='lg' spin />
          </template>
          <fa :icon="['fas', 'headphones-alt']" size='lg' />
        </v-btn>
      </span>
    </v-card-title>
    <v-card-text class='pt-2 pb-3 comment-text'>
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
import { mapState, mapActions } from 'vuex'
import commentService from '@/services/commentService'
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
    sentiment: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sentimentData: {},
      audioLoading: false,
      audioSource: null
    }
  },
  computed: {
    ...mapState({
      sentimentLoading: (state) => state.commentStore.sentimentPending
    }),
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
    ...mapActions({
      getCommentSentiment: 'commentStore/fetchSentiment'
    }),
    getAudio(id) {
      if (!this.audioSource) {
        this.audioLoading = true
        return commentService.getAudio(id, {})
          .then(response => {
            this.audioSource = response.data.audio
          }).catch(reason => {
            console.log(reason)
          }).finally(() => {
            this.audioLoading = false
          })
      } else {
        this.audioSource = null
      }
    }
  }
}
</script>

<style scoped>
</style>
