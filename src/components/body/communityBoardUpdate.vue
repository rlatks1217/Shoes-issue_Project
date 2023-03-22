<template>
  <div class="board-detail">
    <div class="board-header">
      <div class="board-title-description">제목</div>
      <input class="board-title" v-model="boardTitle" />
      <div class="board-meta">
        <div class="board-author">작성자: {{ this.board.userId }}</div>
        <div class="board-date">작성일: {{ this.board.boardDate }}</div>
      </div>
    </div>
    <div class="board-content">
      <input class="board-text" v-model="boardContents" />
    </div>
    <div id="board-button">
      <button class="mybutton" @click="updateBoard">수정</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: '',
      boardContents: '',
      boardTitle: '',
    };
  },
  created() {
    let boardId = this.$store.state.boardId;
    let userId = sessionStorage.getItem('userId');
    console.log(`boardID => ${boardId}`);
    this.$axios
      .get(
        `http://localhost:80/board/${boardId}`,
        { data: { userId } },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(data => {
        console.log(data);
        this.board = data.data;
        this.boardContents = data.data.boardContents;
        this.boardTitle = data.data.boardTitle;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    updateBoard: function () {
      const boardTitle = this.boardTitle;
      const boardContents = this.boardContents;
      const userId = sessionStorage.getItem('userId');
      console.log(this.boardTitle);
      console.log(this.boardContents);
      this.$axios
        .post(
          `http://localhost:80/board/${this.board.boardId}`,
          {
            boardTitle,
            boardContents,
            userId,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then(data => {
          console.log(data);
          this.$router.push({ name: 'communityBoardDescription' });
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.board-title {
  border: 1px solid rgb(144, 149, 149);
  border-radius: 5px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 10px;
  width: 100%;
  max-width: 100%;
}

.board-title-description {
  font-size: 18px;
}

.board-author {
  font-size: 18px;
  margin-bottom: 5px;
}

.board-date {
  font-size: 18px;
  margin-bottom: 10px;
}

.board-content {
  margin-bottom: 10px;
  border: black 4px;
  border-radius: 4px;
}

.comment {
  border: 1px solid #3e8e41;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-number {
  color: #3e8e41;
  font-size: 14px;
  margin-bottom: 5px;
}

.comment-author {
  color: #3e8e41;
  font-size: 12px;
  margin-bottom: 5px;
}

.board-detail {
  padding: 20px;
  margin: 20px auto;
  margin-left: 14px;
  margin-right: 14px;
  max-width: 100%;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  color: #3e8e41;
  font-size: 24px;
  margin-bottom: 10px;
}

.meta {
  color: #7c7c7c;
  margin-bottom: 10px;
}

.content {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.comment-list {
  margin-top: 20px;
}

.comment-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.comment-meta {
  color: #7c7c7c;
  margin-bottom: 5px;
}

.comment-content {
  font-size: 16px;
  line-height: 1.3;
}

.board-text {
  width: 100%;
  height: 400px;
  border: 1px solid rgb(144, 149, 149);
  border-radius: 5px;
  padding: 5px;
}

.board-button {
  display: flex;
}

.mybutton {
  margin: 5px;
  width: 50px;
  height: 30px;
  background-color: #f2f2f2;
  font-size: 16px;
  border-radius: 5px;
  border: none;
}
.mybutton:hover {
  background-color: #3e8e41;
  color: white;
}

#comment {
  width: 100%;
  border: none;
  border-radius: 10px;
}

.commentList {
  text-align: center;
  background: #f2f2f2;
  border-radius: 5px;
}

.commentContent {
  width: 40%;
  border: none;
  border-radius: 5px;
}

.commentMember {
  width: 15%;
  border: none;
  border-radius: 5px;
}
.commentDate {
  width: 15%;
  border: none;
  border-radius: 5px;
}
.commentUpdate {
  width: 15%;
  border: none;
  border-radius: 5px;
}
.commentDelete {
  width: 15%;
  border: none;
  border-radius: 5px;
}

.commentTitle {
  background: #3e8e41;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
}

#like {
  color: red;
}
.create-comment {
  margin-top: 15px;
  width: 77%;
  font-size: 15px;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
}

.create-comment-button {
  width: 20%;
  padding: 5px;
  background-color: #f2f2f2;
  font-size: 15px;
  border-radius: 5px;
  border: none;
}

.create-comment-button:hover {
  background: #3e8e41;
  color: white;
}
</style>
