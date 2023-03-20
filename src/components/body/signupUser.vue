<template>
  <div>
    <body>
      <template>
        <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header text-center" style="background-color: rgb(237, 241, 214); color: black">회원가입</div>
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <label for="userName">이름</label>
                      <input type="text" class="form-control" id="userName" v-model="userName" required />
                    </div>
                    <div class="form-group">
                      <label for="nickName">닉네임</label>
                      <input type="text" class="form-control" id="nickName" v-model="nickName" required />
                    </div>
                    <div class="form-group">
                      <label for="userId">이메일</label>
                      <input type="email" class="form-control" id="userId" v-model="userId" required />
                    </div>
                    <div class="form-group">
                      <label for="userPw">비밀번호</label>
                      <input type="password" class="form-control" id="userPw" v-model="userPw" required />
                    </div>
                    <div class="form-group">
                      <label for="confirm-password">비밀번호 확인</label>
                      <input type="password" class="form-control" id="confirm-password" v-model="confirmPassword" required />
                    </div>
                    <div class="form-group">
                      <label for="phone">휴대폰번호</label>
                      <input type="tel" class="form-control" id="phone" v-model.trim="phone" pattern="[0-9]{11}" required title="핸드폰 번호를 정확히 입력해주세요." />
                    </div>
                    <br />
                    <button @click.prevent="signup()" class="btn btn-primary btn-block mx-auto d-block" style="background-color: rgb(237, 241, 214); color: black; border-color: rgb(237, 241, 214)">
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
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      nickName: '',
      userId: '',
      userPw: '',
      confirmPassword: '',
      phone: '',
    };
  },
  methods: {
    signup: function () {
      if (!this.userName || !this.nickName || !this.userId || !this.userPw || !this.confirmPassword || !this.phone) {
        alert('모든 항목을 입력해주세요.');
        return;
      }

      const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/; // 정규식

      if (!pwRegex.test(this.userPw)) {
        alert('비밀번호는 최소 8자 이상, 숫자와 영문자를 모두 포함해야 합니다.');
        return;
      }

      if (this.userPw !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (isNaN(this.phone) || this.phone.toString().length !== 11) {
        alert('핸드폰 번호를 정확히 입력해주세요.');
        return;
      }
      axios
        .post('http://localhost:80/user', {
          userName: this.userName,
          nickName: this.nickName,
          userId: this.userId,
          userPw: this.userPw,
          phone: this.phone,
        })
        .then(response => {
          // 성공적으로 처리된 경우
          alert('회원가입이 완료되었습니다.');
          console.log(response.data);
          this.$router.push({ name: 'landingPage' });
        })
        .catch(error => {
          // 처리 중 에러가 발생한 경우
          alert('존재하는 아이디입니다.');
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style></style>
