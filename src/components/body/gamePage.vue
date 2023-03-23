<template>
  <v-container class="main-container">
    <div class="game-title">미니게임</div>
    <div class="game-description-title">게임 설명</div>
    <div class="game-description-content">
      6개의 숫자 박스 중 하나의 정답 박스가 숨어 있습니다!<br />
      하나의 정답 상자를 찾아보세요!<br />
      - 정답 정답 박스를 고르면 40point를 얻을 수 있어요<br />
      - 1번 도전에는 5point가 필요합니다.
    </div>
    현재 점수 : {{ score }}
    <v-row>
      <v-col md="4" sm="6" v-for="(card, index) in cards" :key="index">
        <v-card v-if="resultType === 'error' || resultType === 'success'" disabled class="text-center" @click="checkAnswer(card.number)">
          <v-card-title disabled class="text-center">{{ card.number }}</v-card-title>
        </v-card>
        <v-card v-else class="text-center" @click="checkAnswer(card.number)">
          <v-card-title class="text-center">{{ card.number }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-5">
      <v-col v-if="resultType !== 'error'" cols="12" class="text-center">
        <v-alert v-if="showResult" :type="resultType" class="text-center">{{ resultMessage }}</v-alert>
        <v-btn v-if="showRestartButton" block @click="restartGame">다시하기</v-btn>
      </v-col>
      <v-col v-else cols="12" class="text-center">
        <v-alert v-if="showResult" disabled :type="resultType" class="text-center">{{ resultMessage }}</v-alert>
        <v-btn v-if="showRestartButton" block @click="restartGame">다시하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      cards: [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }],
      answer: 0,
      showResult: false,
      resultType: '',
      resultMessage: '',
      showRestartButton: false,
      score: 0,
    };
  },

  mounted() {
    this.generateAnswer();
    this.score = parseInt(sessionStorage.getItem('point'));
    let userId = sessionStorage.getItem('userId');
    if (!sessionStorage.getItem('userId')) {
      alert('로그인을 먼저 해주세요');
      this.$router.push({ name: 'landingPage' });
    }
    this.$axios
      .get(`http://localhost:80/game/${userId}`)
      .then(data => {
        console.log(data.data);
        this.score = data.data.point;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    generateAnswer() {
      this.answer = Math.floor(Math.random() * 6) + 1;
    },
    giveMeScore: function () {
      this.score;
      // 5point
    },

    checkAnswer(selectedNumber) {
      // if (this.score <= 0) {
      //   alert('point가 부족합니다.');
      //   return;
      // }
      this.showResult = true;
      this.showRestartButton = true;
      let userId = sessionStorage.getItem('userId');
      if (selectedNumber === this.answer) {
        this.resultType = 'success';
        this.resultMessage = '정답입니다!';
        // 정답이면 point 추가
        this.$axios
          .put(`http://localhost:80/game/add/${userId}`)
          .then(data => {
            console.log(data.data);
            console.log('포인트 더하기');
            this.score += 40;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // 오답이면 point 빼기
        this.resultType = 'error';
        this.resultMessage = '오답입니다!';
        this.$axios
          .put(`http://localhost:80/game/minus/${userId}`)
          .then(data => {
            console.log(data.data);
            this.score += -5;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    restartGame() {
      this.generateAnswer();
      this.showResult = false;
      this.showRestartButton = false;
      this.resultType = '';
      this.resultMessage = '';
    },
  },
};
</script>
<style scoped>
.main-container {
  padding-top: 5%;
  height: 80%;
}

.game-title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 5px;
}

.v-card {
  margin-bottom: 10px;
  justify-content: center;
  display: flex;
}

.text-center {
  text-align: center;
}

.game-description-content {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
