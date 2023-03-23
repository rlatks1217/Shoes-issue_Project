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
    <tr v-for="(tradeBoard, i) in list" v-bind:key="tradeBoard.tradeId" style="font-weight : bolder;">
      <td>{{i+1}}</td>
      <td>{{tradeBoard.goodsCategory}}</td>
      <td><img v-bind:src="tradeBoard.tradeImage" style="width: 35px; height: 35px;" /></td>
      
      <td><a href="#" v-on:click="tradeBoardDetail(tradeBoard.tradeId, tradeBoard.userId)"
      style="font-weight: bolder; font-size: larger;">{{tradeBoard.tradeTitle}}</a></td>
      <td :style="tradeBoard.statusStyle">{{tradeBoard.tradeStatus}}</td>
      <td>{{tradeBoard.nickName}}</td>
      <td>{{tradeBoard.tradeLike}}</td>
      <td>{{tradeBoard.tradeUpdateDate == null ? tradeBoard.tradeDate : tradeBoard.tradeUpdateDate}}</td>
    </tr>
  </tbody>
</table>
    <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination pagination-lg">
      <li class="page-item" v-on:click="prevClick()" v-if="page.prev">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="value in page.buttonCount" v-bind:key="value+10000">
        <a class="page-link" href="#" v-on:click="clickPage(value)" >{{value}}</a>
        </li>
      <li class="page-item" v-if="page.next">
        <a class="page-link" href="#" aria-label="Next" v-on:click="nextClick()" v-if="page.next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
  </ul>
</nav>
  </div>
</template>
<script>
import eventBus from '../eventBus.js';
import $ from 'jquery';
  export default {
    data() {
      return {
        list : this.$store.state.list,
        page : this.$store.state.page,
        currentPage : this.$store.state.page.page,
        currentClickPageButton : ''
      }
    },
    methods : {
      tradeBoardWrite : function() {
      if (sessionStorage.getItem('userId') != undefined) {
        this.$router.push({ name: "tradeBoardWrite" });
      }else {
        alert('로그인을 해주세요!');
        this.$router.push({ name: "userLogin" });
      }
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

          }else {
            resultData.deleteFlag = true;
            resultData.updateFlag = true;
          }

          if (resultData.tradeStatus === '거래중') {
            resultData.reserveCancelFlag = true;
          }else {
            resultData.reserveCancelFlag = false;
          }
          
          this.$store.state.detail = resultData;
          this.$router.push({ name: "tradeBoardDetail" });
        }.bind(this));
      },
      nextClick() {
        this.currentPage += 1;
      },
      prevClick() {
        this.currentPage -= 1; 
      },
      clickPage(currentPage) {
        this.pagiNation(currentPage);
      },
      pagiNation(selectPage) {
        if (selectPage == this.page.buttonCount.length && typeof this.page.keyword === 'undefined'){ //제목으로 검색 안했으면서 마지막 페이지 번호일 경우
          this.$axios({
            url: "http://localhost/trade-board/all",
            method: "GET",
            responseType: "json",
            params : {
              page : selectPage,
              recordSize :this.page.remainBoardCount
            }
          }).then(function (result) {
            let tradeBoard = result.data;
            console.log(tradeBoard);
            this.list = tradeBoard[0];
            this.page = tradeBoard[1];
          }.bind(this));
        } else if (typeof this.page.keyword !== 'undefined') {
          let category = $('#category').val();
          let keyword = this.$store.state.page.keyword;
          console.log(keyword);
          this.$axios({
          url: "http://localhost/trade-board/title",
          method: "GET",
          responseType: "json",
          params : {
            keyword : keyword,
            category : category
          }
        }).then(function(result) {
            let tradeBoard =result.data;
            this.list = tradeBoard[0];
            this.page = tradeBoard[1];
        }.bind(this));
        } else {
                    this.$axios({
            url: "http://localhost/trade-board/all",
            method: "GET",
            responseType: "json",
            params : {
              page : selectPage
            }
          }).then(function (result) {
            let tradeBoard = result.data;

            this.list = tradeBoard[0];
            this.page = tradeBoard[1];
          }.bind(this));
        }
      }
    },
    created() {
      //이 컴포넌트가 떠있는 상태에서 검색했을 때
      eventBus.$on('selectTradeBoardTitle', function(tradeBoard) {
        this.list = tradeBoard[0];
        this.page = tradeBoard[1];
      }.bind(this));
      
    },
    watch : {
      currentPage (selectPage) {
        console.log(this.page.buttonCount.length,'잘 호출됨~~~');
        this.pagiNation(selectPage);
      },
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
.current {
  background-color: skyblue;
}
</style>
