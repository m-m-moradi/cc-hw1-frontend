<template>
  <v-card
    class='mb-1 mx-auto'
    elevation='5'
    v-bind='$attrs'
  >
    <v-card-title>
      <div class='header overflow' style='width: 70%'>
        <fa :icon="['far', 'user']" size='lg' />
        <span class='author-name-tag'>{{ author }}</span>
        : {{ capitalTitle }}
      </div>
      <v-spacer></v-spacer>
      <span class=' count pr-4'>
        <fa :icon="['far', 'comment']" />
        {{ commentCount }}
      </span>
      <span class='count'>
        <fa :icon="['far', 'calendar-alt']" />
        {{ $getProperDate(date) }}
      </span>
    </v-card-title>
    <v-card-subtitle class='pt-2 pb-3 overflow text'>
      {{ text }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'StoryCard',
  props: {
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
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
    }
  },
  computed: {
    capitalTitle() {
      return this.title.charAt(0).toUpperCase() + this.title.slice(1)
    }
  },
  methods: {}
}
</script>

<style scoped>
.header {
  font-size: 18px;
  font-weight: 900;
}

.count {
  font-family: 'Andada Pro', serif;
  font-size: 15px;
  font-weight: 700;
}

.overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text {
  font-family: 'Andada Pro', serif;
  font-size: 14px;
  font-weight: 500;
}
</style>
