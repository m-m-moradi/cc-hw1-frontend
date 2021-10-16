<template>
  <v-container>
    <list-page-header
      title='Stories'
      :total-items='totalStories'
      button-text='Create New Story'
    ></list-page-header>
    <v-row>
      <v-col v-for='story in stories' :key='story.id' cols='12' class='pb-1'>
        <story-card
          :to="{ name: 'story-id', params: { id: story.id }}" nuxt
          :author='story.author'
          :title='story.title'
          :text='story.text'
          :comment-count='story.comments.length'
          :date='story.created_at'
        ></story-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import StoryCard from '@/components/StoryCard'
import ListPageHeader from '@/components/ListPageHeader'

export default {
  /* eslint-disable vue/component-definition-name-casing */
  name: 'StoryList',
  components: {
    StoryCard,
    ListPageHeader
  },
  async fetch({ store }) {
    // todo: many stories and pictures
    await store.dispatch('storyStore/fetchStories', { config: {} })
  },
  computed: {
    ...mapState({
      stories: (state) => state.storyStore.stories
    }),
    ...mapGetters({
      totalStories: 'storyStore/totalStories'
    })
  }
}
</script>

<style scoped>
</style>
