<template>
  <transition name="fade">
    <div v-if="showWin" class="toast">
      <div class="text">You Win!</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "winToast",
  props: ['showWin'],
  data() {
    return {
      show: true
    }
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  width: 100%;
  height: 100%;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.3);
}
.text {
  margin-top: 30vh;
  color: #edc22e;
  font-size: 20vw;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
