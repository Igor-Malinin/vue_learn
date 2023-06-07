import {computed, ref} from "vue";

export function useSortedPosts(posts) {
  const selectedSort = ref('')

  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => {
      if (Number(post1[selectedSort.value]))
        return parseInt(post1[selectedSort.value]) - parseInt(post2[selectedSort.value])
      return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    })
  })

  return {
    selectedSort, sortedPosts
  }
}