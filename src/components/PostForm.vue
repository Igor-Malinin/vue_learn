<template>
  <form class="add_post-form" @submit.prevent>
    <h4>Создание поста</h4>
    <MainInput
        v-focus
        v-model.trim="post.title"
        type="text"
        placeholder="Название" />
    <MainInput
        v-model.trim="post.body"
        type="text"
        placeholder="Описание" />
    <MainBut type="button" @click="createPost">Создать</MainBut>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    },
  }
}
</script>

<style scoped>
.add_post-form {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
}
</style>