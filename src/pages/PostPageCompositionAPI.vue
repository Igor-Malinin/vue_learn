<template>
  <div>
    <h1>Страница с постами</h1>
    <MainInput
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    ></MainInput>
    <div class="app__btns">
      <MainBut class="btn-add" disabled>Создать пост</MainBut>
      <MainSelect
          v-model="selectedSort"
          :options="sortOptions"
      ></MainSelect>
    </div>
    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    ></post-list>
    <div class="loading_text" v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts";
import PostItem from "@/components/PostItem.vue";

export default {
  name: "PostPageCompositionAPI",
  components: {
    PostItem,
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'id', name: 'По id'},
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    }
  },
  setup(props) {
    const {posts, totalPages, isPostsLoading} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts, totalPages, isPostsLoading, sortedPosts, selectedSort, searchQuery, sortedAndSearchedPosts
    }
  }
}
</script>

<style scoped>

.btn-add {
  cursor: not-allowed !important;
}
.btn-add:hover {
  background: none !important;
}
.delete__btn {
  /* не работает, не понял пока как заставить*/
  cursor: not-allowed !important;
}

</style>