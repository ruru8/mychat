<template>
  <div>
    <div>
      <b-modal id="modal-1" v-bind:no-close-on-backdrop="true" v-bind:hide-header-close="true">
        <div slot="modal-header">
          <span>Let's start chat!</span>
        </div>
        <form @submit="onSubmitName" class="form">
          <div class="form-group">
            <label>名前</label>
            <input v-model="$data.name" type="text" class="form-control" />
          </div>
          <button class="btn btn-info" type="submit" v-bind:disabled="$data.name === ''">chatを始める</button>
        </form>
        <div slot="modal-footer"></div>
      </b-modal>
    </div>
    <div class="container">
      <form @submit="onSubmit" class="form">
        <div class="form-group">
          <label>名前</label>
          <input v-model="$data.name" type="text" class="form-control" disabled="true" />
        </div>
        <div class="form-group">
          <label>メッセージ</label>
          <input v-model="$data.content" type="text" class="form-control" />
        </div>
        <button class="btn btn-info" type="submit" v-bind:disabled="$data.content === ''">送るよ</button>
      </form>
      <div v-for="item in messages" class="border border-info my-3">
        <div>名前: {{ item.name }}</div>
        <div>メッセージ: {{ item.contents }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MyComponent from './components/MyComponent.vue';

export default {
  components: {
    MyComponent
  },
  data() {
    return {
      message: {},
      messages: [],
      name: '',
      content: ''
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
      this.$bvModal.show('modal-1');
    });

    socket.on('disconnect', () => {
      console.log('disconnected:', socket.id);
    });

    socket.on('send', message => {
      this.messages.push({ name: message.name, contents: message.content });
    });

    socket.on('sendName', name => {
      this.messages.push({
        name: 'SYSTEM',
        contents: name + 'さんが入室しました'
      });
    });
  },
  methods: {
    onSubmitName(e) {
      e.preventDefault();
      this.name = this.$data.name;
      this.$bvModal.hide('modal-1');
      socket.emit('sendName', this.$data.name);
    },
    /**
     * Enterボタンを押したとき
     */
    onSubmit(e) {
      e.preventDefault();
      this.$data.message = {
        name: this.$data.name,
        content: this.$data.content
      };
      socket.emit('send', this.$data.message);
      this.$data.content = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
}

.sample {
  color: $red;
}
</style>
