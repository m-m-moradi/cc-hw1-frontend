<template>
  <v-container>
    <v-row>
      <v-col class='my-0 py-0'>
        <div style='margin-top: 80px'>
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
          <div class='pr-5'>
            <fa :icon="['far', 'comment']" />
            <span class='detail_comments'>{{ story.comments.length }}</span>
          </div>
          <div>
            <fa :icon="['far', 'calendar-alt']" />
            <span class='detail_date'>{{ getProperDate(story.created_at) }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class='story-text'> {{story.text}} </p>
      </v-col>
    </v-row>
    <comment-section
      :loading='submitLoading'
      :entity='story'
      entity-type='story'
    ></comment-section>
  </v-container>
</template>

<script>
/* eslint-disable vue/component-definition-name-casing */
import storyService from '@/services/storyService'
import CommentSection from '@/components/CommentSection'
export default {
  name: 'PictureDetail',
  components: {
    CommentSection
  },
  async asyncData({ error, params }) {
    try {
      const { data } = await storyService.getStory(params.id)
      return {
        story: data
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: e
      })
    }
  },
  data() {
    return {
      submitLoading: false
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

<style scoped>
</style>
