<template>
  <div id="app" @touchstart="touchstart" @touchend="touchend" @keydown="keydown">
    <span class="title" style="margin-top: 1rem">
      <span style="display: flex; flex-direction: column; margin: 0 2.5rem 0 0.5rem; justify-content: space-between">
        <span class="h1">2048</span>
        <span class="h2">Your Score: {{ score }}</span>
        <span class="h2">Highest: {{ highest }}</span>
        <!--      <span class="h2" v-if="status === 'running' || status === 'won'">Current Score: {{ score }} | Highest Score: {{highest }}</span>-->
        <!--      <span class="h2" v-else>Highest Score: {{ highest }}</span>-->
      </span>
      <span style="display: flex; flex-direction: column; justify-content: space-between">
        <span style="display: flex">
          <button class="minus" @click="()=>{this.inputSize--}">-</button>
          <span class="sizeNumber">{{ inputSize }}</span>
          <button class="plus" @click="()=>{this.inputSize++}">+</button>
        </span>
        <button ref="btn" @focusout="refocus" class="start"
                @click="start">{{ status === 'running' || status === 'won' ? 'RESTART' : 'START' }}</button>
      </span>
    </span>
    <winToast :showWin="showWin"/>
    <GridBox :array="array" :size="size" :status="status" :score="score"/>
  </div>
</template>

<script>
import WinToast from "@/components/winToast";
import GridBox from "./components/GridBox.vue";
import {initArray, mov, up, down, right, left, checkFail, checkWin} from "./2048.js";
import axios from 'axios'

export default {
  name: "App",
  components: {
    WinToast,
    GridBox,
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      size: 4,
      inputSize: 4,
      array: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      score: 0,
      status: 'ready',
      showWin: false,
      highest: 0
    };
  },
  mounted() {
    this.getScore(4);
    const timer = setInterval(() => {
      if (this.status === 'running' || this.status === 'won') {
        this.setScore(this.size, this.score)
      }
    }, 5000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  },
  methods: {
    getScore(size) {
      axios.get(`/getScore?size=${size}`).then(res => {
        this.highest = res.data
      })
    },
    setScore(size, score) {
      if (this.score === this.highest) {
        axios.get(`/setScore?size=${size}&score=${score}`)
      }
    },
    touchstart(e) {
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
    },
    touchend(e) {
      this.moveX = e.changedTouches[0].clientX
      this.moveY = e.changedTouches[0].clientY
      let horizon = this.startX - this.moveX
      let vertical = this.startY - this.moveY
      let x = 0
      if (Math.abs(horizon) > Math.abs(vertical)) { //上下
        if (horizon > 50) {
          x = 3
        } else if (horizon < -50) {
          x = 4
        }
      } else {
        if (vertical > 50) {
          x = 1
        } else if (vertical < -50) {
          x = 2
        }
      }
      this.move(x)
    },
    start() {
      this.status = 'running'
      this.score = 0
      let x = this.inputSize
      if (x > 7 || x < 3) {
        alert("Please select a number from 3 to 7")
      } else {
        this.size = x
      }
      this.array = initArray(this.size)
      this.getScore(this.size)
    },
    refocus() {
      this.$nextTick(() => {
        this.$refs.btn.focus()
      })
    },
    keydown(e) {
      let x = 0
      if (e.key === "ArrowUp") x = 1
      else if (e.key === "ArrowDown") x = 2
      else if (e.key === "ArrowLeft") x = 3
      else if (e.key === "ArrowRight") x = 4
      this.move(x)
    },
    move(a) {
      if (this.status === 'running' || this.status === 'won') {
        let f = (x) => {
          let result = mov(this.array, this.score, x, this.size);
          if (result[2]) {
            this.array = result[0];
            this.score = result[1];
            if (this.score > this.highest) {
              this.highest = this.score
            }
          }
        };
        if (a === 1) f(up);
        else if (a === 2) f(down);
        else if (a === 3) f(left);
        else if (a === 4) f(right);
        if (checkWin(this.array, this.size, this.status === 'won')) {
          this.status = 'won'
          this.showWin = true
          setTimeout(() => {
            this.showWin = false
          }, 3000)
        }
        if (checkFail(this.array, this.size)) {
          this.status = 'over';
          this.setScore(this.size, this.highest)
        }
      }
    }
  }
};
</script>

<style>

@import url(//db.onlinewebfonts.com/c/141f0082275e5cdbcbe7f18a4cc033ec?family=Earth+Orbiter+Bold);

body {
  overscroll-behavior: contain;
}

#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 90vh;
  font-family: "Earth Orbiter Bold", serif;
}

.title {
  display: flex;
  justify-content: center;
  height: 6rem;
}

.h1 {
  color: #776e65;
  font-size: 2.5rem;
  font-weight: bolder;
  flex: 2;
}

.h2 {
  color: #776e65;
  font-size: 1.5rem;
  flex: 1;
}

.plus {
  width: 2.7rem;
  height: 2.7rem;
  background-color: #eee4da;
  text-align: center;
  font-size: 1.2rem;
  border-width: 0;
  color: #776e65;
  border-radius: 0 0.8rem 0.8rem 0;
}

.minus {
  width: 2.7rem;
  height: 2.7rem;
  background-color: #eee4da;
  text-align: center;
  font-size: 1.2rem;
  border-width: 0;
  color: #776e65;
  border-radius: 0.8rem 0 0 0.8rem;
}

.sizeNumber {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.7rem;
  height: 2.7rem;
  font-size: 1.2rem;
  color: #776e65;
  background-color: #eee4da;
  border-width: 0;
}

.start {
  width: 8.1rem;
  height: 2.7rem;
  background-color: #776e65;
  text-align: center;
  font-size: 1.4rem;
  border-radius: 0.8rem;
  border-width: 0;
  color: #eee4da;
  font-family: "Earth Orbiter Bold", serif;
}
</style>
