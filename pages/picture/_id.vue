<template>
  <v-container>
    <v-row>
      <v-col class='my-0 py-0'>
        <div style='margin-top: 40px'>
          <div>
            <v-btn class='button' to='/picture' nuxt>
              <fa :icon='["fas", "angle-left"]' />
              <span class='pl-3'>Pictures</span>
            </v-btn>
          </div>
          <div class='uploader-name-title' style='margin-top: 50px'>{{ picture.uploader }}</div>
          <div class='image-title'>{{ picture.title }}</div>
        </div>
        <div class='d-flex mb-1'>
          <v-spacer></v-spacer>
          <div class='pr-5'>
            <fa :icon="['far', 'comment']" />
            <span class='detail-comments'>{{ picture.comments.length }}</span>
          </div>
          <div>
            <fa :icon="['far', 'calendar-alt']" />
            <span class='detail-date'>{{ $getProperDate(picture.created_at) }}</span>
          </div>
        </div>
        <v-img :src='picture.image' style='border-radius: 3px'></v-img>
      </v-col>
    </v-row>
    <comment-section
      :loading='commentCreateLoading'
      :entity='picture'
      entity-type='picture'
    ></comment-section>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CommentSection from '@/components/CommentSection'
export default {
  name: 'PictureDetail',
  components: {
    CommentSection
  },
  data() {
    return {}
  },
  async fetch({ store, params }) {
    await store.dispatch('pictureStore/fetchPicture', { id: params.id, config: {} })
  },
  computed: {
    ...mapState({
      picture: (state) => state.pictureStore.currentPicture,
      commentCreateLoading: (state) => state.commentStore.createPending
    })
  },
  methods: {}
}
</script>

<style scoped>
</style>
