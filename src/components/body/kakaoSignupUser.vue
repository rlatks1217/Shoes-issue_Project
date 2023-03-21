<template>
  <div>
    <body>
      <template>
        <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-8">
              <div class="card">
                <div
                  class="card-header text-center"
                  style="background-color: rgb(237, 241, 214); color: black"
                >
                  회원가입
                </div>
                <div class="card-body">
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
                    <br />
                    <v-combobox
                      v-model="selectedShoes1"
                      :items="shoes1"
                      label="첫번째 선호하는 신발"
                    ></v-combobox>
                    <v-combobox
                      v-model="selectedShoes2"
                      :items="shoes1.filter((shoe) => shoe !== selectedShoes1)"
                      label="두번째 선호하는 신발"
                    ></v-combobox>
                    <v-combobox
                      v-model="selectedShoes3"
                      :items="
                        shoes1.filter(
                          (shoe) =>
                            shoe !== selectedShoes1 && shoe !== selectedShoes2
                        )
                      "
                      label="세번째 선호하는 신발"
                    ></v-combobox>
                    <br />
                    <button
                      @click.prevent="signup()"
                      class="btn btn-primary btn-block mx-auto d-block"
                      style="
                        background-color: rgb(237, 241, 214);
                        color: black;
                        border-color: rgb(237, 241, 214);
                      "
                    >
                      가입
                    </button>
                  </form>
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

export default {
  data() {
    return {
      userName: "",
      nickName: "",
      userId: sessionStorage.getItem("userId"),
      userPw: "",
      confirmPassword: "",
      phone: "",
      selectedShoes: null,
      selectedShoes1: "",
      selectedShoes2: "",
      selectedShoes3: "",
      shoes1: [
        "운동화/런닝화",
        "스니커즈/캐주얼화",
        "샌들/슬리퍼",
        "구두",
        "워커/부츠",
      ],
    };
  },
  methods: {
    signup: function () {
      if (
        !this.userName ||
        !this.nickName ||
        !this.userId ||
        !this.userPw ||
        !this.confirmPassword ||
        !this.phone ||
        !this.selectedShoes1 ||
        !this.selectedShoes2 ||
        !this.selectedShoes3
      ) {
        alert("모든 항목을 입력해주세요.");
        return;
      }
      const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/; // 정규식

      const nameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;

      if (!nameRegex.test(this.userName)) {
        alert("이름은 영어 또는 한글만 입력 가능합니다.");
        return;
      }

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

      if (
        this.selectedShoes1 == this.selectedShoes2 ||
        this.selectedShoes2 == this.selectedShoes3 ||
        this.selectedShoes1 == this.selectedShoes3
      ) {
        alert("선호하는 신발 선택이 겹칩니다.");
        return;
      }
      axios
        .post("http://localhost:80/user", {
          userName: this.userName,
          nickName: this.nickName,
          userId: this.userId,
          userPw: this.userPw,
          phone: this.phone,
          preference1: this.selectedShoes1,
          preference2: this.selectedShoes2,
          preference3: this.selectedShoes3,
        })
        .then((response) => {
          // 성공적으로 처리된 경우
          alert("회원가입이 완료되었습니다.");
          console.log(response.data);
          sessionStorage.clear();
          window.location.href = "http://localhost:8080/";
        })
        .catch((error) => {
          // 처리 중 에러가 발생한 경우
          alert("존재하는 아이디입니다.");
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style></style>
