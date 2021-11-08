<template>
  <div id="app" @keydown="move">
    <h1>2048 Puzzle Game</h1>
    <h2 v-if="status === 'running' || status === 'won'">Current Score: {{ score }} | Highest Score: {{ highest }}</h2>
    <h2 v-else>Highest Score: {{ highest }}</h2>
    <winToast :showWin="showWin"/>
    <GridBox :array="array" :size="size" :status="status" :score="score"/>
    <span style="display: flex; justify-content: center">
      <span class="difficultyText">Difficulty</span>
      <input value="4" class="input" type="number" ref="input" min="3" max="7"/>
      <button ref="btn" @focusout="refocus" class="btn" @click="start">{{status === 'running' || status === 'won'? 'RESTART' : 'START'}}</button>
    </span>
  </div>
</template>

<script>
import WinToast from "@/components/winToast";
import GridBox from "./components/GridBox.vue";
import {initArray, mov, up, down, right, left, checkFail, checkWin} from "./2048.js";

export default {
  name: "App",
  components: {
    WinToast,
    GridBox,
  },
  data() {
    return {
      size: 4,
      array: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      score: 0,
      highest: localStorage.getItem('a4') ? localStorage.getItem('a4') : 0,
      status: 'ready',
      showWin: false
    };
  },
  methods: {
    start() {
      this.status = 'running'
      this.score = 0
      let x = parseInt(this.$refs.input.value)
      if (x > 7 || x < 3) {
        alert("Please select a number from 3 to 7")
      }
      else {
        this.size = x
      }
      this.array = initArray(this.size)
      this.highest = localStorage.getItem('a' + this.size) ? localStorage.getItem('a' + this.size) : 0
    },
    refocus() {
      this.$nextTick(() => {
        this.$refs.btn.focus()
      })
    },
    move(e) {

      if (this.status === 'running' || this.status === 'won') {
        let f = (x) => {
          let result = mov(this.array, this.score, x, this.size);
          if (result[2]) {
            this.array = result[0];
            this.score = result[1];
            if (this.score > this.highest) {
              this.highest = this.score
              localStorage.setItem('a' + this.size, this.highest)
            }
          }
        };
        if (e.key === "ArrowUp") f(up);
        else if (e.key === "ArrowDown") f(down);
        else if (e.key === "ArrowLeft") f(left);
        else if (e.key === "ArrowRight") f(right);
        if(checkWin(this.array, this.size, this.status === 'won')) {
          this.status = 'won'
          this.showWin = true
          setInterval(() => {
            this.showWin = false
          },3000)
        }
        if (checkFail(this.array, this.size)) {
          this.status = 'over';
        }
      }
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
  "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

h1 {
  color: #776e65;
  font-size: 5vh;
  margin-top: 0;
  margin-bottom: 0;
}

h2 {
  color: #776e65;
  font-size: 4vh;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.difficultyText {
  padding-top: 1vh;
  width: 22vh;
  height: 7.2vh;
  background-color: #eee4da;
  text-align: center;
  font-size: 4vh;
  border-width: 0;
  color: #776e65;
  border-radius: 2vh 0 0 2vh;
}

.input {
  width: 6vh;
  height: 6vh;
  background-color: #ffffff;
  text-align: center;
  font-size: 4vh;
  border-radius: 0 2vh 2vh 0;
  border-width: 1vh;
  border-color: #eee4da;
  color: #776e65;
  margin-right: 8vh;
}

.btn {
  width: 25vh;
  height: 8vh;
  background-color: #776e65;
  text-align: center;
  font-size: 4vh;
  border-radius: 2vh;
  border-width: 0;
  color: #eee4da;
}
</style>
