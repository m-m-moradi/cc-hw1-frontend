<template>
  <v-container>
    <list-page-header
      title='Pictures'
      :total-items='totalPictures'
      button-text='Upload New Picture'
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
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PictureCard from '@/components/PictureCard'
import ListPageHeader from '@/components/ListPageHeader'

export default {
  /* eslint-disable vue/component-definition-name-casing */
  name: 'PictureList',
  components: {
    PictureCard,
    ListPageHeader
  },
  async fetch({ store }) {
    await store.dispatch('pictureStore/fetchPictures', { config: {} })
  },
  computed: {
    ...mapState({
      pictures: (state) => state.pictureStore.pictures
    }),
    ...mapGetters({
      totalPictures: 'pictureStore/totalPictures'
    })
  }
}
</script>

<style scoped>
</style>

