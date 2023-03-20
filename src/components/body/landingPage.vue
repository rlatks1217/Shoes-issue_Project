<template>
  <div class="bodyTitle">
    <div class="recentBoardTitle">최근 게시글</div>
    <div class="images-boxes">
      <div class="row">
        <div class="col-md-6 col-lg-6" v-for="(box, index) in boxes" :key="index">
          <div class="image-box">
            <img :src="box.imgSrc" :alt="box.imgAlt" />
            <div class="description">
              <h4>{{ box.title }}</h4>
              <p>{{ box.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxes: [
        {
          // imgSrc: '../../../images/nb574_navy.jpeg',
          imgSrc: '/images/nb574_navy.jpeg',
          imgAlt: '이미지1',
          title: '뉴발란스 574 레거시 네이비',
          description: '상태 좋아요',
        },
        {
          imgSrc: '/images/nb530_grey.jpg',
          imgAlt: '이미지2',
          title: '뉴발란스 530',
          description: '혜화역 4번출구 직거래',
        },
        {
          imgSrc: '/images/asics1090_midgrey.png',
          imgAlt: '이미지3',
          title: '아식스 젤1090 v2 미드그레이',
          description: '네고 안돼요',
        },
        {
          imgSrc: '/images/nikeDunk_navy.png',
          imgAlt: '이미지4',
          title: '나이키 덩크로우 미드나잇 네이비',
          description: '상태 s급',
        },
      ],
    };
  },
};
</script>

<style scoped>
.bodyTitle {
  margin: 2% 30px 0px 30px;
}

.recentBoardTitle {
  font-size: 30px;
  font-weight: 700;
  color: rgb(0, 0, 0);
}

.images-boxes {
  margin-top: 60px;
}

.image-box {
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.image-box img {
  max-width: 30%;
  max-height: 30%;
  margin-right: 10px;
  text-align: center;
}

.image-box .description {
  text-align: left;
}

.image-box .description h4 {
  margin-top: 0;
  margin-bottom: 5px;
  font-weight: 550;
}
</style>
