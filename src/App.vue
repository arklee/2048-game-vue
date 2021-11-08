<template>
  <div id="app" @touchstart="touchstart" @touchend="touchend" @keydown="keydown">
    <h1>2048 Puzzle Game</h1>
    <h2 v-if="status === 'running' || status === 'won'">Current Score: {{ score }} | Highest Score: {{ highest }}</h2>
    <h2 v-else>Highest Score: {{ highest }}</h2>
    <winToast :showWin="showWin"/>
    <GridBox :array="array" :size="size" :status="status" :score="score"/>
    <span style="display: flex; justify-content: center">
      <button class="minus" @click="()=>{this.inputSize--}">-</button>
      <div class="sizeNumber">{{inputSize}}</div>
      <button class="plus" @click="()=>{this.inputSize++}">+</button>
      <button ref="btn" @focusout="refocus" class="btn" @click="start">{{status === 'running' || status === 'won'? 'RESTART' : 'START'}}</button>
    </span>
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
    axios.get(`/getScore?size=4`).then(res => {
      this.highest = res.data
    })
  },
  methods: {
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
        }
        else if (horizon < -50) {
          x = 4
        }
      } else {
        if (vertical > 50) {
          x = 1
        }
        else if (vertical < -50) {
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
      }
      else {
        this.size = x
      }
      this.array = initArray(this.size)
      axios.get(`/getScore?size=${this.size}`).then(res => {
        this.highest = res.data
      })
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
              axios.get(`/setScore?size=${this.size}&score=${this.highest}`)
            }
          }
        };
        if (a === 1) f(up);
        else if (a === 2) f(down);
        else if (a === 3) f(left);
        else if (a === 4) f(right);
        if(checkWin(this.array, this.size, this.status === 'won')) {
          this.status = 'won'
          this.showWin = true
          setTimeout(() => {
            this.showWin = false
          },3000)
        }
        if (checkFail(this.array, this.size)) {
          this.status = 'over';
        }
      }
    }
  }
};
</script>

<style>
body {
  overscroll-behavior: contain;
}

#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
  "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  height: 90vh;
}

h1 {
  color: #776e65;
  font-size: 2rem;
}

h2 {
  color: #776e65;
  font-size: 1rem;
  margin-top: 0;
}

.plus {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #eee4da;
  text-align: center;
  font-size: 1.2rem;
  border-width: 0;
  color: #776e65;
  border-radius: 0 0.8rem 0.8rem 0;
  margin-right: 3.2rem;
}

.minus {
  width: 2.5rem;
  height: 2.5rem;
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
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.2rem;
  color: #776e65;
  background-color: #eee4da;
  border-width: 0;
}

.btn {
  width: 8rem;
  height: 2.4rem;
  background-color: #776e65;
  text-align: center;
  font-size: 1.6rem;
  border-radius: 0.8rem;
  border-width: 0;
  color: #eee4da;
}
</style>
