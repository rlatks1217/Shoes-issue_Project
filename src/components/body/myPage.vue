<template>
  <div>
    <body>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="card">
              <div class="card-header text-center" style="background-color: rgb(237, 241, 214); color: black">마이 페이지</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="userid">이메일</label>
                      <input type="text" class="form-control" id="userid" :value="loginId" disabled />
                    </div>
                    <br />
                    <div class="form-group">
                      <label for="nickname">닉네임</label>
                      <input type="text" class="form-control" id="nickname" :value="printnickname" disabled />
                    </div>
                    <br />
                    <div class="form-group">
                      <label for="point">포인트</label>
                      <input type="text" class="form-control" id="point" :value="printpoint" disabled />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="profile-image"></label>
                      <div class="d-flex justify-content-center">
                        <img alt="프로필 이미지" class="rounded-circle" style="max-width: 200px; max-height: 200px" :src="'/images/profile/' + profileImage" />
                      </div>
                    </div>
                    <br />
                    <ul>
                      <button
                        type="submit"
                        class="btn btn-primary btn-block mx-auto d-block"
                        style="background-color: rgb(237, 241, 214); color: black; border-color: rgb(237, 241, 214)"
                        @click="messageCheck"
                      >
                        쪽지 확인</button
                      ><br />
                      <button
                        type="submit"
                        class="btn btn-primary btn-block mx-auto d-block"
                        style="background-color: rgb(237, 241, 214); color: black; border-color: rgb(237, 241, 214)"
                        v-on:click="mypagelike()"
                      >
                        내가 좋아요한 게시글</button
                      ><br />
                      <button
                        type="submit"
                        class="btn btn-primary btn-block mx-auto d-block"
                        style="background-color: rgb(237, 241, 214); color: black; border-color: rgb(237, 241, 214)"
                        v-on:click="mypagewrite()"
                      >
                        내가 작성한 게시글
                      </button>
                    </ul>
                  </div>
                </div>
                <br />

                <button v-on:click="informupdate()" class="btn btn-primary btn-block mx-auto d-block" style="background-color: rgb(237, 241, 214); color: black; border-color: rgb(237, 241, 214)">
                  정보수정
                </button>
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

export default {
  data() {
    return {
      userid: '',
      nickname: '',
      point: '',
      handleImageUpload: '',
      change: '',
      selectedFile: null,
      previewUrl: null,
    };
  },
  methods: {
    messageCheck: function () {
      this.$router.push({ name: 'messageSend' });
    },
    informupdate: function () {
      this.$router.push({ name: 'updateUser' });
    },
    mypagelike: function () {
      this.$router.push({ name: 'myPageLike' });
    },
    mypagewrite: function () {
      this.$router.push({ name: 'myPageWrite' });
    },
  },
  computed: {
    loginId() {
      return sessionStorage.getItem('userId');
    },
    printnickname() {
      return sessionStorage.getItem('nickName');
    },
    printpoint() {
      return sessionStorage.getItem('point');
    },
    profileImage() {
      return sessionStorage.getItem('profileImage');
    },
  },
};
</script>

<style></style>
