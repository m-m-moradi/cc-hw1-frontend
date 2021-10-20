<template>
  <v-container>
    <list-page-header
      title='Stories'
      :total-items='totalStories'
      button-text='Create New Story'
      create-button-link='story-create'
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
    <v-row justify='center' class='mb-3'>
      <v-col>
        <v-pagination
          v-model='pageNumber'
          :length='totalPages'
          :total-visible='7'
          class='button'
          color='grey'
          @input='num => fetchStories({config: {params: {page: num}}})'
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import StoryCard from '@/components/story/StoryCard'
import ListPageHeader from '@/components/ListPageHeader'

export default {
  /* eslint-disable vue/component-definition-name-casing */
  name: 'StoryList',
  components: {
    StoryCard,
    ListPageHeader
  },
  data() {
    return {
      pageNumber: 1
    }
  },
  async fetch({ store }) {
    await store.dispatch('storyStore/fetchStories', { config: {} })
  },
  computed: {
    ...mapState({
      stories: (state) => state.storyStore.stories,
      totalStories: (state) => state.storyStore.totalStories
    }),
    totalPages() {
      return Math.ceil(this.totalStories / 15)
    }
  },
  methods: {
    ...mapActions({
      fetchStories: 'storyStore/fetchStories'
    })
  }
}
</script>

<style scoped>
</style>
