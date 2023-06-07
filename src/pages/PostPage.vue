<template>
  <div>
    <h1>Страница с постами</h1>
    <MainInput
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    ></MainInput>
    <div class="app__btns">
      <MainBut class="btn-add" @click="showDialog">Создать пост</MainBut>
      <MainSelect
          v-model="selectedSort"
          :options="sortOptions"
      ></MainSelect>
    </div>
    <!--    <MainBut class="btn-add" @click="fetchPosts">Получить посты</MainBut>-->
    <MainDialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      ></post-form>
    </MainDialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    ></post-list>
    <div class="loading_text" v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNum in totalPages"-->
    <!--          :key="pageNum"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': pageNum === page-->
    <!--          }"-->
    <!--          @click="changePage(pageNum)"-->
    <!--      >-->
    <!--        {{pageNum}}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios"
// import dataJson from "@/data.json"

export default {
  name: "PostPage",
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'id', name: 'По id'},
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.dialogVisible = false
      this.posts.push(post)
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    // changePage(pageNum) {
    //   this.page = pageNum
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
        this.posts = response.data
      }
      catch (err) {
        alert('Ошибка ')
      }
      finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        ++this.page
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
        this.posts = [...this.posts, ...response.data]
      }
      catch (err) {
        alert('Ошибка ')
      }
    }
  },
  mounted() {
    // console.log(dataJson[0]._id.$oid)
    this.fetchPosts()
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if(entries[0].isIntersecting && this.page < this.totalPages)
    //     this.loadMorePosts()
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        if (Number(post1[this.selectedSort]))
          return parseInt(post1[this.selectedSort]) - parseInt(post2[this.selectedSort])
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(
          post => post.title
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) =>
    //       post1[newValue]?.localeCompare(post2[newValue])
    //   )
    // },
  },
}
</script>

<style >

.loading_text {
  color: #469683;
  font-size: 18px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

</style>