<template>
  <v-container class="main-container">
    <v-row>
      <v-col md="4" sm="6" v-for="(card, index) in cards" :key="index">
        <v-card @click="checkAnswer(card.number)">
          <v-card-title class="text-center">{{ card.number }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-5">
      <v-col cols="12" class="text-center">
        <v-alert v-if="showResult" :type="resultType">{{ resultMessage }}</v-alert>
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
  },

  methods: {
    generateAnswer() {
      this.answer = Math.floor(Math.random() * 6) + 1;
    },

    checkAnswer(selectedNumber) {
      this.showResult = true;
      this.showRestartButton = true;

      if (selectedNumber === this.answer) {
        this.resultType = 'success';
        this.resultMessage = '정답입니다!';
        this.score += 30;
      } else {
        this.resultType = 'error';
        this.resultMessage = '오답입니다!';
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
  padding-top: 15%;
  height: 80%;
}

.v-card {
  margin-bottom: 10px;
}
</style>
