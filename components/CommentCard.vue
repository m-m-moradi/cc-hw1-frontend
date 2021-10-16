<template>
  <v-card
    class='mb-3'
    elevation='5'
    v-bind='$attrs'
  >
    <v-card-title>
      <div class='header' style='width: 70%'>
        <fa :icon="['far', 'user']" size='lg' />
        <span class='author'>{{ author }}</span>
      </div>
      <v-spacer></v-spacer>
      <span class='date'>
        <fa :icon="['far', 'calendar-alt']" />
        {{ getProperDate(date) }}
      </span>
    </v-card-title>
    <v-card-text class='pt-2 pb-3 text'>
      {{ text }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CommentCard',
  props: {
    author: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
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

.header {
  font-family: 'Andada Pro', serif;
  font-size: 18px;
  font-weight: 900;
}

.text {
  font-family: 'Andada Pro', serif;
  font-size: 16px;
  font-weight: 500;
}

.date {
  font-family: 'Andada Pro', serif;
  font-size: 15px;
  font-weight: 700;
}

.author {
  background-color: #c0392b;
  padding: 3px 5px;
  border-radius: 3px;
  color: white;
}

</style>
