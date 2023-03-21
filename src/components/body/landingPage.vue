<template>
  <v-container class="content-container">
      <v-card class="text-center">
        <v-card-title class="font-weight-bold">최근 게시글</v-card-title>
      </v-card>
      <v-row>
        <v-col v-for="(box, index) in boxes" :key="index" cols="12" sm="6" md="4">
          <v-card class="mx-auto d-flex flex-column justify-between" max-width="300">
            <v-img :src="box.imgSrc" :alt="box.imgAlt" width="100%" height="250"></v-img>
            <v-btn class="mt-2" color="rgb(237, 241, 214)" @click="tradeBoardReload()">상세보기</v-btn>
            <v-card-title class="font-weight-bold mt-2" style="font-size: 16px">{{ box.title }}</v-card-title>
            <v-card-text class="text-center" style="padding: 50px">{{ box.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      boxes: [
        {
          imgSrc: '/images/nb574_navy.jpeg',
          imgAlt: '뉴발란스 574 레거시 네이비',
          title: '뉴발란스 574 레거시 네이비',
          description: '상태 좋아요뉴발란스',
        },
        {
          imgSrc: '/images/nb530_grey.jpg',
          imgAlt: '뉴발란스 530',
          title: '뉴발란스 530',
          description: '혜화역 4번출구 직거래',
        },
        {
          imgSrc: '/images/asics1090_midgrey.png',
          imgAlt: '아식스 젤1090 v2 미드그레이',
          title: '아식스 젤1090 v2 미드그레이',
          description: '네고 안돼요',
        },
        {
          imgSrc: '/images/nikeDunk_navy.png',
          imgAlt: '나이키 덩크로우 미드나잇 네이비1',
          title: '나이키 덩크로우 미드나잇 네이비1',
          description: '상태 s급',
        },
        {
          imgSrc: '/images/nikeDunk_navy.png',
          imgAlt: '나이키 덩크로우 미드나잇 네이비2',
          title: '나이키 덩크로우 미드나잇 네이비2',
          description: '상태 s급뉴발란스',
        },
        {
          imgSrc: '/images/nikeDunk_navy.png',
          imgAlt: '나이키 덩크로우 미드나잇 네이비3',
          title: '나이키 덩크로우 미드나잇 네이비3',
          description: '상태 s급',
        },
      ],
    };
  },
  methods: {
      tradeBoardReload() {
      this.$router.push({ name: "tradeBoard" });
    }
  }
};
</script>

<style scoped>
.content-container {
  min-height: calc(100vh - 150px);
}
.v-card__title {
  font-size: 24px;
  line-height: 1.3;
  text-align: center;
  background-color: rgb(237, 241, 214);
}
.v-card__text {
  text-align: center;
}
</style>
