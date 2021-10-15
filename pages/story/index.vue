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
                  <v-btn style='margin-top:80% ' elevation='5' class='button'>
                    Create New Story
                  </v-btn>
                </div>
              </div>
              <div>
                <fa :icon='["fas", "hashtag"]' />
                <span class='total'>story: {{ totalStories }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <story-card v-for='story in stories' :key='story.id'
                          :author='story.author'
                          :title='story.title'
                          :comment-count='story.comments.length'
                          :text='story.text'
                          :date='story.created_at'>
              </story-card>
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
import StoryCard from '~/components/StoryCard'
export default {
  /* eslint-disable vue/component-definition-name-casing */
  name: 'index',
  components: {
    StoryCard
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
