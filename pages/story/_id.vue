<template>
  <v-container>
    <v-row>
      <v-col class='my-0 py-0'>
        <div style='margin-top: 40px'>
          <div>
            <v-btn class='button' to='/story' nuxt>
              <fa :icon='["fas", "angle-left"]' />
              <span class='pl-3'>Stories</span>
            </v-btn>
          </div>
          <div class='author-name-title' style='margin-top: 50px'>{{ story.author }}</div>
          <div class='story-title'>{{ story.title }}</div>
        </div>
        <div class='d-flex mb-1'>
          <v-spacer></v-spacer>
          <span>
            <template v-if='isEmpty(story.sentiment) || isNothing(story.sentiment)'>
              <v-btn
                icon
                small
                class='pb-1'
                :loading='sentimentLoading'
                @click='getStorySentiment({id:story.id, config:{}})'>
                <template #loader>
                  <fa :icon="['fas', 'circle-notch']" size='lg' spin />
                </template>
                <fa :icon="['far', 'question-circle']" size='lg' />
              </v-btn>
            </template>
            <template v-else>
              <fa style='font-size: 18px;' :icon='emoji(story.sentiment.sentiment.document.score)' />
              <span class='detail-date pr-1'> {{ story.sentiment.sentiment.document.label.toLocaleUpperCase() }} </span>
              <span class='detail-date pr-1'> {{ story.sentiment.language.toUpperCase() }} </span>
            </template>
          </span>
          <div class='pr-3 pl-2'>
            <fa :icon="['far', 'comment']" />
            <span class='detail-comments'>{{ story.comments.length }}</span>
          </div>
          <div>
            <fa :icon="['far', 'calendar-alt']" />
            <span class='detail-date'>{{ getProperDate(story.created_at) }}</span>
          </div>
          <v-btn
            icon
            small
            class='pb-1 ml-2'
            :loading='audioLoading'
            @click='getAudio(story.id)'>
            <template #loader>
              <fa :icon="['fas', 'circle-notch']" size='lg' spin />
            </template>
            <fa :icon="['fas', 'headphones-alt']" size='lg' />
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class='story-text'> {{ story.text }} </p>
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
      </v-col>
    </v-row>
    <comment-section
      :key='story.id'
      :loading='commentCreateLoading'
      :entity='story'
      entity-type='story'
    ></comment-section>
  </v-container>
</template>

<script>
/* eslint-disable vue/component-definition-name-casing */
import { mapState, mapActions } from 'vuex'
import storyService from '@/services/storyService'
import CommentSection from '@/components/CommentSection'
export default {
  name: 'StoryDetail',
  components: {
    CommentSection
  },
  data() {
    return {
      audioLoading: false,
      audioSource: false
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('storyStore/fetchStory', { id: params.id, config: {} })
  },
  computed: {
    ...mapState({
      story: (state) => state.storyStore.currentStory,
      sentimentLoading: (state) => state.storyStore.sentimentPending,
      commentCreateLoading: (state) => state.commentStore.createPending
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
        '--plyr-audio-controls-background': '#121212',
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
      getStorySentiment: 'storyStore/fetchSentiment'
    }),
    isEmpty(obj) {
      return Object.keys(obj).length === 0
    },
    isNothing(thing) {
      return thing === null || typeof thing === 'undefined'
    },
    emoji(score) {
      if (score > 0.1)
        return ['far', 'smile-beam']
      else if (score <= 0.1 && score >= -0.1)
        return ['far', 'meh']
      else
        return ['far', 'angry']
    },
    getAudio(id) {
      if (!this.audioSource) {
        this.audioLoading = true
        return storyService.getAudio(id, {})
          .then(response => {
            this.audioSource = response.data.audio
            this.audioLoading = false
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
</style>
