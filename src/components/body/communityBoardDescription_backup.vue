<template>
  <div class="board-detail">
    <div class="board-header">
      <h1 class="board-title">제목: {{ this.board.boardTitle }}</h1>
      <div class="board-meta">
        <div class="board-author">작성자: {{ this.board.userId }}</div>
        <div class="board-date">작성일: {{ this.board.boardDate }}</div>
      </div>
    </div>
    <div class="board-content">
      <div class="board-text">
        {{ this.board.boardContents }}
      </div>
    </div>
    {{ like }}
    <v-btn v-if="!userIdComment" disabled text icon color="pink"><v-icon>mdi-heart</v-icon></v-btn>
    <template v-if="!this.userId">
      <v-btn disabled class="mybutton" @click="goToUpdateBoard">수정</v-btn>
      <v-btn disabled class="mybutton" @click="deleteBoard">삭제</v-btn>
    </template>

    <template v-else>
      <v-btn text icon color="pink" @click="addLike">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn class="mybutton" @click="goToUpdateBoard">수정</v-btn>
      <v-btn class="mybutton" @click="deleteBoard">삭제</v-btn>
    </template>

    <h3>댓글</h3>
    <div v-if="updateCommentStatus === true">
      <input v-model="updateCommentContents" /> <button v-on:click="updateComment(commentId)">댓글 수정</button><button v-on:click="updateCommentToUnvisible">취소</button>
    </div>
    <table id="comment">
      <thead>
        <tr>
          <th class="commentTitle">댓글 내용</th>
          <th class="commentTitle">작성자 이름</th>
          <th class="commentTitle">작성일</th>
          <th class="commentTitle">댓글 수정</th>
          <th class="commentTitle">댓글 삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr class="commentList" v-for="comment in comments" :key="comment.commentId">
          <td class="commentContent">{{ comment.commentContents }}</td>
          <td class="commentMember">{{ comment.userId }}</td>
          <td class="commentDate">{{ comment.commentDate }}</td>
          <td class="commentUpdate" @click="updateCommentToVisible(comment.commentId)">수정</td>
          <td class="commentDelete" @click="deleteComment(comment.commentId)">삭제</td>
        </tr>
      </tbody>
    </table>
    <div>
      <input class="create-comment" v-model="commentContents" />
      <v-btn class="create-comment-button" v-if="!this.userIdComment" disabled v-on:click="createComment()">댓글 작성</v-btn>
      <v-btn class="create-comment-button" v-else v-on:click="createComment()">댓글 작성</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      like: 0,
      likeStatus: '',
      board: '',
      comments: '',
      commentId: '',
      commentContents: '',
      updateCommentStatus: false,
      updateCommentContents: '',
      userId: '',
      userIdComment: '',
    };
  },

  created() {
    // Vuex의 Store에서 클릭한 boardId를 가져옵니다.
    let boardId = this.$store.state.boardId;

    // 서버에서 게시글 세부조회 하는 API를 호출합니다.
    this.$axios
      .get(`http://localhost:80/board/${boardId}`)
      .then(data => {
        console.log(data.data);
        // 게시글의 세부 정보
        this.board = data.data;

        // 좋아요 정보
        this.like = data.data.boardLike;

        if (this.board.userId === sessionStorage.getItem('userId')) {
          this.userId = sessionStorage.getItem('userId');
        }
        this.userIdComment = sessionStorage.getItem('userId');

        console.log('userId 확인');
        console.log(this.userId);
        console.log(this.board.userId);
        console.log(sessionStorage.getItem('userId'));

        // 유저가 좋아요를 누른 게시물인지 확인
        let userId = sessionStorage.getItem('userId');
        this.$axios
          .get(`http://localhost:80/board/like?userId=${userId}&boardId=${boardId}`)
          .then(data => {
            if (data.status === 200) {
              this.likeStatus = true;
            } else {
              this.likeStatus = false;
            }
          })
          .catch(error => {
            console.log(error);
          });

        // 게시글의 댓글을 조회합니다.
        this.$axios
          .get(`http://localhost/board/comment/${boardId}`)
          .then(data => {
            this.comments = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    // 게시글 삭제
    deleteBoard: function () {
      let boardId = this.board.boardId;
      let userId = sessionStorage.getItem('userId');
      if (!confirm('정말 삭제하시겠습니까?')) return;

      this.$axios
        .delete(
          `http://localhost:80/board/${boardId}`, //
          { data: { userId } },
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then(data => {
          this.$router.push({ name: 'communityBoard' });
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 게시글 수정
    goToUpdateBoard: function () {
      this.$store.state.boardId;
      this.$router.push({ name: 'communityBoardUpdate' });
    },
    // 해당 게시글에 좋아요가 등록됩니다.
    addLike: function () {
      console.log(this.userIdComment);

      let boardId = this.board.boardId;
      let userId = sessionStorage.getItem('userId');
      if (this.likeStatus === false) {
        // 라이크 실행
        this.$axios
          .put(
            'http://localhost:80/board/like', //
            // { boardId, userId, headers: { 'Content-Type': 'application/json' } },
            { boardId, userId },
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then(data => {
            this.like = this.like += 1;
            this.likeStatus = true;
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }
      if (this.likeStatus === true) {
        // like 취소 실행
        // this.$axios
        //   .delete(
        //     'http://localhost:80/board/like', //
        //     // { data: { boardId, userId }, headers: { 'Content-Type': 'application/json' } },
        //     { boardId, userId },
        //     { headers: { 'Content-Type': 'application/json' } },
        //   )
        this.$axios
          .delete(`http://localhost:80/board/like?userId=${userId}&boardId=${boardId}`, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(data => {
            console.log(data);
            this.like = this.like -= 1;
            this.likeStatus = false;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    createComment: function () {
      // data v-model로 입력한 내용이 적용됨
      let commentContents = this.commentContents;
      let userId = sessionStorage.getItem('userId');
      let boardId = this.board.boardId;
      try {
        this.$axios
          .put(
            `http://localhost:80/board/comment`,
            { userId, commentContents, boardId }, //
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then(data => {
            this.$axios
              .get(`http://localhost:80/board/comment/${boardId}`)
              .then(data => {
                this.comments = data.data;
                this.commentContents = '';
              })
              .catch(error => {
                console.log(error);
              });
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    updateCommentToVisible: function (commentId) {
      this.commentId = commentId;
      this.updateCommentStatus = true;
    },
    updateCommentToUnvisible: function () {
      this.updateCommentStatus = false;
    },
    updateComment: function () {
      let userId = sessionStorage.getItem('userId');
      let commentId = this.commentId;
      let boardId = this.board.boardId;
      let commentContents = this.updateCommentContents;
      this.$axios
        .post(
          `http://localhost:80/board/comment`,
          { userId, commentId, boardId, commentContents }, //
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then(data => {
          this.updateCommentStatus = false;
          this.$axios
            .get(`http://localhost/board/comment/${boardId}`)
            .then(data => {
              this.comments = data.data;
              this.updateCommentContents = '';
            })
            .catch(error => {
              console.log(error);
            });
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteComment: function (commentId) {
      if (confirm('정말 삭제하시겠습니까?')) {
        // 사용자가 확인을 눌렀을 경우 게시글을 삭제합니다.
        let userId = sessionStorage.getItem('userId');
        let boardId = this.board.boardId;
        this.$axios
          .delete(
            'http://localhost/board/comment', //
            { userId, commentId, boardId },
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then(data => {
            this.$axios
              .get(`http://localhost/board/comment/${boardId}`)
              .then(data => {
                this.comments = data.data;
                this.updateCommentContents = '';
              })
              .catch(error => {
                console.log(error);
              });
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // 사용자가 취소를 눌렀을 경우
        return;
      }
    },
  },
};
</script>

<style scoped>
.board-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.board-author {
  color: #3e8e41;
  font-size: 18px;
  margin-bottom: 5px;
}

.board-date {
  color: #3e8e41;
  font-size: 14px;
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
  max-width: 90%;
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
  height: 200px;
  border: #7c7c7c 1px solid;
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
