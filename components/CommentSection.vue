<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <div class='my-6'>
          <div class='think mb-4'>What do you think?</div>
          <comment-form
            :loading='loading'
            @submit='data => submitComment(data)'
          >
          </comment-form>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <div class='think mb-4'>What do others think?</div>
      </v-col>
      <v-col cols='12'>
        <div v-if='entity.comments.length > 0'>
          <comment-card
            v-for='comment in entity.comments'
            :id='comment.id'
            :key='comment.id'
            :author='comment.author'
            :text='comment.text'
            :date='comment.created_at'
          ></comment-card>
        </div>
        <div v-else>
          <span class='think'>
          They are having a hard time thinking...
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <div style='height: 50px'></div>
      <v-snackbar
        v-model='snackbar'
        class='button'
      >
        {{ snackbarMessage }}
        <template #action='{ attrs }'>
          <v-btn
            color='pink'
            text
            v-bind='attrs'
            @click='snackbar = false'
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import commentService from '@/services/CommentService'
export default {
  name: 'CommentSection',
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    entity: {
      type: Object,
      required: true
    },
    entityType: {
      type: String,
      required: true,
      validator: (val) => ['picture', 'story'].includes(val)
    }
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: null,
      audiosStatus: []
    }
  },
  methods: {
    postComment(data) {
      this.submitLoading = true
      return commentService.createComment(data, {})
        .then(response => {
          this.submitLoading = false
          this.snackbar = true
          this.snackbarMessage = 'We received your message, working on it.'
        }).catch(reason => {
          this.submitLoading = false
          this.snackbar = true
          this.snackbarMessage = 'Sorry, there is problem. Please try again.'
        })
    },
    async submitComment(data) {
      const { data: contentTypeData } = await commentService.getContentType()
      const comment = {
        author: data.name,
        text: data.comment,
        object_id: this.entity.id,
        content_type: contentTypeData[this.entityType]
      }
      await this.postComment(comment)
    }
  }
}
</script>

<style scoped>
</style>
