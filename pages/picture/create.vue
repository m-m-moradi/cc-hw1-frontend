<template>
  <div>
    <div class='center'>
      <v-btn
        :to='{name:"picture"}'
        class='button mb-7'
        nuxt
      >
        <fa :icon='["fas", "angle-left"]' />
        <span class='pl-3'>Pictures</span>
      </v-btn>
      <v-card width='600' elevation='5'>
        <v-card-title class='px-10 pt-10'>
          <span class='image-create-page-title mb-3'>Show the world what you see...</span>
        </v-card-title>
        <v-card-text class='px-10'>
          <v-form ref='imageForm'>
            <div class='d-flex'>
              <div style='width: 55px;' class='pa-0 ma-0'>
                <fa :icon='["fas", "user"]' size='3x' />
              </div>
              <v-text-field
                v-model='user'
                label='Uploader'
                :rules='nameRules'
                required
                outlined
                clearable
                dense
              >
              </v-text-field>
            </div>
            <div class='d-flex'>
              <div style='width: 55px;' class='pa-0 ma-0'>
                <fa :icon='["fas", "quote-right"]' size='3x' />
              </div>
              <v-text-field
                v-model='title'
                label='Title'
                :rules='titleRules'
                required
                outlined
                clearable
                dense
              >
              </v-text-field>
            </div>
            <div class='d-flex'>
              <div style='width: 55px' class='pa-0 ma-0'>
                <fa :icon='["fas", "image"]' size='3x' />
              </div>
              <v-file-input
                v-model='image'
                label='Image'
                show-size
                :rules='imageRules'
                dense
                outlined
                accept='image/*'
                prepend-icon=''
              >
              </v-file-input>
            </div>
            <div class='d-flex'>
              <v-spacer></v-spacer>
              <v-btn class='button' :loading='submitLoading' @click='submitForm()'>
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { nameRules } from '@/validation/nameValidation'
import { titleRules } from '@/validation/titleValidation'
import { imageRules } from '@/validation/imageValidation'
export default {
  name: 'PictureCreate',
  data() {
    return {
      title: null,
      user: null,
      image: null,
      snackbar: false,
      snackbarMessage: null,
      nameRules,
      titleRules,
      imageRules
    }
  },
  computed: {
    ...mapState({
      submitLoading: (state) => state.pictureStore.createPending
    })
  },
  methods: {
    ...mapActions({
      createPicture: 'pictureStore/createPicture'
    }),
    async submitForm() {
      if (this.$refs.imageForm.validate()) {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append('uploader', this.user)
        formData.append('title', this.title)
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        await this.createPicture({ data: formData, config })
          .then((response) => {
            this.$router.push({ name: 'picture' })
          }).catch(reason => {
            this.snackbar = true
            this.snackbarMessage = 'Sorry, there is problem. Please try again.'
          })
      }
    }
  }
}
</script>

<style scoped>
/* todo: why this styles can not be globalized? */
/* todo: why this styles does not need important?*/

::v-deep .v-text-field input {
  font-size: 16px !important;
  font-weight: 700 !important;
}

::v-deep .v-textarea textarea {
  font-size: 16px !important;
  font-weight: 700 !important;
}

::v-deep .v-text-field label {
  font-size: 16px !important;
  font-weight: 700 !important;
}

::v-deep .v-text-field .error--text {
  font-weight: 700 !important;
}
</style>
