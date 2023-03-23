<template>
  <div class="container-fluid" style="margin-top: 20px; width : 800px">
    <h1>글 작성</h1>
    <select id="category" class="form-select form-select-sm" aria-label=".form-select-sm example" style="width: 200px;">
      <option selected value="운동화/런닝화">운동화/런닝화</option>
      <option value="스니커즈/캐주얼화">스니커즈/캐주얼화</option>
      <option value="샌들/슬리퍼">샌들/슬리퍼</option>
      <option value="구두">구두</option>
      <option value="워커/부츠">워커/부츠</option>
</select>
<div class="input-group input-group-lg" style="margin-top: 10px; width : 300px;">
  <span class="input-group-text" style="background-color: rgb(237, 241, 214)">가격</span>
  <input v-model="price" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
  <span class="input-group-text">원</span>
</div>
    <div class="input-group mb-3" style="margin-top: 10px;">
    <span class="input-group-text" style="background-color: rgb(237, 241, 214)">@</span>
    <div class="form-floating">
        <input v-model="title" type="text" class="form-control" placeholder="제목입력">
        <label for="floatingInputGroup1">제목을 입력하세요</label>
    </div>
    </div>
      <div class="input-group" style="margin-top: 10px;">
        <input id="uploadImg" type="file" class="form-control" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
        <img v-if="imgFlag" :src="tradeImage" style="width: 120px; height: 120px;">
      </div>
    <h5 style="margin-top: 10px;">상품설명</h5>
    <div class="form-floating">
    <textarea v-model="introduceGoods" class="form-control" style="height : 200px;">
    </textarea>
    </div>

      <div class="form-group">
        <button v-if="insertFlag" v-on:click="insertGoods" type="button" class="btn btn-outline-warning" style="margin-top: 10px; margin-left: 10px; float: right;">상품등록</button>
        <button v-if="upatetFlag" v-on:click="updateBoard" type="button" class="btn btn-warning" style="margin-top: 10px; margin-left: 10px; float: right;">수정완료</button>
      </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      tradeId : '',
      price : '',
      title : '',
      introduceGoods : '',
      tradeImage : '',
      insertFlag : true,
      upatetFlag : false,
      imgFlag : false
    }
  },
  methods: {
    insertGoods() {
      let fileCheck =  true;
      let category = $('#category').val();
      let uploadFile = $('#uploadImg');
      //uploadFile.val(); // 경로
      let formData = new FormData();
      let files = uploadFile[0].files;

      if ($('input[type=file]').val() != '') {
        if (!this.checkExtension(files[0].name, files[0].size)) {
          //true 즉, 파일 사이즈가 초과했거나 허용되지 않는 확장자일 경우
          fileCheck = false;
          //false일 경우 append가 진행되지 않기 때문에 formData에 담기는 파일이 없을 것임
        }else {
          formData.append("uploadFile", files[0]);
        }
      }else {
        alert('상품 사진을 첨부해주세요!');
        fileCheck = false;
      }

      formData.append('tradeTitle', this.title);
      formData.append('tradeContents', this.introduceGoods);
      formData.append('tradePrice', this.price);
      formData.append('goodsCategory', category);
      formData.append('userId', sessionStorage.getItem('userId'));
    
      //숫자인지와 공백인지 확인
      if (this.checkData(this.price, this.title) && fileCheck == true) {
        this.$axios({
          url : 'http://localhost/trade-board/',
          method : 'POST',
          data: formData,
          responseType : 'json'
        }).then(function(result){
 
          this.$store.state.list = result.data[0];
          this.$store.state.page = result.data[1];
          this.$router.push({ name: "tradeBoard" });
        }.bind(this));
      }
    },
    checkExtension(fileName, fileSize) {
      let regex = /\.(jpg|jpeg|png|gif|bmp)$/i;
      let maxSize = 10000000;

			if(fileSize >= maxSize) {
				alert("파일 사이즈 초과");
				return false;
			}else if (!regex.test(fileName)) {
				alert("허용되지 않는 확장자");
				return false;
			}else {
				return true;
			}
		},
    checkData(price, title) {
      if (isNaN(price)) {
        alert('가격에는 숫자를 입력해주세요!');
        return false;
      }else if (title == '') {
        alert('제목을 입력해주세요!');
        return false;
      }else if (price === ''){
        alert('가격을 입력해주세요!');
        return false;
      }else {
        return true;
      }     
    },
    //게시물 수정
    updateBoard() {
      let fileCheck =  true;
      console.log("호출");
      let category = $('#category').val();
      let uploadFile = $('#uploadImg');

      let formData = new FormData();
      let files = '';
      if ($('input[type=file]').val() !== '') {
        files = uploadFile[0].files;
      }else {
        files = [];
        files[0] = '';
      }

      //formData 안에 데이터가 ''일 경우에는 사이즈와 확장자 확인 안하고 넣음
      if (files[0] != '') {
        if (!this.checkExtension(files[0].name, files[0].size)) {
          fileCheck =  false;
        }else {
          formData.append("uploadFile", files[0]);
        }
      }else {
        formData.append("uploadFile", files[0]);
      }

      formData.append('tradeId', this.tradeId);
      formData.append('tradeTitle', this.title);
      formData.append('tradeContents', this.introduceGoods);
      formData.append('tradePrice', this.price);
      formData.append('goodsCategory', category);
      //기존에 있던 파일 이름
      formData.append('tradeImage', this.tradeImage);

      if (this.checkData(this.price, this.title) && fileCheck == true) {
        this.$axios({
          url : 'http://localhost/trade-board/board',
          method : 'POST',
          data: formData,
          responseType : 'json'
        }).then(function(result){
          console.log(result);
          alert('수정 성공!');
          this.$store.state.list = result.data[0];
          this.$store.state.page = result.data[1];
          this.$router.push({ name: "tradeBoard" });
        }.bind(this));
      }
    }
  }, //end methods
  created() {
    if (typeof this.$route.params.tradeId !== 'undefined') {
      this.$axios({
        url : 'http://localhost/trade-board/',
        method : 'GET',
        params : {tradeId : this.$route.params.tradeId},
        responseType : 'json'
      }).then(function(content) {
          console.log('tradeBoardWrite 페이지~');
          let contents = content.data;
          this.tradeId = contents.tradeId;
          this.price = contents.tradePrice;
          this.title = contents.tradeTitle;
          this.introduceGoods = contents.tradeContents;
          this.tradeImage = contents.tradeImage;
          this.insertFlag = false;
          this.upatetFlag = true;
          this.imgFlag = true;
      }.bind(this));
    }
  }
}
</script>

<style>
</style>
