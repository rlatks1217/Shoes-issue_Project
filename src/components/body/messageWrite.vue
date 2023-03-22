<template>
  <div class="container">
    <form>
      <h3>쪽지 보내기</h3>
      <br />
      <div class="form-group">
        <label for="messageSender"> 보낸 사람: {{ this.userId }}</label>
        <label for="messageReceiver"
          >받는 사람: {{ this.messageReceiver }}</label
        >
      </div>

      <div class="form-group">
        <label for="title">제목:</label>
        <input type="text" id="title" v-model="messageTitle" />
      </div>

      <div class="form-group">
        <label for="content">내용:</label>
        <textarea id="content" v-model="messageContents"></textarea>
      </div>

      <div class="form-group">
        <button type="button" @click="messagereceive">취소</button>
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
      messageReceiver: "",
      userId: "",
    };
  },
  created() {
    this.messageReceiver = this.$store.state.messageReceiver;
    // this.userId = this.$store.state.userId
    this.userId = sessionStorage.getItem("userId");
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
            messageReceiver: this.messageReceiver,
            messageSender: this.userId,
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

    messagereceive: function (messageId) {
      console.log(messageId);
      this.$store.state.messageId = messageId;
      this.$router.push({ name: "message" });
      console.log("보낸 쪽지함");
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
