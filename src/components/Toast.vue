<template>
  <transition name="fade">
    <div v-if="status === 'ready' || status === 'over'" class="toast" :class="textStyle">
      {{showText}}
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props:['status', 'score'],
  computed:{
    showText() {
      if (this.status === 'ready') return 'Press the START button'
      else if (this.status === 'over') return 'Game Over! Your score is  ' + this.score
      else return ''
    },
    textStyle() {
      if (this.status === 'ready') return 'readyToast'
      else if (this.status === 'over') return 'overToast'
      else return ''
    }
  }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.toast {
  padding: 0.3rem;
  width: 20rem;
  height: 20rem;
  border-radius: 3%;
  position: fixed;
  left: 50%;
  margin-left: -10.3rem;
  font-weight: bold;
}

.readyToast {
  background-color: rgba(89, 86, 86, 0.5);
  color: #d9d6cf;
  font-size: 3.6rem;
}

.overToast {
  background-color: rgba(89, 86, 86, 0.85);
  color: #d9d6cf;
  font-size: 2.8rem;
}
</style>
