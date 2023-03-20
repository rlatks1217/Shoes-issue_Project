<template>
  <v-app>
    <landingPageheader></landingPageheader>
    <router-view></router-view>
    <landingPagefooter></landingPagefooter>
  </v-app>
</template>

<script>
import landingPageheader from './components/header/landingPageheader.vue';
import landingPagefooter from './components/footer/landingPagefooter.vue';

export default {
  name: 'app',
  components: {
    landingPageheader,
    landingPagefooter,
  },
  methods: {},
};
</script>

<style></style>
