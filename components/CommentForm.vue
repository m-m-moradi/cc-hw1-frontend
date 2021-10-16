<template>
  <v-form ref='form'>
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
    <v-textarea
      v-model='comment'
      :rules='textRules'
      label='Comment'
      clearable
      rows='2'
      row-height='25'
      required
      auto-grow
      outlined
    >
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
        :loading='loading'
        @click='submit'
      >
        Submit
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'CommentForm',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: null,
      comment: null,
      nameRules: [
        (input) => Boolean(input) || 'Name is required',
        (input) => (input || '').length <= 50 || `A maximum of 100 characters is allowed`,
        (input) =>
          /^([A-Za-z0-9]|\s|(-|_))+$/.test(input || '') ||
          'only English, number, dash, underscore'
      ],
      textRules: [
        (input) => Boolean(input) || 'Text for the comment in required',
        (input) =>
          /^([A-Za-z0-9?><;,{}[\]\-_+=!@#$%^&*|']|\s|(-|_))+$/.test(input || '') ||
          'only English, number, dash, underscore'
      ]
    }
  },
  methods: {
    submit() {
      this.$emit('submit', { name: this.name, comment: this.comment })
      console.log(this.$refs)
      this.comment = null
      this.name = null
      this.$refs.form.resetValidation()
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

.v-text-field >>> {
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
