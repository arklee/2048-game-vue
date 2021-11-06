<template>
  <div class="container" :style="{'grid-template-columns': `repeat(${size}, ${100/size}%)`, 'grid-template-rows': `repeat(${size}, ${100/size}%)`}">
    <template v-for="(row, rowIndex) in array">
      <div
          class="box"
          :class="'c' + item"
          v-for="(item, index) in row"
          :key="index + '' + rowIndex"
      >
        {{ item === 0 ? '' : item }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "GridBox",
  props: ["array", "size"],
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
  margin: 0 auto 20px auto;
}

.box {
  background-color: #cdc1b4;
  margin: 5px;
  border-radius: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 27px;
  color: #776e65;
}

.c2 {
  background-color: #eee4da;
  color: #776e65;
}

.c4 {
  background-color: #ede0c8;
  color: #776e65;
}

.c8 {
  background-color: #f2b179;
  color: #f9f6f2;
}

.c16 {
  background-color: #f59563;
  color: #f9f6f2;
}

.c32 {
  background-color: #f67c5f;
  color: #f9f6f2;
}

.c64 {
  background-color: #f65e3b;
  color: #f9f6f2;
}

.c128 {
  background-color: #edcf72;
  color: #f9f6f2;
}

.c256 {
  background-color: #edcc61;
  color: #f9f6f2;
}

.c512 {
  background-color: #edc850;
  color: #f9f6f2;
}

.c1024 {
  background-color: #edc53f;
  color: #f9f6f2;
}

.c2048 {
  background-color: #edc22e;
  color: #f9f6f2;
}

.c4096 {
  background-color: #58554b;
  color: #f9f6f2;
}

.c8192 {
  background-color: #47535e;
  color: #f9f6f2;
}

.c16384 {
  background-color: #3d3d3d;
  color: #f9f6f2;
}

.c32768 {
  background-color: #161616;
  color: #f9f6f2;
}
</style>
