<template>
    <div>
      <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: rgb(237, 241, 214)">
          <div class="container-fluid">
            <a v-on:click="landingPage" class="navbar-brand" href="#"><img class="logo" src="/images/shoes.png" alt="" /></a>
            <table>
              <tr>
                <td class="ms-auto" style="margin-left: auto">
                  <ul class="navbar-nav ms-auto flex-wrap nowrap mb-2 mb-lg-0 me-3 member">
                    <li class="nav-member">
                      <a v-if="!nickName" v-on:click="signup()" class="nav-link active" aria-current="page" href="#" style="font-size: 15px">회원가입</a>
                    </li>
                    <li class="nav-member">
                      <a v-if="!nickName" class="nav-link active" v-on:click="login" aria-current="page" href="#" style="font-size: 15px">로그인</a>
                    </li>
                    <li class="nav-member">
                      <a v-if="nickName" class="nav-link active" v-on:click="logout()" aria-current="page" href="#" style="font-size: 15px">로그아웃</a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <ul class="navbar-nav ms-auto flex-wrap nowrap mb-2 mb-lg-0 me-3">
                    <li class="nav-item">
                      <a v-on:click="tradeBoard" class="nav-link active" aria-current="page" href="#" style="font-size: 20px">중고거래</a>
                    </li>
                    <li class="nav-item">
                      <a v-on:click="communityBoard()" class="nav-link active" aria-current="page" href="#" style="font-size: 20px">자유게시판</a>
                    </li>
                  </ul>
                </td>
                <td>
                  <form class="d-flex me-3" role="search">
                    <a v-if="nickName" class="btn btn-outline-success button" type="submit" style="height: 40px; font-size: 16px"><img src="/images/nomessage.png" alt="" style="height: 20px" /></a>
                  </form>
                </td>
                <td>
                  <form class="d-flex me-3" role="search">
                    <a v-if="nickName" class="btn btn-outline-success button" type="submit" style="height: 40px; font-size: 16px" v-on:click="myPage()"
                      ><img src="/images/mypage.png" alt="" style="height: 20px"
                    /></a>
                  </form>
                </td>
                <td>
                  <div class="input-group">
                    <input
                      class="form-control"
                      type="search"
                      placeholder="검색어를 입력하세요"
                      aria-label="Search"
                      style="height: 40px; font-size: 16px"
                      v-on:keyup="searchTradeBoardEnter($event)"
                      v-model="keyword"
                    />
                    <button class="btn btn-outline-success" type="submit" style="height: 40px; font-size: 16px" v-on:click="searchTradeBoardClick()">
                      <img src="/images/readingGlasses.png" alt="" style="height: 20px" />
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </nav>
      </header>
    </div>
  </template>
  <script>
  import eventBus from '../eventBus.js';
  import $ from 'jquery';
  export default {
    data() {
      return {
        userId: sessionStorage.getItem('userId'),
        nickName: sessionStorage.getItem('nickName'),
        keyword: '',
      };
    },
    methods: {
      login: function () {
        this.$router.push({ name: "userLogin" });
      },
      logout: function () {
        sessionStorage.clear();
        this.userId = null;
        this.nickName = null;
        window.location.href = 'http://localhost:8080/';
      },
  
      signup: function () {
        this.$router.push({ name: "signupUser" });
      },
      landingPage: function () {
        this.$router.push({ name: "landingPage" });
      },
      tradeBoard: function () {
        this.$axios({
          url: "http://localhost/trade-board/all",
          method: "GET",
          responseType: "json",
        }).then(
          function (result) {
          if (this.$router.currentRoute.name !== "tradeBoard") {
              console.log(result.data[1]);
              this.$store.state.list = result.data[0];
              this.$store.state.page = result.data[1];
              this.$router.push({ name: "tradeBoard" });
            } else {
              eventBus.$emit("selectTradeBoardTitle", result.data);
            }
            this.keyword = "";
          }.bind(this)
        );
      },
      searchTradeBoardEnter: function (event) {
        let category = $('#category').val();
        let keyword = this.keyword;
        if (event.keyCode === 13) {
          this.$axios({
            url: "http://localhost/trade-board/title",
            method: "GET",
            responseType: "json",
            params : {
              keyword : keyword,
              category : category
            }
          }).then(
            function (tradeBoard) {
              if (this.$router.currentRoute.name !== "tradeBoard") {
                console.log(tradeBoard.data[1]);
                this.$store.state.list = tradeBoard.data[0];
                this.$store.state.page = tradeBoard.data[1];
                this.$router.push({ name: "tradeBoard" });
              } else {
                eventBus.$emit("selectTradeBoardTitle", tradeBoard.data);
              }
  
              this.keyword = "";
            }.bind(this)
          );
        }
      },
      searchTradeBoardClick: function () {
        let category = $('#category').val();
        let keyword = this.keyword;
        this.$axios({
          url: "http://localhost/trade-board/title",
          method: "GET",
          responseType: "json",
          params : {
            keyword : keyword,
            category : category
          }
        }).then(
          function (result) {
            if (this.$router.currentRoute.name !== "tradeBoard") {
              this.$store.state.list = result.data[0];
              this.$store.state.page = result.data[1];
              this.$router.push({ name: "tradeBoard" });
            } else {
              eventBus.$emit("selectTradeBoardTitle", result.data);
            }
  
            this.keyword = "";
          }.bind(this)
        );
      },
      communityBoard: function () {
        this.$router.push({ name: "communityBoard" });
      },
      myPage: function () {
        this.$router.push({ name: "myPage" });
      },
    },
    computed: {
      loginId() {
        return sessionStorage.getItem("userId");
      },
      loginName() {
        return sessionStorage.getItem('nickName');
      },
    },
  };
  </script>
    <style>
  .button {
    border-color: transparent;
  }
  .logo {
    width: 250px;
  }
  </style>
