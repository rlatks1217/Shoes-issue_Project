<template>
  <div class="container" style="">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div
            class="card-header text-center"
            style="background-color: rgb(237, 241, 214); color: black"
          >
            로그인을 해주세요
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="userId">이메일</label>
                <input
                  type="email"
                  class="form-control"
                  id="userId"
                  v-model="userId"
                  required
                />
              </div>
              <div class="form-group">
                <label for="userPw">비밀번호</label>
                <input
                  type="password"
                  class="form-control"
                  id="userPw"
                  v-model="userPw"
                  required
                />
              </div>
              <br />
              <button
                @click.prevent="example"
                class="btn btn-primary btn-block mx-auto d-block"
                style="
                  background-color: rgb(237, 241, 214);
                  color: black;
                  border-color: rgb(237, 241, 214);
                "
              >
                로그인
              </button>
            </form>
            <br />
            <button
              @click.prevent="kakaoLoginBtn"
              class="btn btn-primary btn-block mx-auto d-block"
              style="
                background-color: yellow;
                color: black;
                border-color: yellow;
              "
            >
              카카오 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userId: "",
      userPw: "",
      userInfo: null,
    };
  },

  methods: {
    example: function () {
      // axios를 사용하여 이메일과 비밀번호를 Spring 백엔드에 전달
      this.$axios
        .post(
          "http://localhost:80/oauth/login",
          {
            userId: this.userId,
            userPw: this.userPw,
            // userId: "admin@admin",
            // userPw: "admin1234!@",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // 인증 토큰을 보내도록 설정
          }
        )
        .then((response) => {
          // 응답 처리 로직
          const loginId = response.data;
          if (loginId.success) {
            console.log(loginId);
            const accessToken = loginId.Authorization;
            const refreshToken = loginId.RefreshTokenIdx;
            const success = loginId.success;
            console.log(`Access Token: ${accessToken}`);
            console.log(`Refresh Token: ${refreshToken}`);
            console.log(`Refresh Token: ${success}`);
            // loginId 값을 data에 저장
            this.loginId = loginId.success;

            // myPage 함수 호출
            this.userInformation();
          } else {
            // 로그인 실패 처리 로직
            alert("로그인 아이디와 비밀번호를 확인해주세요.");
            console.log("로그인 실패");
          }
        })
        .catch((error) => {
          // 오류 처리 로직
          console.log(error);
        });
    },

    userInformation: function () {
      const userId = this.loginId; // 사용자 ID
      axios
        .post(`http://localhost:80/user/${userId}`)
        .then((response) => {
          const user = response.data; // 서버에서 반환한 사용자 정보
          console.log(user);

          // session에 데이터 저장
          sessionStorage.setItem("userId", user.userId);
          sessionStorage.setItem("userName", user.userName);
          sessionStorage.setItem("nickName", user.nickName);
          sessionStorage.setItem("signupDate", user.signupDate);
          sessionStorage.setItem("updateDate", user.updateDate);
          sessionStorage.setItem("deleteDate", user.deleteDate);
          sessionStorage.setItem("adminStatus", user.adminStatus);
          sessionStorage.setItem("point", user.point);
          sessionStorage.setItem("profileImage", user.profileImage);
          sessionStorage.setItem("phone", user.phone);
          sessionStorage.setItem("reportCount", user.reportCount);
          sessionStorage.setItem("reportDate", user.reportDate);

          window.location.href = "http://localhost:8080/";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    pagereload() {
      this.$router.push({ name: "landingPage" });
    },

    kakaoLoginBtn() {
      window.Kakao.init("02b66ed6a1751e67fc23906e2f11b995"); // Kakao Developers에서 요약 정보 -> JavaScript 키
      console.log(window.Kakao);
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: this.getKakaoAccount,
      });
    },

    kakaopagereload() {
      this.$router.push({ name: "kakaoSignupUser" });
    },

    getKakaoAccount() {
      window.Kakao.Auth.login({
        success: () => {
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              const kakao_account = res.kakao_account;
              const nickname = kakao_account.nickname;
              const email = kakao_account.email;
              sessionStorage.setItem("userId", email);
              console.log("nickname", nickname);
              console.log("email", email);
              console.log("성공2");
              alert("카카오 로그인이 완료되었습니다. 나머지 가입도 완료해주세요");
              this.kakaopagereload();
            },
            fail: (error) => {
              console.log(error);
              console.log("에러2");
            },
          });
        },
        fail: (error) => {
          console.log(error);
          console.log("최종에러");
        },
      });
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0px 0px 10px 1px #ccc;
}
</style>