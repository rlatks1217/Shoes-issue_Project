<template>
  <div>
    <body>
      <template>
        <div class="form-container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-8">
              <div class="card">
                <div
                  class="card-header text-center"
                  style="background-color: rgb(237, 241, 214); color: black"
                >
                  정보수정
                </div>
                <div class="card-body d-flex">
                  <div class="form-left">
                    <form>
                      <div class="form-group">
                        <label for="userName">이름</label>
                        <input
                          type="text"
                          class="form-control"
                          id="userName"
                          v-model="userName"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="nickName">닉네임</label>
                        <input
                          type="text"
                          class="form-control"
                          id="nickName"
                          v-model="nickName"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="userId">이메일</label>
                        <input
                          type="email"
                          class="form-control"
                          id="userId"
                          v-model="userId"
                          disabled
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
                      <div class="form-group">
                        <label for="confirm-password">비밀번호 확인</label>
                        <input
                          type="password"
                          class="form-control"
                          id="confirm-password"
                          v-model="confirmPassword"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="phone">휴대폰번호</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="phone"
                          v-model.trim="phone"
                          pattern="[0-9]{11}"
                          required
                          title="핸드폰 번호를 정확히 입력해주세요."
                        />
                      </div>
                    </form>
                  </div>
                  <div class="form-right">
                    <form>
                      <div class="card-body">
                        <img
                          class="rounded-circle"
                          style="max-width: 200px; max-height: 200px"
                          :src="previewImage"
                        />
                        <input
                          id="uploadImg"
                          type="file"
                          class="form-control"
                          aria-describedby="inputGroupFileAddon04"
                          aria-label="Upload"
                          @change="onFileChange"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="card-body d-flex justify-content-between">
                  <div></div>
                  <div class="d-flex justify-content-between mb-3">
                    <button
                      @click.prevent="deleteUser()"
                      class="btn btn-primary"
                      style="
                        background-color: rgb(237, 241, 214);
                        color: black;
                        border-color: rgb(237, 241, 214);
                      "
                    >
                      아이디 삭제하기
                    </button>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <button
                      @click.prevent="updateUser()"
                      class="btn btn-primary"
                      style="
                        background-color: rgb(237, 241, 214);
                        color: black;
                        border-color: rgb(237, 241, 214);
                      "
                    >
                      내 정보 수정하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </body>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  data() {
    return {
      userId: sessionStorage.getItem("userId"),
      userName: sessionStorage.getItem("userName"),
      nickName: sessionStorage.getItem("nickName"),
      phone: sessionStorage.getItem("phone"),
      userPw: "",
      confirmPassword: "",
      imageUrl: "",
      previewImage: "",
      tradeImage: "",
      insertFlag: true,
      upatetFlag: false,
      imgFlag: false,
    };
  },
  methods: {
    updateUser: function () {
      let uploadFile = $("#uploadImg");
      let files = uploadFile[0].files;
      let formData = new FormData();

      if ($("input[type=file]").val() != "") {
        if (!this.checkExtension(files[0].name, files[0].size)) {
        return;
        }
      } else {
        alert("상품 사진을 첨부해주세요!");
        return;
      }

      if (
        !this.userName ||
        !this.nickName ||
        !this.userId ||
        !this.userPw ||
        !this.confirmPassword ||
        !this.phone ||
        !this.imageUrl
      ) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      const nameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;

      if (!nameRegex.test(this.userName)) {
        alert("이름은 영어 또는 한글만 입력 가능합니다.");
        return;
      }

      const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/; // 정규식

      if (!pwRegex.test(this.userPw)) {
        alert(
          "비밀번호는 최소 8자 이상, 숫자와 영문자를 모두 포함해야 합니다."
        );
        return;
      }

      if (this.userPw !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (isNaN(this.phone) || this.phone.toString().length !== 11) {
        alert("핸드폰 번호를 정확히 입력해주세요.");
        return;
      }

      formData.append("userName", this.userName);
      formData.append("nickName", this.nickName);
      formData.append("userId", this.userId);
      formData.append("userPw", this.userPw);
      formData.append("phone", this.phone);
      formData.append("imageUrl", files[0]);

      console.log(files);
      console.log(formData);
      console.log(formData.get("imageUrl"));

      this.$axios({
        url: `http://localhost:80/userProfile/${this.userId}`,
        method: "POST",
        data: formData,
        responseType: "json",
      })
        .then((response) => {
          // 성공적으로 처리된 경우
          console.log(this.userName);
          console.log(this.nickName);
          console.log(this.userId);
          console.log(this.userPw);
          console.log(this.phone);
          console.log(this.imageUrl);
          console.log(typeof this.imageUrl);
          console.log(response.data);
          this.mydataupdate();

          this.$router.push({ name: "landingPage" });
        })
        .catch((error) => {
          // 처리 중 에러가 발생한 경우
          console.log(error.response.data);
        });
    },

    checkExtension(fileName, fileSize) {
      let regex = /\.(jpg|jpeg|png|gif|bmp)$/i;
      let maxSize = 15242880;

      if (fileSize > maxSize) {
        alert("파일 크기는 5MB 이하이어야 합니다.");
        return false;
      } else if (!regex.test(fileName)) {
        alert("허용되지 않는 확장자입니다. (jpg, jpeg, png, gif, bmp)");
        return false;
      } else {
        this.imageUrl = $("#uploadImg")[0].files[0];
        return true;
      }
    },

    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        this.previewImage = event.target.result;
      };

      reader.readAsDataURL(file);
    },

    mydataupdate() {
      // axios를 사용하여 이메일과 비밀번호를 Spring 백엔드에 전달
      this.$axios
        .post(
          "http://localhost:80/oauth/login",
          {
            userId: this.userId,
            userPw: this.userPw,
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
                        
            window.location.href = "http://localhost:8080/";
          } else {
            // 로그인 실패 처리 로직
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
        })
        .catch((error) => {
          console.error(error);
        });
    },

    deleteUser: function () {
      if (confirm("정말로 사용자 정보를 삭제하시겠습니까?")) {
        axios
          .delete(`http://localhost:80/user/${this.userId}`, {
            data: {
              userId: this.userId,
            },
          })
          .then((response) => {
            // 성공적으로 처리된 경우
            console.log(response.data);
            sessionStorage.clear();
            window.location.href = "http://localhost:8080/";
          })
          .catch((error) => {
            // 처리 중 에러가 발생한 경우
            console.log(error.response.data);
          });
      }
    },
  },
};
</script>

<style>
.form-left {
  flex: 1;
}

.form-right {
  flex: 1;
}
</style>
