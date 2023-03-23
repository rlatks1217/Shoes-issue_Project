<template>
  <div>
    <div class="bodyTitle">
      <div class="communityBoardTitle">자유 게시판</div>
      <div class="communityBoardDescription">신발에 관한 이야기라면 어떤 이야기라도 좋아요! 함께 이야기해요</div>
    </div>
    <v-btn v-if="!this.userId" secondary disabled small class="writeButton">글쓰기</v-btn>
    <v-btn v-else class="writeButton" small @click="boardWrite()">글쓰기</v-btn>
    <v-data-table
      :headers="headers"
      :items="boards"
      :rows-per-page="5"
      :footer-props="{
        itemsPerPageOptions: [5],
        showCurrentPage: false,
        itemsPerPageText: 'Rows per page',
      }"
      class="elevation-1 table"
      style="margin-top: 80px"
    >
      <template v-slot:[`item.boardTitle`]="{ item }">
        <div @click="boardDescription(item.boardId)">{{ item.boardTitle }}</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      boards: [],
      userId: '',
      headers: [
        { text: 'No.', value: 'no' },
        { text: 'Title', value: 'boardTitle' },
        { text: 'Nickname', value: 'nickName' },
        { text: 'Date', value: 'boardDate' },
        { text: 'Like', value: 'boardLike' },
      ],
    };
  },
  created() {
    this.userId = sessionStorage.getItem('userId');
    this.$axios
      .get(`http://localhost/board`)
      .then(data => {
        this.boards = data.data.map((board, i) => ({ ...board, no: i + 1 }));
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    boardDescription(boardId) {
      this.$store.state.boardId = boardId;
      this.$router.push({ name: 'communityBoardDescription' });
    },
    boardWrite() {
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
  margin-top: 20px;
  margin-right: 3%;
  background-color: rgb(237, 241, 214);
}
</style>
