<template>
  <v-container>
    <v-row>
      <v-col></v-col>
      <v-col cols='10'>
        <v-container>
          <v-row>
            <v-col>
              <div class='d-flex' style='height: 150px'>
                <div>
                  <h1 class='page_title' style='margin-top: 70%'>Stories</h1>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <v-btn style='margin-top:70% ' elevation='5' class='button'>
                    Upload New Picture
                  </v-btn>
                </div>
              </div>
              <div>
                <fa :icon='["fas", "hashtag"]' />
                <span class='total'>picture: {{ totalPictures }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for='picture in pictures' :key='picture.id' cols='4' >
              <picture-card
                :uploader='picture.uploader'
                :title='picture.title'
                :comment-count='picture.comments.length'
                :date='picture.created_at'>
              </picture-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapGetters, mapState } from 'vuex'
import PictureCard from '@/components/PictureCard'
export default {
  /* eslint-disable vue/component-definition-name-casing */
  name: 'index',
  components: {
    PictureCard
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
.page_title {
  font-family: 'Andada Pro', serif;
  font-weight: 900;
  font-size: 42px;
}

.button {
  font-family: 'Andada Pro', serif;
  text-transform: unset !important;
  font-weight: 600;
  font-size: 16px;
}

.total {
  font-family: 'Andada Pro', serif;
  font-weight: 800;
  font-size: 20px;
}
</style>

