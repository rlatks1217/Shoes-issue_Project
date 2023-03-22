<template>
  <v-container overflow-auto class="main-container">
    <v-container class="content-container">
      <div v-intersect="onHover" :class="{ 'on-hover': isHovering }" class="boardTitle-subtitle" @click="goToCommunityBoard">자유게시판 ></div>

      <div class="boardTitle">
        <h3>{{ board.boardTitle }}</h3>
      </div>
      <div class="user-information-box">
        <div class="board-title-userId">{{ board.userId }}</div>
        |
        <div class="board-title-board-date">
          {{ board.boardDate }}
        </div>
      </div>
      <hr />

      <div class="board-content-container">{{ board.boardContents }}</div>

      <div class="bottom-content-box">
        <div class="like-content">
          <v-btn icon x-small depressed color="pink">
            <v-icon @click="addLike">mdi-heart</v-icon>
          </v-btn>
          좋아요: {{ like }}
        </div>
        <div class="update-delete-button">
          <div v-if="board.userId === userId">
            <v-btn class="my-button" x-small depressed outlined @click="goToUpdateBoard">수정</v-btn>
            <v-btn class="my-button" x-small depressed outlined @click="deleteBoard">삭제</v-btn>
          </div>
          <div v-else>
            <v-btn class="my-button" x-small depressed outlined disabled>수정</v-btn>
            <v-btn class="my-button" x-small depressed outlined disabled>삭제</v-btn>
          </div>
        </div>
      </div>

      <!-- 댓글 영억 -->
      <!-- 댓글 수정용 코드 -->

      <div v-if="updateCommentStatus === true" class="comment-content-box">
        <!--댓글 수정 버튼을 누르면 나타납니다.-->
        <div class="comment-create-user">{{ userId }} (댓글 수정)</div>
        <input class="create-comment" v-model="updateCommentContents" />
        <div class="comment-action-button">
          <div>
            <v-btn class="create-comment-button" depressed outlined x-small v-if="!userIdComment" disabled>댓글 수정</v-btn>
            <v-btn class="create-comment-button" depressed x-small outlined @click="updateComment(commentId)" v-else>댓글 수정</v-btn>
          </div>
        </div>
      </div>

      <div class="comment-title-box">댓글</div>

      <div class="comment-container" v-for="comment in comments" :key="comment.commentId">
        <div class="comment-core">
          <div class="comment-icon-container">
            <v-icon large class="comment-icon">mdi-account-circle</v-icon>
          </div>
          <div class="comment-text">
            <!-- nickName으로 바꾸기 -->
            <div class="comment-userId">{{ comment.userId }}</div>
            <div class="comment-content">{{ comment.commentContents }}</div>
            <div class="comment-date">{{ comment.commentDate }}</div>
          </div>
          <div v-if="comment.userId === userId" class="comment-update-container">
            <v-btn class="comment-update" x-small depressed outlined @click="updateCommentToVisible(comment.commentId)">수정</v-btn>
            <v-btn class="comment-delete" x-small depressed outlined @click="deleteComment(comment.commentId)">삭제</v-btn>
          </div>
          <div v-else class="comment-update-container">
            <v-btn class="comment-update" x-small depressed disabled outlined @click="updateCommentToVisible(comment.commentId)">수정</v-btn>
            <v-btn class="comment-delete" x-small depressed disabled outlined @click="deleteComment(comment.commentId)">삭제</v-btn>
          </div>
        </div>
      </div>
      <!-- table-end -->
      <!-- comment button-start -->
      <div class="comment-content-box">
        <div class="comment-create-user" v-if="userId">{{ userId }}</div>
        <div v-else class="comment-create-user">로그인해 주세요</div>
        <input v-if="userId" class="create-comment" v-model="commentContents" />
        <input v-else disabled class="create-comment" v-model="commentContents" />
        <div class="comment-action-button">
          <div>
            <v-btn class="create-comment-button" depressed x-small v-if="!userIdComment" disabled outlined v-on:click="createComment()">댓글 작성</v-btn>
            <v-btn class="create-comment-button" depressed x-small v-else outlined v-on:click="createComment()">댓글 작성</v-btn>
          </div>
        </div>
      </div>
      <br />
      <!-- comment button-end -->
    </v-container>
  </v-container>
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
      isHovering: false,
    };
  },

  mounted() {
    // Vuex의 Store에서 클릭한 boardId를 가져옵니다.
    let boardId = this.$store.state.boardId;
    this.userId = sessionStorage.getItem('userId');
    // 서버에서 게시글 세부조회 하는 API를 호출합니다.
    this.$axios
      .get(`http://localhost:80/board/${boardId}`)
      .then(data => {
        // 게시글의 세부 정보
        this.board = data.data;

        // 좋아요 정보
        this.like = data.data.boardLike;

        if (this.board.userId === sessionStorage.getItem('userId')) {
          this.userId = sessionStorage.getItem('userId');
        }
        this.userIdComment = sessionStorage.getItem('userId');

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
    onHover(entries) {
      this.isHovering = entries[0].isIntersecting;
    },
    goToCommunityBoard: function () {
      this.$router.push({ name: 'communityBoard' });
    },
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
.main-container {
  /* border: 1px solid black; */
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 75%;
}

.content-container {
  /* border: 1px solid black; */
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.comment-update-container {
  display: flex;
  position: relative;
}

.comment-update {
  margin: 3px;
}

.comment-delete {
  margin: 3px;
}
.user-information-box {
  display: flex;
}
.board-title-userId {
  font-weight: 600;
  width: auto;
  padding-right: 5px;
}

.board-title-board-date {
  padding-left: 5px;
  width: 90%;
  font-weight: 500;
  font-size: 12px;
  margin-top: 4px;
  color: rgb(143, 142, 142);
}

.boardTitle-subtitle {
  padding-bottom: 5px;
  color: rgb(64, 81, 59);
  font-weight: 700;
}

.user-information-container {
  border: 1px solid black;
}

.board-content-container {
  border: 1px solid rgb(207, 215, 215);
  border-radius: 5px;
  height: 30%;
  padding: 5px;
}
.comment-container {
  border-bottom: 1px solid rgb(207, 215, 215);
  display: flex;
  align-items: center;
  height: 70px; /* 적당한 높이값 */
}

.bottom-content-box {
  border-bottom: 1px solid rgb(207, 215, 215);
  justify-content: center;
  display: flex;
  height: 30px;
  margin-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
}

.comment-title-box {
  margin-top: 10px;
  font-size: larger;
  font-weight: 600;
}

.comment-core {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.comment-icon {
  font-size: 24px;
}

.comment-userId {
  font-size: 15px;
  font-weight: 800;
}
.comment-content {
  font-weight: 500;
  font-size: 15px;
}
.comment-date {
  font-weight: 500;
  font-size: 12px;
  color: rgb(143, 142, 142);
  margin: 0;
}

.mybutton {
}

.comment-content-box {
  margin-top: 10px;
  width: auto;
  padding: 10px;
  border: 1px solid rgb(207, 215, 215);
  border-radius: 5px;
  height: 15%;
}
.comment-text {
  width: 86%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px; /* 아이콘과 텍스트 간격 조절 */
}

.comment-create-user {
  font-weight: 800;
  font-size: 15px;
}

.create-comment {
  width: 100%;
  padding-left: 7px;
  border: 1px solid rgb(207, 215, 215);
  border-radius: 5px;
}

.comment-action-button {
  float: right;
  padding: 4px;
}

.like-content {
  width: 88%;
}

.create-comment-button {
  float: right;
}

.my-button {
  margin: 2px;
}
</style>
