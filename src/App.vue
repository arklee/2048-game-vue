<template>
  <div id="app" @touchstart="touchstart" @touchend="touchend" @keydown="keydown">
    <span class="title" style="margin: 1rem auto">
      <span>
        <span class="h1">2048</span>
        <span class="h2">Ur Score: {{ score }}</span>
        <span class="h2">Highest: {{ highest }}</span>
      </span>
      <span style="display: flex; flex-direction: column; justify-content: space-between">
        <span style="display: flex">
          <button class="minus" @click="()=>{this.inputSize--}">-</button>
          <span class="sizeNumber">{{ inputSize }}</span>
          <button class="plus" @click="()=>{this.inputSize++}">+</button>
        </span>
        <button ref="btn" @focusout="refocus" class="start"
                @click="start">{{ buttonText }}</button>
      </span>
    </span>
    <winToast :showWin="showWin"/>
    <GridBox :array="array" :size="size" :status="status" :score="score"/>
  </div>
</template>

<script>
import WinToast from "@/components/winToast";
import GridBox from "./components/GridBox.vue";
import {initArray, action, checkFail, checkWin} from "./2048.js";

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
    this.loadSession()
  },
  computed: {
    buttonText() {
      if (this.inputSize !== this.size) {
        return "LOAD"
      }
      else if (this.status === 'running' || this.status === 'won') {
        return "RESTART"
      }
      else {
        return "START"
      }
    }
  },
  methods: {
    saveSession() {
      let session = {
        highest: this.highest,
        score: this.score,
        array: this.array,
        status: this.status
      }
      localStorage.setItem("session" + this.size, JSON.stringify(session))
    },
    loadSession() {
      let session = JSON.parse(localStorage.getItem("session" + this.size))
      if (session === null) {
        this.array = initArray(this.size)
        this.score = 0
        this.highest = 0
        this.status = "ready"
      }
      else {
        this.score = session.score
        this.highest = session.highest
        this.array = session.array
        this.status = (session.status === "running" || session.status === "won") ? "ready" : session.status
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
      if (Math.abs(horizon) < Math.abs(vertical))
      {
        if (vertical > 30)
          this.move(1)
        else if (vertical < -30)
          this.move(2)
      }
      else
      {
        if (horizon > 30)
          this.move(3)
        else if (horizon < -30)
          this.move(4)
      }
    },
    start() {
      let x = this.inputSize
      if (x !== this.size) {
        //切换size
        if (x > 7) {
          this.size = 7
          this.inputSize = 7
        } else if(x < 3) {
          this.size = 3
          this.inputSize = 3
        } else {
          this.size = x
        }
        this.loadSession()
      }

      else {
        //没有切换size
        if (this.status === "ready") {
          this.status = "running"
        } else {
          this.array = initArray(this.size)
          this.score = 0
          this.status = "running"
        }
      }
    },
    refocus() {
      this.$nextTick(() => {
        this.$refs.btn.focus()
      })
    },
    keydown(e) {
      if (e.key === "ArrowUp") this.move(1)
      else if (e.key === "ArrowDown") this.move(2)
      else if (e.key === "ArrowLeft") this.move(3)
      else if (e.key === "ArrowRight") this.move(4)
    },
    move(a) {
      if (this.status === 'running' || this.status === 'won') {
        let f = (x) => {
          let result = action(this.array, this.score, x, this.size);
          if (result.changed) {
            this.array = result.newArray;
            this.score = result.newScore;
            if (this.score > this.highest) {
              this.highest = this.score
            }
          }
        };
        f(a)
        if (checkWin(this.array, this.size, this.status === 'won')) {
          this.status = 'won'
          this.showWin = true
          setTimeout(() => {
            this.showWin = false
          }, 3000)
        }
        if (checkFail(this.array, this.size)) {
          this.status = 'over';
        }
      }
      this.saveSession();
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
  height: 90vh;
  font-family: "Lucida Sans", sans-serif;
}

.title {
  display: flex;
  justify-content: space-between;
  height: 6.2rem;
  width: 19rem;
}

.h1 {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: #776e65;
  font-size: 2.5rem;
  font-weight: bolder;
}

.h2 {
  display: flex;
  align-items: flex-end;
  color: #857b71;
  font-size: 1.2rem;
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
}
</style>
