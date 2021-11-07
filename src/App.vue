<template>
  <div id="app" @keydown="move">
    <h1 class="title">2048 Puzzle Game</h1>
    <h2 class="title">Current Score: {{ score }} | Highest Score: {{ highest }}</h2>
    <GridBox :array="this.array" :size="size"/>
    <span style="display: flex; justify-content: center">
      <span class="difficultyText">Difficulty</span>
      <input value="4" class="input" type="number" ref="input" min="3" max="7"/>
      <button ref="btn" @focusout="refocus" class="btn" @click="start">{{isRunning ? 'RESTART' : 'START'}}</button>
    </span>
  </div>
</template>

<script>
import GridBox from "./components/GridBox.vue";
import {initArray, mov, up, down, right, left, checkFail} from "./2048.js";

export default {
  name: "App",
  components: {
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
      isRunning: false,
    };
  },
  methods: {
    start() {
      this.isRunning = true
      this.score = 0
      this.size = parseInt(this.$refs.input.value)
      this.array = initArray(this.size)
      this.highest = localStorage.getItem('a' + this.size) ? localStorage.getItem('a' + this.size) : 0
    },
    refocus() {
      this.$nextTick(() => {
        this.$refs.btn.focus()
      })
    },
    move(e) {
      if (checkFail(this.array, this.size)) {
        this.isRunning = false;
        alert("Game Over");
      } else {
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

.title {
  color: #776e65;
}

.difficultyText {
  padding-top: 10px;
  width: 150px;
  height: 40px;
  background-color: #eee4da;
  text-align: center;
  font-size: 24px;
  border-width: 0;
  color: #776e65;
  border-radius: 8px 0 0 8px;
}

.input {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  text-align: center;
  font-size: 24px;
  border-radius: 0 8px 8px 0;
  border-width: 4px;
  border-color: #eee4da;
  color: #776e65;
  margin-right: 50px;
}

.btn {
  width: 140px;
  height: 50px;
  background-color: #776e65;
  text-align: center;
  font-size: 24px;
  border-radius: 8px;
  border-width: 0;
  color: #eee4da;
}
</style>
