<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (enter to add)</label>
      <input type="text" name="new-message" v-model="newMessage">

      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from '@/services/firebase'

export default {
  name: "NewMessage",
  props: {
    name: String,
  },
  data: () => ({
    newMessage: null,
    feedback: null
  }),
  methods: {
    async addMessage(){
      if(this.newMessage){
        try {
          await db.collection('messages').add({
            name: this.name,
            content: this.newMessage,
            timestamp: Date.now()
          })

          this.newMessage = null
          this.feedback = null

        } catch (error) {
          this.feedback = error
        }
      } else {
        this.feedback = "You must enter a message in order to send one"
      }
    }
  }
}
</script>

<style>

</style>
