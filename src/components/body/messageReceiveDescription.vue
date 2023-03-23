<template>
  <div class="message-detail">
    <div class="message-header">
      <h1 class="message-title">제목: {{ this.message.messageTitle }}</h1>
      <div class="message-meta">
        <div class="message-sender">보낸 사람: {{ this.message.nickName }}</div>
        <div class="message-senddate">보낸 날짜: {{ this.message.messageSenddate }}</div>
        <!-- <div class="messsage-receiver">받는 사람: {{ this.message.messageReceiver }}</div> -->
      </div>
    </div>
    <div class="message-content">
      <div class="message-text">
        {{ this.message.messageContents }}
      </div>
      <div class="message-button">
        <v-btn class="mybutton" @click="messageDelete">삭제</v-btn>
        <v-btn class="mybutton" @click="messagereceive">확인</v-btn>
        <v-btn class="mybutton" @click="messagewrite(message.messageSender)">답장</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  created() {
    let messageId = this.$store.state.messageId;
    // let messageId = 'message1';
    console.log('messageId확인');
    console.log(messageId);
    const url = `http://localhost:80/message/${messageId}`;
    this.$axios({
      url,
      method: 'GET',
    })
      .then(data => {
        console.log(data.data);
        this.message = data.data;
        console.log('nothingcheck');
        console.log(this.nothing);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    messageDelete: function() {
      let messageId = this.message.messageId;
      // console.log(this.message.messageId);
      console.log(messageId);
      const url = `http://localhost/message/delete/${messageId}`;

      this.$axios({
        url: url,
        method: 'POST',
        data: messageId,
      })
        .then(data => {
          this.$router.push({ name: 'messageReceive' });
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    messagereceive: function (messageId) {
      console.log(messageId);
      this.$store.state.messageId = messageId;
      this.$router.push({ name: 'messageReceive' });
      console.log('보낸 쪽지함');
    },

    // v-on:click=="messagewrite(message.messageId)"
    messagewrite: function (messageSender) {
      console.log(messageSender);
      // Vuex를 이용해서 store라는 저장공간에 따로 messageId를 저장하는 코드
      this.$store.state.messageReceiver = messageSender;
      // let messageId = this.$store.state.messageId
      // Vue Router를 이용해서 정해진 component page를 적용해주는 코드
      this.$router.push({ name: 'messageWrite' });
      console.log('쪽지 작성');
    },

    
  },
};
</script>

<style>
.mybutton {
  margin: 10px;
}

.message-title {
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.message-sender {
  color: black;
  font-size: 18px;
  margin-bottom: 5px;
}

.message-senddate {
  color: black;
  font-size: 14px;
  margin-bottom: 10px;
}

.message-receiver {
  color: black;
  font-size: 18px;
  margin-bottom: 5px;
}

.message-content {
  margin-bottom: 10px;
  border: black 4px;
  border-radius: 4px;
}

.message-detail {
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
