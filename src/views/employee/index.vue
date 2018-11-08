<template>
  <div>
      12345
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>