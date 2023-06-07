<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: "MainDialog",
  mixins: [toggleMixin]
}
</script>

<style scoped>
.dialog {
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.3);
  position: fixed;

}

.dialog__content {
  padding: 20px;
  margin: auto;
  background-color: white;
  border-radius: 5px;
  min-height: 50px;
  min-width: 300px;
}
</style>