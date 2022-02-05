<template>
  <div>
    <div class="themes">
      <label><input type="radio" name="theme" value="default" v-model="showString"/>Default</label>
      <label><input type="radio" name="theme" value="three" v-model="showString"/>" 3 "</label>
      <label><input type="radio" name="theme" value="chinese" v-model="showString"/>Chinese</label>
      <label><input type="radio" name="theme" value="taoist" v-model="showString"/>Taoist</label>
      <label><input type="radio" name="theme" value="rank" v-model="showString"/>LOL</label>
      <label><input type="radio" name="theme" value="test" v-model="showString"/>Blank</label>
    </div>
    <Toast :status="status" :score="score"/>
    <div class="container" :style="{'grid-template-columns': `repeat(${size}, ${100/size}%)`, 'grid-template-rows': `repeat(${size}, ${100/size}%)`, 'font-size': `${5.5/size}rem`}">
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
  </div>
</template>

<script>
import Toast from "@/components/Toast";
export default {
  name: "GridBox",
  components: {Toast},
  props: ["array", "size", "status", 'score'],
  data(){
    return {
      showString: 'default'
    }
  },
  methods:{
    show(s, x) {
      return this[s](x)
    },
    default(x) {
      return x === 0 ? '' : 2 ** x
    },
    three(x) {
      return x === 0 ? '' : (2 ** x) / 2 * 3
    },
    chinese(x) {
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
      else if (x === 13) return "八千一伯？"
      else if (x === 14) return "一万六？"
      else return "世界那么大。"
    },
    taoist(x) {
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
      else return "给我整不会了"
    },
    rank(x) {
      if (x === 0) return ""
      else if (x === 1) return "瓜皮"
      else if (x === 2) return "黑铁"
      else if (x === 3) return "黄铜"
      else if (x === 4) return "白银"
      else if (x === 5) return "黄金"
      else if (x === 6) return "铂金"
      else if (x === 7) return "钻石"
      else if (x === 8) return "小代"
      else if (x === 9) return "大师"
      else if (x === 10) return "宗师"
      else if (x === 11) return "王者"
      else if (x === 12) return "通天代"
      else if (x === 13) return "职业选手"
      else if (x === 14) return "Faker"
      else return '你在赣神魔？'
    },
    test(x) {
      return ''
    }
  }
};
</script>

<style scoped>
.container {
  width: 20rem;
  height: 20rem;
  display: grid;
  background-color: #bbada0;
  padding: 0.3rem;
  border-radius: 3%;
  margin: 0 auto;
}

.themes {
  width: 20rem;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: repeat(2, 50%);
  margin: 0 auto 1rem auto;
}

label{
  margin-top: 0.5rem;
  color: #776e65;
  font-size: 1rem;
}

label input {
  width: 0.7rem;
  height: 0.7rem;
}

.box {
  background-color: #cdc1b4;
  margin: 0.26rem;
  border-radius: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #776e65;
  overflow: hidden;
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
