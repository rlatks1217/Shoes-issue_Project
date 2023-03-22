<template>
  <v-container class="content-container">
      <v-card class="text-center">
        <v-card-title class="font-weight-bold">최근 게시글</v-card-title>
      </v-card>
      <v-row>
        <v-col v-for="(box, index) in boxes" :key="index" cols="12" sm="6" md="4">
          <v-card class="mx-auto d-flex flex-column justify-between" max-width="300">
            <v-img :src="box.tradeImage" width="100%" height="250"></v-img>
            <v-btn class="mt-2" color="rgb(237, 241, 214)" @click="goTradeBoardDetail(box.tradeId, box.userId)">상세보기</v-btn>
            <v-card-title class="font-weight-bold mt-2" style="font-size: 16px">{{ box.tradeTitle }}</v-card-title>
            <v-card-text class="text-center" style="padding: 50px">{{ box.tradeContents }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      boxes: []
    };
  },
  methods: {
    goTradeBoardDetail(tradeId, userId) {
      this.$axios({
          url : 'http://localhost/trade-board/' + tradeId +"/" + userId,
          method : 'GET',
          responseType : 'json'
        }).then(function(tradeBoardDetail){
          let resultData = tradeBoardDetail.data;

          //레벨 나타내기
          if (resultData <= 10) {
            resultData.point = 1;
          }else if (resultData <= 50){
            resultData.point = 2;
          }else if (resultData <= 100) {
            resultData.point = 3;
          }else if (resultData <= 500) {
            resultData.point = 4;
          }else if (resultData <= 1000) {
            resultData.point = 5;
          }else {
            resultData.point = 6;
          }
          resultData.userId = userId;
          if (userId !== sessionStorage.getItem('userId')) {
            //삭제버튼/수정버튼 여부
            resultData.deleteFlag = false;
            resultData.updateFlag = false;

          }else {
            resultData.deleteFlag = true;
            resultData.updateFlag = true;
          }

          if (resultData.tradeStatus === '거래중') {
            resultData.reserveCancelFlag = true;
          }else {
            resultData.reserveCancelFlag = false;
          }
          
          this.$store.state.detail = resultData;
          this.$router.push({ name: "tradeBoardDetail" });
        }.bind(this));
    }
  },
  created() {
    this.$axios({
      url: 'http://localhost/rendingBody',
      method: 'GET',
      responseType: 'json'
    }).then(function(infoList) {
      this.boxes = infoList.data;
    }.bind(this));
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
