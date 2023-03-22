<template>
  <v-container overflow-auto class="main-container">
    <v-container class="content-container">
      <div class="boardTitle-subtitle">자유게시판 ></div>
      <div class="boardTitle">
        <h3>{{ this.board.boardTitle }}</h3>
      </div>
      <div class="user-information-box">{{ this.board.userId }}신발사랑 | 작성일: {{ this.board.boardDate }}<br /></div>

      <hr />

      <div class="board-content-container">내용: {{ this.board.boardContents }}</div>

      <div class="bottom-content-box">
        <v-btn icon x-small color="pink">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        좋아요: {{ like }}
        <template v-if="!this.userId">
          <!-- 수정 버튼 -->
          <v-btn disabled small plain outlined class="mybutton" @click="goToUpdateBoard">수정</v-btn>
          <!-- 삭제 버튼 -->
          <v-btn disabled small plain outlined class="mybutton" @click="deleteBoard">삭제</v-btn>
        </template>
        <!-- 로그인 안했을 때  -->
        <template v-else>
          <v-btn text icon color="pink" @click="addLike">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn class="mybutton" @click="goToUpdateBoard">수정</v-btn>
          <v-btn class="mybutton" @click="deleteBoard">삭제</v-btn>
        </template>
      </div>
      <div class="comment-title-box">댓글</div>

      <!-- 좋아요 버튼 -->
      <!-- <v-btn v-if="!userIdComment" disabled text icon color="pink"><v-icon>mdi-heart</v-icon></v-btn>

      <div v-if="updateCommentStatus === true">
        <input v-model="updateCommentContents" /> <button v-on:click="updateComment(commentId)">댓글 수정</button><button v-on:click="updateCommentToUnvisible">취소</button>
      </div> -->
      <!-- table-start -->
      <div class="comment-Id">아이디</div>
      <div class="comment-content">내용</div>
      <div class="comment-date">날짜</div>

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

      <!-- table-end -->
      <!-- comment button-start -->
      asdf<br />
      <br />
      <br />
      <br />
      <br />
      <div class="comment-content-box">
        <div class="comment-create-user">작성자 아이디</div>
        <input class="create-comment" v-model="commentContents" />

        <div class="comment-action-button">
          <div>
            <v-btn class="create-comment-button" x-small v-if="!this.userIdComment" disabled v-on:click="createComment()">댓글 작성</v-btn>
            <v-btn class="create-comment-button" x-small v-else v-on:click="createComment()">댓글 작성</v-btn>
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
.main-container {
  border: 1px solid black;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 75%;
}

.content-container {
  /* border: 1px solid black; */
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.boardTitle {
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
  border: 1px solid black;
  height: 30%;
  padding: 5px;
}

.bottom-content-box {
  border-bottom: 1px solid rgb(207, 215, 215);
  margin-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
}

.comment-title-box {
  margin-top: 10px;
  border-left: 1px solid rgb(207, 215, 215);
  border-right: 1px solid rgb(207, 215, 215);
  border-bottom: 1px solid rgb(207, 215, 215);
  font-size: larger;
  font-weight: 600;
}

.comment-Id {
  font-weight: 800;
  font-size: 15px;
}
.comment-content {
  font-weight: 500;
  font-size: 15px;
}
.comment-date {
  font-weight: 500;
  font-size: 12px;
  color: rgb(143, 142, 142);
}

.comment-content-box {
  border: 1px solid rgb(207, 215, 215);
  height: 15%;
  padding: 5px;
}

.comment-create-user {
  font-weight: 800;
  font-size: 15px;
}

.create-comment {
  width: 100%;
  padding-left: 7px;
}

.comment-action-button {
  border: 1px solid rgb(207, 215, 215);
  padding: 4px;
}

.create-comment-button {
  float: right;
}
</style>
