<template>
  <div class="container">
    <form>
      <h3>쪽지 보내기</h3>
      <br>
      <div class="form-group">
        <label for="messageSender"> 보내는 사람: {{ this.senderNickName }}</label>
        <label for="messageReceiver"
          >받는 사람: {{ this.messageReceiver }}</label
        >
      </div>

      <div class="form-group">
        <label for="title">제목:</label>
        <input type="text" id="title" v-model="messageTitle"/>
      </div>

      <div class="form-group">
        <label for="content">내용:</label>
        <textarea id="content" v-model="messageContents"></textarea>
      </div>

      <div class="form-group">
        <button type="button" @click="messageCancel">취소</button>
        <button type="button" @click="submitPost">보내기</button>
      </div>
    </form>
  </div>    
</template>
<script>

export default {
  data() {
    return {
      messageTitle: "",
      messageContents: "",
      messageReceiver: "", //게시글의 작성자 닉네임
      messageReceiverId: "", //게시글의 작성자 아이디
      tradeId : "", //게시글의 작성자의 글번호
      senderNickName : "", //보내는사람 닉네임
    };
  },
  created() {
    this.messageReceiver = this.$store.state.messageReceiver;
    this.tradeId = this.$route.params.tradeId;
    this.messageReceiver = this.$route.params.nickName;
    this.messageReceiverId = this.$route.params.messageReceiverId;
    this.senderNickName = this.$route.params.senderNickName;
  },
  methods: {
    submitPost() {
      let url = "http://localhost:80/message";
      let data = {};
      console.log(data);
      console.log(this.messageTitle);
      this.$axios
        .post(
          url,
          {
            messageTitle: this.messageTitle,
            messageContents: this.messageContents,
            messageReceiver: this.messageReceiverId,
            messageSender: sessionStorage.getItem('userId'),
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((data) => {
          console.log(data);
          this.$router.push({ name: "messageSend" });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    messageCancel: function () {
      let userId = this.messageReceiverId;

    this.$axios({
          url : 'http://localhost/trade-board/' + this.tradeId +"/" + userId,
          method : 'GET',
          responseType : 'json'
        }).then(function(tradeBoardDetail){
          console.log(tradeBoardDetail.data);
          let resultData = tradeBoardDetail.data;

          //레벨 나타내기
          if (resultData <= 10) {
            resultData.point = 1;
          }else if (resultData <= 50){
            resultData.point = 2;
          }else if (resultData <= 100) {
            resultData.point = 3;
          }else if (resultData <= 500) {
            resultData.point = 4;
          }else if (resultData <= 1000) {
            resultData.point = 5;
          }else {
            resultData.point = 6;
          }
          resultData.userId = userId;
          console.log(resultData.userId);
          if (userId !== sessionStorage.getItem('userId')) {
            //삭제버튼/수정버튼 여부
            resultData.deleteFlag = false;
            resultData.updateFlag = false;

          }else {
            resultData.deleteFlag = true;
            resultData.updateFlag = true;
          }

          if (resultData.tradeStatus === '거래중') {
            resultData.reserveCancelFlag = true;
          }else {
            resultData.reserveCancelFlag = false;
          }
          
          this.$store.state.detail = resultData;
          this.$router.push({ name: "tradeBoardDetail" });
        }.bind(this));
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  height: 70%;
}

.form-group {
  margin-bottom: 20px;
  width: 80%;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

#content {
  height: 150px;
}

button {
  padding: 10px 20px;
  background-color: rgb(157, 192, 139);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgb(157, 192, 139);
}
</style>