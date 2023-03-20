import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import { store } from './store/store.js';
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$axios = axios;
// Vue.prototype.$store = store;

new Vue({
  el: '#app',
  router,
  vuetify,
  store: store,
  render: h => h(App),
}).$mount('#app');
