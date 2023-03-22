// import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import VueRouter from 'vue-router';
import userLogin from '../components/body/userLogin';
import kakaoSignupUser from '../components/body/kakaoSignupUser';
import myPage from '../components/body/myPage';
import messageWrite from '../components/body/messageWrite';
import tradeMessage from '../components/body/tradeMessage';
import messageSend from '../components/body/messageSend';
import landingPage from '../components/body/landingPage';
import signupUser from '../components/body/signupUser';
import tradeBoard from '../components/body/tradeBoard';
import tradeBoardDetail from '../components/body/tradeBoardDetail';
import tradeBoardWrite from '../components/body/tradeBoardWrite';
import communityBoard from '../components/body/communityBoard';
import communityBoardWrite from '../components/body/communityBoardWrite';
import communityBoardDescription from '../components/body/communityBoardDescription';
import communityBoardUpdate from '../components/body/communityBoardUpdate';
import messageReceive from '../components/body/messageReceive';
import messageReceiveDescription from '../components/body/messageReceiveDescription';
import messageSendDescription from '../components/body/messageSendDescription';
import updateUser from '../components/body/updateUser';
import gamePage from '../components/body/gamePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: landingPage,
  },
  {
    path: '/user-login',
    name: 'userLogin',
    component: userLogin,
  },
  {
    path: '/kakao-signup-user',
    name: 'kakaoSignupUser',
    component: kakaoSignupUser,
  },
  {
    path: '/communitiy-board',
    name: 'communityBoard',
    component: communityBoard,
  },
  {
    path: '/signup-user',
    name: 'signupUser',
    component: signupUser,
  },
  {
    path: '/trade-board',
    name: 'tradeBoard',
    component: tradeBoard,
  },
  {
    path: '/trade-board-detail',
    name: 'tradeBoardDetail',
    component: tradeBoardDetail,
  },
  {
    path: '/trade-board-write',
    name: 'tradeBoardWrite',
    component: tradeBoardWrite,
  },
  {
    path: '/community-board-write',
    name: 'communityBoardWrite',
    component: communityBoardWrite,
  },
  {
    path: '/community-board-description',
    name: 'communityBoardDescription',
    component: communityBoardDescription,
  },
  {
    path: '/my-page',
    name: 'myPage',
    component: myPage,
  },
  {
    path: '/message-receive',
    name: 'messageReceive',
    component: messageReceive,
  },
  {
    path: '/message-receive-description',
    name: 'messageReceiveDescription',
    component: messageReceiveDescription,
  },
  {
    path: '/message-send-description',
    name: 'messageSendDescription',
    component: messageSendDescription,
  },
  {
    path: '/message-send',
    name: 'messageSend',
    component: messageSend,
  },
  {
    path: '/message-write',
    name: 'messageWrite',
    component: messageWrite,
  },
  {
    path: '/community-board-update',
    name: 'communityBoardUpdate',
    component: communityBoardUpdate,
  },
  {
    path: '/update-user',
    name: 'updateUser',
    component: updateUser,
  },
  {
    path: '/game-page',
    name: 'gamePage',
    component: gamePage,
  },
  {
    path: '/trade-message',
    name: 'tradeMessage',
    component: tradeMessage,
  }
];

export default new VueRouter({
  mode: 'history',
  routes,
});
