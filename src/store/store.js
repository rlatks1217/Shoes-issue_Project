import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 사용 방법
// this.$store.state.memberId

export const store = new Vuex.Store({
  // state: 상태값
  state: {
    loginId: null,
    isLogin: false,
    isLoginError: false,
    userId: '',
    memberName: '',
    boardId: '',
    comments: '',
    email: '',
    messageId: '',
    messageReceiver: '',
  },
  // mutations: state 값을 변화시키는 로직
  mutations: {
    // 로그인이 성공했을 때,
    loginSuccess(state) {
      state.isLogin = true;
    },
    // 로그인이 실패햇을 때,
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    SET_LOGIN_ID(state, loginId) {
      state.loginId = loginId;
    },
  },
  // actions: business logic
  actions: {
    // 로그인 시도
    login(signinObj) {
      console.log(signinObj);
    },
    setLoginId({ commit }, loginId) {
      commit('SET_LOGIN_ID', loginId);
    },
  },

  getters: {
    loginId(state) {
      return state.loginId;
    },
  },
});
