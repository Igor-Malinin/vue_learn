<template>
  <div class="post">
    <div>
      <div>{{post.id}}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="control__btns">
      <MainBut
          class="post__btns"
          @click="$router.push(`/posts/${post.id}`)"
      >Открыть</MainBut>
      <MainBut
          class="delete__btn"
          @click="$emit('remove', post)"
      >&times;</MainBut>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete__btn {
  font-size: 16px;
  border: 1px solid coral !important;
  color: lightcoral !important;
  margin-left: 10px;
}

.post__btns {
  margin-left: 10px;
}

.control__btns {
  display: flex;
}
</style>