<template>
  <v-card
    class='mb-1 mx-auto'
    elevation='5'
    v-bind='$attrs'
    width='400'
  >
    <v-img
      width='400'
      :src='image'
    ></v-img>
    <v-list-item three-line>
      <v-list-item-content>
        <div class=' mb-4'>
          <span class='header'>
            <fa :icon="['far', 'user']" size='lg' />
            <span class='uploader-name-tag'>{{ uploader }}</span>
          </span>
        </div>
        <div class='d-flex'>
          <div class=' count pr-4'>
            <fa :icon="['far', 'comment']" />
            {{ commentCount }}
          </div>
          <v-spacer></v-spacer>
          <div class='count'>
            <fa :icon="['far', 'calendar-alt']" />
            {{ $getProperDate(date) }}
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>


<script>
export default {
  name: 'PictureCard',
  props: {
    uploader: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    commentCount: {
      type: [String, Number],
      required: true
    },
    date: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  methods: {}
}
</script>

<style scoped>
.header {
  font-family: 'Andada Pro', serif;
  font-size: 18px;
  font-weight: 900;
}

.count {
  font-family: 'Andada Pro', serif;
  font-size: 13px;
  font-weight: 700;
}
</style>
