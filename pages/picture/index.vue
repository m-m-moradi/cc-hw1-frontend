<template>
  <v-container>
    <list-page-header
      title='Pictures'
      :total-items='totalPictures'
      button-text='Upload New Picture'
      create-button-link='picture-create'
    ></list-page-header>
    <v-row>
      <v-col v-for='picture in pictures' :key='picture.id' cols='4' class='pb-3'>
        <picture-card
          :to="{ name: 'picture-id', params: { id: picture.id }}" nuxt
          :uploader='picture.uploader'
          :title='picture.title'
          :image='picture.image'
          :comment-count='picture.comments.length'
          :date='picture.created_at'
        ></picture-card>
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
          @input='num => fetchPictures({config: {params: {page: num}}})'
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PictureCard from '@/components/picture/PictureCard'
import ListPageHeader from '@/components/ListPageHeader'

export default {
  /* eslint-disable vue/component-definition-name-casing */
  name: 'PictureList',
  components: {
    PictureCard,
    ListPageHeader
  },
  beforeResolve(to, from, next) {
    console.log(`to: ${to}, from: ${from}`)
  },
  data() {
    return {
      pageNumber: 1
    }
  },
  async fetch({ store }) {
    await store.dispatch('pictureStore/fetchPictures', { config: {} })
  },
  computed: {
    ...mapState({
      pictures: (state) => state.pictureStore.pictures,
      totalPictures: (state) => state.pictureStore.totalPictures
    }),
    totalPages() {
      return Math.ceil(this.totalPictures / 15)
    }
  },
  methods: {
    ...mapActions({
      fetchPictures: 'pictureStore/fetchPictures'
    })
  }
}
</script>

<style scoped>
</style>

