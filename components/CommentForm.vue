<template>
  <form>
    <v-text-field
      v-model='name'
      :rules='nameRules'
      label='Name'
      required
      outlined
      clearable
      dense
    >
      <template #prepend>
        <div style='width: 30px' class='pa-0 ma-0'>
          <fa :icon='["far", "user"]' size='2x'></fa>
        </div>
      </template>
    </v-text-field>
    <v-textarea clearable rows='2' row-height='25' auto-grow outlined>
      <template #prepend>
        <div style='width: 30px' class='pa-0 ma-0'>
          <fa :icon='["far", "comment"]' size='2x'></fa>
        </div>
      </template>
    </v-textarea>

    <div class='d-flex'>
      <v-spacer></v-spacer>
      <v-btn
        class='mr-4 button'
        @click='submit'
      >
        Submit
      </v-btn>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CommentForm',
  data() {
    return {
      name: null,
      text: null,
      nameRules: [
        (input) => (input || '').length <= 50 || `A maximum of 100 characters is allowed`,
        (input) =>
          /^([A-Za-z0-9]|\s|(-|_))+$/.test(input || '') ||
          'only English, number, dash, underscore'
      ]
    }
  },
  methods: {
    submit() {
      console.log({
        name: this.name,
        text: this.text
      })
    }
  }
}
</script>

<style scoped>

.v-text-field >>> input {
  font-family: 'Andada Pro', serif;
  font-size: 16px;
  font-weight: 700;
  color: black;
}

::v-deep .v-textarea textarea {
  font-family: 'Andada Pro', serif;
  font-size: 16px;
  font-weight: 700;
  color: black;
}

.v-text-field >>> label {
  font-family: 'Andada Pro', serif;
  font-size: 16px;
  font-weight: 700;
  color: black;
}

.v-text-field >>>  {
  font-size: 0.8em;
}

.v-text-field >>> .error--text {
  font-family: 'Andada Pro', serif;
  font-weight: 700;
}

.button {
  font-family: 'Andada Pro', serif;
  text-transform: unset !important;
  font-weight: 600;
  font-size: 16px;
}

</style>
