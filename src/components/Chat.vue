<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}</span>

            <span class="grey-text text-darken-3">{{ message.content }}</span>

            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>

      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import db from "@/services/firebase"

import NewMessage from "@/components/NewMessage"

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage
  },
  data: () => ({
    messages: []
  }),
  async created() {
    const query = db.collection('messages').orderBy('timestamp')

    await query.onSnapshot(ref => {
      ref.docChanges().map(changes => {
        if(changes.type == 'added') {
          let item = changes.doc

          this.messages.push({
            id: item.id,
            name: item.data().name,
            content: item.data().content,
            timestamp: moment(item.data().timestamp).format('lll')
          })
        }
      })
    })
  },
}
</script>

<style lang="scss">
  .chat {
    h2 {
      margin-bottom: 40px;

      font-size: 2.6rem;
    }

    span {
      font-size: 1.4rem;
    }

    .time {
      display: block;
      font-size: 0.8rem;
    }

    .messages {
      max-height: 300px;
      overflow: auto;

      &::-webkit-scrollbar { width: 3px; }

      &::-webkit-scrollbar-track { background: #DDD; }

      &::-webkit-scrollbar-thumb { background: #AAA; }
    }
  }
</style>
