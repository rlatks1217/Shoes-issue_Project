<template>
  <div>
    <div class="bodyTitle">
      <div class="communityBoardTitle">자유 게시판</div>
      <div class="communityBoardDescription">신발에 관한 이야기라면 어떤 이야기라도 좋아요! 함께 이야기해요</div>
    </div>
    <button class="writeButton" v-on:click="boardWrite()">글쓰기</button>
    <v-simple-table height="200px" class="table">
      <thead class="table-light">
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>ID</th>
          <th>Date</th>
          <th>Like</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(board, i) in boards" :key="i">
          <th>{{ i + 1 }}</th>
          <th @click="boardDescription(board.boardId)">{{ board.boardTitle }}</th>
          <th>{{ board.userId }}</th>
          <th>{{ board.boardDate }}</th>
          <th>{{ board.boardLike }}</th>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      boards: {},
      userId: '',
    };
  },
  created() {
    this.$axios
      .get(`http://localhost/board`)
      .then(data => {
        this.boards = data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    boardDescription: function (boardId) {
      console.log(boardId);
      this.$store.state.boardId = boardId;
      this.$router.push({ name: 'communityBoardDescription' });
      console.log('클릭하면 실행');
    },
    boardWrite: function () {
      this.$router.push({ name: 'communityBoardWrite' });
    },
  },
};
</script>
<style scoped>
.bodyTitle {
  margin: 2% 30px 0px 30px;
}
.communityBoardTitle {
  font-size: 30px;
  font-weight: 700;
  color: rgb(64, 81, 59);
}

.communityBoardDescription {
  font-size: 20px;
}

.table {
  margin-left: 2%;
  margin-right: 3%;
  width: 95%;
}

.writeButton {
  float: right;
  font-size: 17px;
  margin-top: 20px;
  width: 8%;
  height: 40px;
  margin-right: 3%;
  margin-bottom: 10px;
  background-color: rgb(237, 241, 214);
  color: black;
  border-color: rgb(237, 241, 214);
  border-radius: 5px;
  border: 0;
}
</style>
