<template>
  <div>
    <body>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="card">
              <div
                class="card-header text-center"
                style="background-color: rgb(237, 241, 214); color: black"
              >
                마이 페이지
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="userid">이메일</label>
                      <input
                        type="text"
                        class="form-control"
                        id="userid"
                        :value="loginId"
                        disabled
                      />
                    </div>
                    <br />
                    <div class="form-group">
                      <label for="nickname">닉네임</label>
                      <input
                        type="text"
                        class="form-control"
                        id="nickname"
                        :value="printnickname"
                        disabled
                      />
                    </div>
                    <br />
                    <div class="form-group">
                      <label for="point">포인트</label>
                      <input
                        type="text"
                        class="form-control"
                        id="point"
                        :value="printpoint"
                        disabled
                      />
                    </div>
                    <br />
                    <div class="trade-buttons">
                      <v-btn
                        type="submit"
                        class="btn btn-primary btn-block mx-auto d-block"
                        style="
                          background-color: rgb(237, 241, 214);
                          color: black;
                          border-color: rgb(237, 241, 214);
                        "
                        v-on:click="tradeBoardLike()"
                      >
                        중고거래 좋아요한 게시글
                      </v-btn>
                    </div>
                    <br />
                    <div class="trade-buttons">
                      <v-btn
                        type="submit"
                        class="btn btn-primary btn-block mx-auto d-block"
                        style="
                          background-color: rgb(237, 241, 214);
                          color: black;
                          border-color: rgb(237, 241, 214);
                        "
                        v-on:click="tradeBoardWrite()"
                      >
                        중고거래 작성한 게시글
                      </v-btn>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="profile-image"></label>
                      <div class="d-flex justify-content-center">
                        <img
                          alt="프로필 이미지"
                          class="rounded-circle"
                          style="max-width: 200px; max-height: 200px"
                          :src="'/images/profile/' + profileImage"
                        />
                      </div>
                    </div>
                    <br />
                    <ul>
                      <v-btn
                        type="submit"
                        class="btn btn-primary btn-block mx-auto d-block"
                        style="
                          background-color: rgb(237, 241, 214);
                          color: black;
                          border-color: rgb(237, 241, 214);
                        "
                        @click="messageCheck"
                      >
                        쪽지 확인
                      </v-btn>
                      <br>
                      <v-btn class="btn btn-primary btn-block mx-auto d-block writebutton" 
                      style="
                          background-color: rgb(237, 241, 214);
                          color: black;
                          border-color: rgb(237, 241, 214);
                        " @click="goToGame">게임 이동!!</v-btn>
                    </ul>
                  </div>
                </div>
                <br />

                <v-btn
                  v-on:click="informupdate()"
                  class="btn btn-primary btn-block mx-auto d-block"
                  style="
                    background-color: rgb(237, 241, 214);
                    color: black;
                    border-color: rgb(237, 241, 214);
                  "
                >
                  정보수정
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
// import axios from "axios";
import eventBus from '../eventBus.js';

export default {
  data() {
    return {
      userid: "",
      nickname: "",
      point: "",
      handleImageUpload: "",
      change: "",
      selectedFile: null,
      previewUrl: null,
      tradeBoard: "",
    };
  },
  methods: {
    goToGame: function () {
      this.$router.push({ name: 'gamePage' });
    },
    messageCheck: function () {
      this.$router.push({ name: "messageReceive" });
    },
    informupdate: function () {
      this.$router.push({ name: "updateUser" });
    },
    mypagecommunitylike: function () {
      this.$router.push({ name: "communityBoard" });
    },
    mypagetradelike: function () {
      this.tradeBoardLike();
    },

    mypagetradewrite: function () {
      this.tradeBoardWrite();
    },

    tradeBoardWrite: function () {
        this.$axios({
          url: "http://localhost/user/tradeBoardWrite",
          method: "GET",
          responseType: "json",
          params: { userId : sessionStorage.getItem('userId')}
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
       tradeBoardLike: function () {
        this.$axios({
          url: "http://localhost//user/tradeBoardLike",
          method: "GET",
          responseType: "json",
          params: { userId : sessionStorage.getItem('userId')}
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
  },
  computed: {
    loginId() {
      return sessionStorage.getItem("userId");
    },
    printnickname() {
      return sessionStorage.getItem("nickName");
    },
    printpoint() {
      return sessionStorage.getItem("point");
    },
    profileImage() {
      return sessionStorage.getItem("profileImage");
    },
  },
};
</script>

<style>
.trade-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.community-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1;
}
</style>
