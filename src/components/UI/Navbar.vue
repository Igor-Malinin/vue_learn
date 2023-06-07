<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="title">Тренировочный</div>
    <div class="navbar__btns">
      <MainBut @click="$router.push('/')">Главная</MainBut>
      <MainBut @click="$router.push('/posts')">Посты</MainBut>
      <MainBut @click="$router.push('/store')">Посты Vuex</MainBut>
      <MainBut @click="$router.push('/composition')">Посты CompositionAPI</MainBut>
      <MainBut @click="$router.push('/about')">О сайте</MainBut>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0px 15px;
}

.navbar__btns {
  margin-left: auto;
}

.btn {
  margin-left: 20px;
}

.title {
  cursor: pointer;
}
</style>