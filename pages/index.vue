<template>
  <v-row justify='center' align='center'>
    <v-col cols='12' sm='6' md='4' class='center'>
      <category-card class='mb-4' to='picture/' nuxt>
        <template #title>
          <h2>Pictures</h2>
        </template>
        <template #icon>
          <fa :icon="['fas', 'image']" size='2x' />
        </template>
        <template #subtitle>
          <div class='d-flex'>
            <span class='subtitle'>
             A collection of beautiful pictures.
            </span>
            <v-spacer></v-spacer>
            <v-chip label color='lime darken-3' small>
              <span class='count'>
                <fa :icon="['fas', 'hashtag']" />
                {{ picturesCount }}
              </span>
            </v-chip>
          </div>
        </template>
      </category-card>
      <category-card to='story/' nuxt>
        <template #title>
          <h2>Stories</h2>
        </template>
        <template #icon>
          <fa :icon="['fas', 'paragraph']" size='2x' />
        </template>
        <template #subtitle>
          <div class='d-flex'>
          <span class='subtitle'>
            A collection of inspiring short stories.
          </span>
            <v-spacer></v-spacer>
            <v-chip label color='lime darken-3' small>
              <span class='count'>
                <fa :icon="['fas', 'hashtag']" />
                {{ storiesCount }}
              </span>
            </v-chip>
          </div>
        </template>
      </category-card>
    </v-col>
  </v-row>
</template>

<script>
import storyService from '@/services/storyService'
import pictureService from '@/services/pictureService'
import CategoryCard from '~/components/CategoryCard'
export default {
  components: {
    CategoryCard

  },
  async asyncData() {
    const { data: storiesResponse } = await storyService.getStoriesCount().catch(reason => {console.log(reason)})
    const { data: picturesResponse } = await pictureService.getPicturesCount().catch(reason => console.log(reason))
    return {
      storiesCount: storiesResponse.count,
      picturesCount: picturesResponse.count
    }
  }
}
</script>
<style scoped>
h2 {
  font-family: 'Andada Pro', serif;
  font-size: 36px;
  font-weight: 700;
}

.subtitle {
  font-family: 'Andada Pro', serif;
  font-size: 18px;
}

.count {
  font-family: 'Andada Pro', serif;
  font-size: 14px;
  font-weight: 700;
  color: white;
}
</style>
