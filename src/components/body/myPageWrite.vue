<template>
  <div>
    <div class="bodyTitle">
      <div class="mypagewrite">내가 작성한 게시판</div>
      <div class="mypagewriteDescription">뭘쓴거지</div>
    </div>
    <table class="table">
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
        <!--  -->
        <tr v-for="(board, i) in boards" :key="i">
          <th>{{ i + 1 }}</th>
          <th v-on:click="boardDescription(board.boardId)">
            {{ board.boardTitle }}
          </th>
          <th>{{ board.userId }}</th>
          <th>{{ board.boardDate }}</th>
          <th>{{ board.boardLike }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boards: '',
    };
  },
};
</script>

<style></style>
