<template>
  <div class="toast">
    <div class="text">You Win!</div>
  </div>
</template>

<script>
export default {
  name: "winToast",
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
  margin-top: 300px;
  color: #edc22e;
  font-size: 120px;
}
</style>
