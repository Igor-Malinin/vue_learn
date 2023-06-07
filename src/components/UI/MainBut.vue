<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MainBut"
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
  &:hover {
     background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
     background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>