<template>
  <div>
    <div class="bodyTitle">
      <div class="communityBoardTitle">중고거래 게시판</div>
      <div class="communityBoardDescription">
        신발에 관한 이야기라면 어떤 이야기라도 좋아요! 함께 이야기해요
      </div>
    </div>
    <button class="writeButton" v-on:click="tradeBoardWrite()">글쓰기</button>
    <table class="table">
  <thead class="table-light">
  </thead>
  <tbody>
    <!-- <tr><td>{{$route.params.name}}</td></tr> -->
    <tr v-for="(tradeBoard, i) in list" v-bind:key="i" style="font-weight : bolder;">
       <!-- v-on:click="tradeBoardDetail" -->
      <td>{{i+1}}</td>
      <td>{{tradeBoard.goodsCategory}}</td>
      <td><img v-bind:src="tradeBoard.tradeImage" style="width: 35px; height: 35px;" /></td>
      
      <td><a href="#" v-on:click="tradeBoardDetail(tradeBoard.tradeId, tradeBoard.userId)"
      style="font-weight: bolder; font-size: larger;">{{tradeBoard.tradeTitle}}</a></td>

      <td>{{tradeBoard.userId}}</td>
      <td>{{tradeBoard.tradeLike}}</td>
      <td>{{tradeBoard.tradeUpdateDate == null ? tradeBoard.tradeDate : tradeBoard.tradeUpdateDate}}</td>
    </tr>
  </tbody>
</table>

  </div>
</template>
<script>
import eventBus from '../eventBus.js';
  export default {
    data() {
      return {
        list : this.$store.state.list
      }
    },
    methods : {
      tradeBoardWrite : function() {
        this.$router.push({ name: "tradeBoardWrite" });
      },
      tradeBoardDetail : function(tradeId, userId) {
        this.$axios({
          url : 'http://localhost/trade-board/' + tradeId +"/" + userId,
          method : 'GET',
          responseType : 'json'
        }).then(function(tradeBoardDetail){
          console.log(tradeBoardDetail.data);
          let resultData = tradeBoardDetail.data;

          //레벨 나타내기
          if (resultData <= 10) {
            resultData.point = 1;
          }else if (resultData <= 50){
            resultData.point = 2;
          }else if (resultData <= 100) {
            resultData.point = 3;
          }else if (resultData <= 500) {
            resultData.point = 4;
          }else if (resultData <= 1000) {
            resultData.point = 5;
          }else {
            resultData.point = 6;
          }
          resultData.userId = userId;
          console.log(resultData.userId);
          if (userId !== sessionStorage.getItem('userId')) {
            //삭제버튼/수정버튼 여부
            resultData.deleteFlag = false;
            resultData.updateFlag = false;
            resultData.reserveFlag = false;

          }else {
            resultData.deleteFlag = true;
            resultData.updateFlag = true;
            resultData.reserveFlag = true;
          }

          if (resultData.tradeStatus === '예약중') {
            resultData.reserveCancelFlag = true;
          }else {
            resultData.reserveCancelFlag = false;
          }
          
          this.$store.state.detail = resultData;
          this.$router.push({ name: "tradeBoardDetail" });
        }.bind(this));
      }
    },
    created() {
      //이 컴포넌트가 떠있는 상태에서 검색했을 때
      eventBus.$on('selectTradeBoardTitle', function(tradeBoard) {
        this.list = tradeBoard;
      }.bind(this));
    }

  }
</script>
<style>
.writeButton {
  background-color: #4CAF50; /* 배경색 */
  border: none; /* 테두리 없음 */
  color: white; /* 글자색 */
  padding: 12px 24px; /* 안쪽 여백 */
  text-align: center; /* 가운데 정렬 */
  text-decoration: none; /* 밑줄 없음 */
  display: inline-block; /* 인라인 요소로 설정 */
  font-size: 16px; /* 글자 크기 */
  margin: 4px 2px; /* 바깥쪽 여백 */
  cursor: pointer; /* 마우스 커서 모양 변경 */
  border-radius: 50px; /* 둥근 모서리 */
  transition-duration: 0.4s; /* 애니메이션 속도 */
  float: right;
}

.writeButton:hover {
  background-color: #3e8e41; /* 마우스를 올리면 배경색 변경 */
  color: white; /* 글자색 변경 */
}
</style>
