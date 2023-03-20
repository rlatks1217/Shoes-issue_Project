<template>
  <div class="board-detail">
    <div class="board-header">
      <h1 class="board-title">제목: {{ board.boardTitle }}</h1>
      <div class="board-meta">
        <div class="board-author">작성자: {{ board.userId }}</div>
        <div class="board-date">작성일: {{ board.boardDate }}</div>
      </div>
    </div>
    <div class="board-content">
      <div class="board-text">{{ board.boardContents }}</div>
    </div>
    <div id="board-button">
      {{ like }}
      <button class="mybutton" @click="toggleLike">
        {{ likeStatus ? '좋아요 취소' : '좋아요' }}
      </button>
      <button class="mybutton" @click="goToUpdateBoard">수정</button>
      <button class="mybutton" @click="deleteBoard">삭제</button>
    </div>
    php Copy code
    <h3>댓글</h3>
    <div v-if="showUpdateComment">
      <input v-model="commentToUpdate.contents" />
      <button v-on:click="updateComment(commentToUpdate)">댓글 수정</button>
      <button v-on:click="cancelUpdateComment">취소</button>
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
          <td class="commentUpdate" @click="startUpdateComment(comment)">수정</td>
          <td class="commentDelete" @click="deleteComment(comment)">삭제</td>
        </tr>
      </tbody>
    </table>
    <div>
      <input class="create-comment" v-model="newComment.contents" />
      <button class="create-comment-button" v-on:click="createComment()">댓글 작성</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      board: {},
      comments: [],
      like: 0,
      likeStatus: false,
      newComment: { contents: '' },
      commentToUpdate: { id: null, contents: '' },
      showUpdateComment: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const boardId = this.$store.state.boardId;
      this.$store.dispatch('fetchBoardDetail', boardId).then(data => {
        this.board = data;
        this.like = data.boardLike;
        this.likeStatus = data.isLiked;
        this.comments = data.comments;
      });
    },
    toggleLike() {
      const boardId = this.board.boardId;
      const userId = sessionStorage.getItem('userId');
      const action = this.likeStatus ? 'unlike' : 'like';
      this.$store
        .dispatch(action, { boardId, userId })
        .then(data => {
          this.like = data.boardLike;
          this.likeStatus = data.isLiked;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 게시글 삭제
    deleteBoard() {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return;
      }
      const boardId = this.board.boardId;
      const userId = 'admin';

      //  dispatch() 메서드를 사용하여 Vuex store에 있는 action을 호출
      this.$store
        .dispatch('deleteBoard', { boardId, userId })
        .then(() => {
          this.$router.push({ name: 'communityBoard' });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 게시글 수정 페이지로 이동하기
    goToUpdateBoard() {
      const boardId = this.board.boardId;
      this.$router.push({ name: 'communityBoardUpdate', params: { boardId } });
    },
    startUpdateComment(comment) {
      this.commentToUpdate.id = comment.commentId;
      this.commentToUpdate.contents = comment.commentContents;
      this.showUpdateComment = true;
    },
    cancelUpdateComment() {
      this.commentToUpdate.id = null;
      this.commentToUpdate.contents = '';
      this.showUpdateComment = false;
    },
    updateComment(commentToUpdate) {
      const userId = sessionStorage.getItem('userId');
      const boardId = this.board.boardId;
      const commentId = commentToUpdate.id;
      const commentContents = commentToUpdate.contents;
      this.$store
        .dispatch('updateComment', {
          userId,
          boardId,
          commentId,
          commentContents,
        })
        .then(() => {
          this.fetchData();
          this.cancelUpdateComment();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteComment(comment) {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return;
      }
      const userId = sessionStorage.getItem('userId');
      const boardId = this.board.boardId;
      const commentId = comment.commentId;
      this.$store
        .dispatch('deleteComment', { userId, boardId, commentId })
        .then(() => {
          this.fetchData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    createComment() {
      const userId = sessionStorage.getItem('userId');
      const boardId = this.board.boardId;
      const commentContents = this.newComment.contents;
      this.$store
        .dispatch('createComment', { userId, boardId, commentContents })
        .then(() => {
          this.newComment.contents = '';
          this.fetchData();
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.board-detail {
  width: 80%;
  margin: auto;
  margin-top: 2rem;
}

.board-header {
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.board-title {
  font-size: 2rem;
}

.board-meta {
  display: flex;
  font-size: 1rem;
}

.board-meta > * {
  margin-right: 1rem;
}

.board-content {
  margin-bottom: 1rem;
}

.board-text {
  font-size: 1.5rem;
}

.commentContent {
  width: 50%;
  word-break: break-all;
}

.commentMember {
  width: 10%;
}

.commentDate {
  width: 15%;
}

.commentUpdate {
  cursor: pointer;
  color: blue;
  width: 10%;
}

.commentDelete {
  cursor: pointer;
  color: red;
  width: 10%;
}

.create-comment {
  width: 50%;
}

.create-comment-button {
  margin-left: 1rem;
}
</style>
<!--
  - Vuex를 사용하여 코드의 중복을 줄이고, 코드의 가독성을 높이고, 유지보수성을 높일 수 있습니다.
  - 가독성을 높이기 위해, 변수나 함수 이름을 명확하게 작성합니다.
  - Vue의 생명주기(created)에서 데이터를 가져오는 것은 별도의 함수(fetchData)로 분리하여 코드의 가독성을 높입니다.
  - Vuex의 actions를 사용하여 API 호출과 같은 비동기 로직을 분리하고, 코드의 가독성을 높입니다.
  - Vuex의 mutations를 사용하여 상태를 변경합니다.
  - Vuex의 getters를 사용하여 컴포넌트에서 데이터를 가져오는 로직을 간단하게 작성합니다.
-->
