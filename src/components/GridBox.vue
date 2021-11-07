<template>
  <div>
    <div v-if="status === 'running'" class="container" :style="{'grid-template-columns': `repeat(${size}, ${100/size}%)`, 'grid-template-rows': `repeat(${size}, ${100/size}%)`, 'font-size': `${108/size}px`}">
      <template v-for="(row, rowIndex) in array">
        <div
            class="box"
            :class="'c' + x"
            v-for="(x, index) in row"
            :key="index + '' + rowIndex"
        >
          {{ show(showString, x) }}
        </div>
      </template>
    </div>
    <div v-else-if="status === 'ready'" class="textBox" :style="{'font-size':'80px'}">Press the START button</div>
    <div v-else-if="status === 'over'" class="textBox">
      <span :style="{'font-size':'60px', 'color':'#cdc1b4'}">GAME OVER</span><br/><br/>
      <span :style="{'font-size':'40px', 'color':'#edc850'}">Your score is {{score}}</span><br/><br/>
      <span :style="{'font-size':'30px', 'color':'#f9f6f2', 'width':'320px'}">Press the RESTART button to start a new game!</span>
    </div>
    <div class="themes">
      <label><input type="radio" name="theme" value="defaultShow" v-model="showString"/>Default</label>
      <label><input type="radio" name="theme" value="threeShow" v-model="showString"/>" 3 "</label>
      <label><input type="radio" name="theme" value="chineseShow" v-model="showString"/>Chinese</label>
      <label><input type="radio" name="theme" value="taoistShow" v-model="showString"/>Taoist</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridBox",
  props: ["array", "size", "status", 'score'],
  data(){
    return {
      showString: 'defaultShow'
    }
  },
  methods:{
    show(s, x) {
      if (s === 'defaultShow') return this.defaultShow(x)
      else if (s === 'threeShow') return this.threeShow(x)
      else if (s === 'chineseShow') return this.chineseShow(x)
      else if (s === 'taoistShow') return this.taoistShow(x)
    },
    defaultShow(x) {
      return x === 0 ? '' : 2 ** x
    },
    threeShow(x) {
      return x === 0 ? '' : (2 ** x) / 2 * 3
    },
    chineseShow(x) {
      if (x === 0) return ""
      else if (x === 1) return "二"
      else if (x === 2) return "四"
      else if (x === 3) return "八"
      else if (x === 4) return "十六"
      else if (x === 5) return "三十二"
      else if (x === 6) return "六十四"
      else if (x === 7) return "一百二十八"
      else if (x === 8) return "二百五十六"
      else if (x === 9) return "五百一十二"
      else if (x === 10) return "一千零二十四"
      else if (x === 11) return "两千零四十八"
      else if (x === 12) return "四千零九十六"
      else if (x === 13) return "八千一百九十二"
      else if (x === 14) return "一万六千三百八十四"
      else return '你在赣神魔？'
    },
    taoistShow(x) {
      if (x === 0) return ""
      else if (x === 1) return "炼气"
      else if (x === 2) return "筑基"
      else if (x === 3) return "旋照"
      else if (x === 4) return "融合"
      else if (x === 5) return "心动"
      else if (x === 6) return "灵寂"
      else if (x === 7) return "元婴"
      else if (x === 8) return "出窍"
      else if (x === 9) return "分神"
      else if (x === 10) return "合体"
      else if (x === 11) return "度劫"
      else if (x === 12) return "大乘"
      else if (x === 13) return "散仙"
      else if (x === 14) return "金仙"
      else return '我不会了'
    }
  }
};
</script>

<style scoped>
.container {
  width: 400px;
  height: 400px;
  display: grid;
  background-color: #bbada0;
  padding: 5px;
  border-radius: 3%;
  margin: 0 auto;
}

.textBox {
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  background-color: #776e65;
  padding: 5px;
  border-radius: 3%;
  margin: 0 auto;
  flex-direction: column;
  font-weight: bold;
}

.themes {
  margin-top: 20px;
  margin-bottom: 20px;
}

label{
  margin: 15px;
  color: #776e65;
}

.box {
  background-color: #cdc1b4;
  margin: 5px;
  border-radius: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #776e65;
}

.c1 {
  background-color: #eee4da;
  color: #776e65;
}

.c2 {
  background-color: #ede0c8;
  color: #776e65;
}

.c3 {
  background-color: #f2b179;
  color: #f9f6f2;
}

.c4 {
  background-color: #f59563;
  color: #f9f6f2;
}

.c5 {
  background-color: #f67c5f;
  color: #f9f6f2;
}

.c6 {
  background-color: #f65e3b;
  color: #f9f6f2;
}

.c7 {
  background-color: #edcf72;
  color: #f9f6f2;
}

.c8 {
  background-color: #edcc61;
  color: #f9f6f2;
}

.c9 {
  background-color: #edc850;
  color: #f9f6f2;
}

.c10 {
  background-color: #edc53f;
  color: #f9f6f2;
}

.c11 {
  background-color: #edc22e;
  color: #f9f6f2;
}

.c12 {
  background-color: #58554b;
  color: #f9f6f2;
}

.c13 {
  background-color: #47535e;
  color: #f9f6f2;
}

.c14 {
  background-color: #3d3d3d;
  color: #f9f6f2;
}

.c15 {
  background-color: #161616;
  color: #f9f6f2;
}
</style>
