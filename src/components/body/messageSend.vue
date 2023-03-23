<template>
  <div class="bodyTitle">
    <div class="messageTitle">보낸 쪽지함</div>
    <button class="receivedMsgBtn" @click="messagereceive">받은 쪽지함</button>
    <table class="table">
      <thead class="table-light">
        <tr>
          <!-- <th>선택</th> -->
          <th>받은 사람</th>
          <th>제목</th>
          <th>보낸 날짜</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="(message, i) in messages" :key="i">
          <!-- <td>
            <input type ="checkbox" v-model="message.checked" @click="toggleChecked(message)">
          </td> -->
          <td>{{message.nickName}}</td>
          <td v-on:click="messagesendDescription(message.messageId)">{{message.messageTitle}}</td>
          <td>{{message.messageSenddate}}</td>
        </tr>
        <!-- <td>
          <input
            type="checkbox"
            v-model="message.checked"
            @click="toggleChecked(message)"
          />
        </td> -->
      </tbody>
    </table>
    <!-- <button class="deleteBtn">삭제</button> -->
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
    // let userId  = 'user2';
    let userId = sessionStorage.getItem("userId");
    let url = `http://localhost/message/sent/${userId}`;
    this.$axios({
      url,
      methods: "GET",
    })
      .then((data) => {
        console.log(data.data);
        this.messages= data.data;
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
    messagesendDescription: function(messageId) {
      console.log(messageId);
      this.$store.state.messageId = messageId;
      this.$router.push({ name: 'messageSendDescription' });
      console.log('보낸 쪽지 상세');
    },
    messagereceive: function(messageId) {
      console.log(messageId);
      this.$store.state.messageId = messageId;
      this.$router.push({ name: 'messageReceive' });
      console.log('받은 쪽지함');
    },
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
