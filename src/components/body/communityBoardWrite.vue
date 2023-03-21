<template>
  <div class="container">
    <form>
      <h1>게시글 작성</h1>
      <div class="form-group">
        <label for="title">제목:</label>
        <input type="text" id="title" v-model="boardTitle" />
      </div>

      <div class="form-group">
        <label for="content">내용:</label>
        <textarea id="content" v-model="boardContents"></textarea>
      </div>

      <div class="form-group">
        <button type="button" @click="submitPost">작성 완료</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boardTitle: '',
      boardContents: '',
      userId: '',
    };
  },
  methods: {
    created() {},
    submitPost() {
      let url = 'http://localhost:80/board';
      let data = {};
      console.log(data);

      let userId = sessionStorage.getItem('userId');
      console.log(userId);
      this.$axios
        .put(
          url,
          {
            boardTitle: this.boardTitle, //
            boardContents: this.boardContents,
            userId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(data => {
          console.log(data);
          this.$router.push({ name: 'communityBoard' });
        })
        .catch(error => {
          console.log(error);
        });
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
  height: 90%;
}

.form-group {
  margin-bottom: 20px;
  width: 80%;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input[type='text'],
textarea {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

#content {
  height: 250px;
}

button {
  padding: 10px 20px;
  background-color: #2a9d8f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #21867a;
}
</style>
