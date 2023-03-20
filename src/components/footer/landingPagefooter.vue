<template>
  <div>
    <footer style="position: fixed; bottom: 0; width: 100%; ">
      <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: rgb(237, 241, 214); height: 80px;">
      </nav>
       <p>로그인 아이디: {{ userId }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    userId(){
      return sessionStorage.getItem('userId');
    }
  }
}
</script>