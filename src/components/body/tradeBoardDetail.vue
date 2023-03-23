<template>
  <div class="container my-5">
    <div class="row" style="margin-top: 90px;">
      <div class="col-md-4">
        <font style="font-weight: bolder; font-weight: bolder; color: rgb(64, 81, 59); font-size: 30px;" >{{product.nickName}}{{"   LV. "+product.point}}</font>
        <i class="far fa-paper-plane" style="float : right; font-size: 40px;" v-on:click="messagePage(product.nickName, product.tradeId, product.userId)"></i>
        <br>
        <img :src="product.tradeImage" alt="Product image" class="img-fluid">
      </div>
      <div class="col-md-8">
        <h1 class="mb-3" style="font-weight: bolder;">{{ product.tradeTitle }}</h1>
        <div v-on:click="clickLike(product.tradeId)">
            <font style="float : right; font-size: 30px; font-weight: bolder;">{{ product.tradeLike }}</font>
            <i class="fas fa-thumbs-up" style="font-size: 30px; margin-right: 15px; float: right; color : blue;"></i>
        </div>
        <h4 class="mb-3" style="font-weight: 500;">{{ product.tradePrice }}원</h4>
        <p class="mb-5" style="height: 100px; font-weight: 800;">{{ product.tradeContents }}</p>
        <button class="btn btn-warning" @click="reserveCancel(product.tradeId)" v-if="product.reserveCancelFlag">예약 취소</button>
        <button class="btn btn-primary" @click="reserve(product.tradeId, product.tradeStatus)" >{{product.tradeStatus}}</button>
        <button class="btn btn-warning" @click="updateBoard(product.tradeId)" v-if="product.updateFlag">수정</button>
        <button class="btn btn-danger" @click="deleteBoard(product.tradeId, product.tradeImage)" v-if="product.deleteFlag">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: this.$store.state.detail,
      nickName: '',
      senderNickName: ''
    }
  },
  methods: {
    reserve(tradeId, tradeStatus) {
        if (sessionStorage.getItem("userId") != this.product.userId) {
          alert('권한이 없습니다!');
          return;
        }
        if (tradeStatus ==='예약 가능') {
            this.$axios({
             url: 'http://localhost/trade-board/status',
             method : 'PUT',
             params : {
                tradeId : tradeId,
                writerId : this.product.userId //글 작성자 아이디
             },
             responseType : 'json'
            }).then(function(result) {
             this.product.tradeStatus = result.data;
             //예약 취소 버튼 보이게 하기
             this.product.reserveCancelFlag = true;
            }.bind(this));
        }else {
            this.$axios({
              url : 'http://localhost/trade-board/status-c',
            method : 'PUT',
             params : {
                tradeId : tradeId,
                writerId : this.product.userId //글 작성자 아이디
             },
            responseType : 'json'
           }).then(function (result) {
              this.product.tradeStatus = result.data;
              this.product.reserveCancelFlag = false;
           }.bind(this));
        }
    },
    reserveCancel(tradeId) {
        if (sessionStorage.getItem("userId") != this.product.userId) {
          alert('권한이 없습니다!');
          return;
        }
        this.$axios({
                url: 'http://localhost/trade-board/trade-status',
                method : 'PUT',
                params : {
                tradeId : tradeId
                },
                responseType : 'json'
            }).then(function(result) {
                this.product.tradeStatus = result.data;
                //예약 취소 버튼 숨기기
                this.product.reserveCancelFlag = false;
        }.bind(this));
    },
    updateBoard(tradeId) {
        this.$router.push({ name: "tradeBoardWrite" , params : {tradeId:tradeId}});
    },
    deleteBoard(tradeId, tradeImage) {
        this.$axios({
            url : 'http://localhost/trade-board/',
            method : 'DELETE',
            responseType : 'json',
            params : {
                tradeId : tradeId,
                tradeImage : tradeImage
            }
        }).then(function(tradeBoard) {
            this.$store.state.list = tradeBoard.data[0];
            this.$store.state.page = tradeBoard.data[1];
            this.$router.push({ name: "tradeBoard" });
        }.bind(this));
    },
    clickLike(tradeId) {
      let userId = sessionStorage.getItem("userId");
      if (userId != null) {
        this.$axios({
            url : 'http://localhost/trade-board/',
            method : 'GET',
            responseType : 'json',
            params : {
                tradeId : tradeId,
                userId : userId
            }
        }).then(function(result) {
            let clickResult = result.data;
            if (clickResult == 1) {
                this.product.tradeLike += 1;
            }else {
                this.product.tradeLike += -1;
            }
        }.bind(this));
      }

    },
    messagePage(nickName, tradeId, userId) {
      let loginId = sessionStorage.getItem('userId');
      if (typeof sessionStorage.getItem('userId') !== 'undefined' && loginId != null){
        this.$axios({
            url : 'http://localhost/senderNickName/',
            method : 'GET',
            responseType : 'json',
            params : {
                tradeId : tradeId,
                userId : loginId
            }
        }).then(function(result) {
          this.senderNickName = result.data;
          this.$router.push({ name : 'tradeMessage', params : {nickName : nickName, tradeId : tradeId, messageReceiverId : userId, senderNickName : this.senderNickName}});
        }.bind(this));
      }else {
        alert('로그인이 필요합니다!');
        this.$router.push({ name : 'userLogin'});
      }
    }
  }//methods 종료
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h1,
h4,
p {
  color: #333;
}

.btn {
    float: right;
    margin-left: 10px;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus {
  box-shadow: none;
  background-color: #007bff;
  border-color: #007bff;
}
</style>