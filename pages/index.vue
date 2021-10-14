<template>
  <v-row justify='center' align='center'>
    <v-col cols='12' sm='8' md='6' class='center'>
      <category-card class='mb-4'>
        <template #title>
          <h2>Pictures</h2>
        </template>
        <template #icon>
          <fa :icon="['fas', 'image']" size='3x' />
        </template>
        <template #subtitle>
          <div class='d-flex'>
            <span class='subtitle'>
             A collection of beautiful pictures.
            </span>
            <v-spacer></v-spacer>
            <v-chip label color='green darken-3' small>
              <span class='count'>
                <fa :icon="['fas', 'hashtag']" />
                {{ totalPictures }}
              </span>
            </v-chip>
          </div>
        </template>
      </category-card>
      <category-card>
        <template #title>
          <h2>Stories</h2>
        </template>
        <template #icon>
          <fa :icon="['fas', 'paragraph']" size='3x' />
        </template>
        <template #subtitle>
          <div class='d-flex'>
          <span class='subtitle'>
            A collection of inspiring short stories.
          </span>
            <v-spacer></v-spacer>
            <v-chip label color='green darken-3' small>
              <span class='count'>
                <fa :icon="['fas', 'hashtag']" />
                {{ totalStories }}
              </span>
            </v-chip>
          </div>
        </template>
      </category-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CategoryCard from '~/components/CategoryCard'
export default {
  components: {
    CategoryCard

  },
  async fetch({ store }) {
    // todo: many stories and pictures
    await store.dispatch('pictureStore/fetchPictures', { config: {} })
    await store.dispatch('storyStore/fetchStories', { config: {} })
  },
  computed: {
    ...mapState({
      pictures: (state) => state.pictureStore.pictures,
      stories: (state) => state.storyStore.stories
    }),
    ...mapGetters({
      totalPictures: 'pictureStore/totalPictures',
      totalStories: 'storyStore/totalStories'
    })
  }
}
</script>
<style>
.center {
  right: 50% !important;
  bottom: 50% !important;
  transform: translate(50%, 50%) !important;
  position: absolute !important;
}

h2 {
  font-family: 'Andada Pro', serif;
  font-weight: 700;
}

.subtitle {
  font-family: monospace;
  color: black;
}

.count {
  font-family: 'Andada Pro', serif;
  font-size: 14px;
  font-weight: 700;
  color: white;
}
</style>
