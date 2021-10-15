<template>
  <v-container>
    <v-row>
      <v-col class='my-0 py-0'>
        <div style='margin-top: 150px'>
          <div class='uploader'>{{ picture.uploader }}</div>
          <div class='image-title'>{{ picture.title }}</div>
        </div>
        <div class='d-flex'>
          <v-spacer></v-spacer>
          <div class='pr-5'>
            <fa :icon="['far', 'comment']" />
            <span class='detail'>{{ picture.comments.length }}</span>
          </div>
          <div>
            <fa :icon="['far', 'calendar-alt']" />
            <span class='detail'>{{ getProperDate(picture.created_at) }}</span>
          </div>
        </div>
        <v-img
          :src='picture.image'
          style='border-radius: 3px'
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <div class='my-6'>
          <div class='think mb-4'>What do you think?</div>
          <comment-form></comment-form>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <div class='think mb-4'>What do others think?</div>
      </v-col>
      <v-col v-for='comment in picture.comments' :key='comment.id' cols='12'>
        <comment-card
          :author='comment.author'
          :text='comment.text'
          :date='comment.created_at'
        ></comment-card>
      </v-col>
    </v-row>
    <v-row>
      <div style='height: 50px'></div>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable vue/component-definition-name-casing */
import pictureService from '@/services/pictureService'
import CommentCard from '@/components/CommentCard'
import CommentForm from '@/components/CommentForm'
export default {
  name: '_id',
  components: {
    CommentCard,
    CommentForm
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

.uploader {
  font-family: 'Andada Pro', serif;
  font-weight: 900;
  font-size: 42px;
}

.detail {
  font-family: 'Andada Pro', serif;
  text-transform: unset !important;
  font-weight: 600;
  font-size: 16px;
}

.image-title {
  font-family: 'Andada Pro', serif;
  font-weight: 800;
  font-size: 20px;
}

.think {
  font-family: 'Andada Pro', serif;
  font-weight: 800;
  font-size: 30px;
}

</style>
