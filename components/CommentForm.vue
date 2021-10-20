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
      :rules='commentRules'
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
import { commentRules } from '@/validation/commentValidation'
import { nameRules } from '@/validation/nameValidation'
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
      commentRules,
      nameRules
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', { name: this.name, comment: this.comment })
        this.comment = null
        this.name = null
        this.$refs.form.resetValidation()
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
