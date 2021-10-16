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
            <span class='detail_comments'>{{ picture.comments.length }}</span>
          </div>
          <div>
            <fa :icon="['far', 'calendar-alt']" />
            <span class='detail_date'>{{ getProperDate(picture.created_at) }}</span>
          </div>
        </div>
        <v-img :src='picture.image' style='border-radius: 3px'></v-img>
      </v-col>
    </v-row>
    <comment-section
      :loading='submitLoading'
      :entity='picture'
      entity-type='picture'
    ></comment-section>
  </v-container>
</template>

<script>
/* eslint-disable vue/component-definition-name-casing */
import pictureService from '@/services/pictureService'
import CommentSection from '@/components/CommentSection'
export default {
  name: 'PictureDetail',
  components: {
    CommentSection
  },
  async asyncData({ error, params }) {
    try {
      const { data } = await pictureService.getPicture(params.id)
      return {
        picture: data
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
