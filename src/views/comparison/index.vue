<template>
  <div class='comparisonContainer' >
    <div flex='main:right cross:center' >
      <span style='padding-right:20px;'>月份：</span>
      <el-date-picker v-model="month" type="month" size='small' style='width:120px;margin-right:20px;'  @change='freshCharts' :clearable="false" placeholder="选择月" value-format='yyyy-MM'></el-date-picker>
    </div>
    <div id='chart'></div>
    <!-- <div id="slider"></div> -->
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>