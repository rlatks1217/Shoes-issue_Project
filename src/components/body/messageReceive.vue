<template>
  <div class="bodyTitle">
    <div class="messageTitle">받은 쪽지함</div>
    <button class="sendMsgBtn" @click="messagesend">보낸 쪽지함</button>
    <!-- <input type="checkbox" v-model="message.selected"> -->
    <table class="table">
      <thead class="table-light">
        <tr>
          <th>선택</th>
          <th>보낸 사람</th>
          <th>제목</th>
          <th>받은 날짜</th>
          <th>열람여부</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(message, i) in messages" :key="i">
          <td>
            <input type ="checkbox" v-model="message.checked" @click="toggleChecked(message)">
          </td>
          <td>{{message.messageSender}}</td>
          <td v-on:click="messagereceiveDescription(message.messageId)">{{message.messageTitle}}</td>
          <td>{{message.messageSenddate}}</td>
          <td>{{message.messageOpenstatus}}</td>
        </tr>
        <td>
          <input
            type="checkbox"
            v-model="message.checked"
            @click="toggleChecked(message)"
          />
        </td>
      </tbody>
    </table>
    <button class="deleteBtn">삭제</button>
    <!-- <button v-on:click="messageReceive00">모든 메시지 조회 기능 테슴트</button> -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      messages: {},
      message: { checked: true },
    };
  },
  created() {
    let userId  = 'user2';
    let url = `http://localhost/message/inbox/${userId}`;
    this.$axios({
      url,
      methods: "GET",
    })
      .then((data) => {
        console.log(data.data);
        this.messages = data.data; 
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    toggleChecked(message) {
      message.checked = !message.checked;
      console.log(message.checked);
    },
    messagereceiveDescription: function(messageId) {
      console.log(messageId);
      this.$store.state.messageId = messageId;
      this.$router.push({ name: 'messageReceiveDescription' });
      console.log('받은 쪽지 상세');
    },
    messagesend: function(messageId) {
      console.log(messageId);
      this.$store.state.messageId = messageId;
      this.$router.push({ name: 'messageSend' });
      console.log('보낸 쪽지함');
    },
    // messageReceive00: function(){
    //   console.log('메시지 체크하는 기능이에요');
    //   let userId = `user2`;
    //   this.$axios.get(`http://localhost/message/inbox/${userId}`).then(data => {
    //     console.log(data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // }
  },
};
</script>

<style>
.bodyTitle {
  margin: 2% 30px 0px 30px;
}
.messageTitle {
  font-size: 30px;
  font-weight: 700;
  color: rgb(0, 0, 0);
}

.receivedMsgBtn {
  float: left;
  font-size: 17px;
  margin-top: 20px;
  width: 10%;
  height: 40px;
  margin-right: 3%;
  margin-bottom: 10px;
  background-color: rgb(157, 192, 139);
  color: black;
  border-color: rgb(157, 192, 139);
  border-radius: 5px;
  border: 0;
}

.sendMsgBtn {
  float: left;
  font-size: 17px;
  margin-top: 20px;
  width: 10%;
  height: 40px;
  margin-right: 3%;
  margin-bottom: 10px;
  background-color: rgb(157, 192, 139);
  color: black;
  border-color: rgb(157, 192, 139);
  border-radius: 5px;
  border: 0;
}

.table {
  margin-left: 2%;
  margin-right: 3%;
  width: 95%;
}

.deleteBtn {
  float: right;
  font-size: 17px;
  margin-top: 20px;
  width: 10%;
  height: 40px;
  margin-right: 3%;
  margin-bottom: 10px;
  background-color: rgb(236, 122, 91);
  color: black;
  border-color: rgb(236, 122, 91);
  border-radius: 5px;
  border: 0;
}
</style>
