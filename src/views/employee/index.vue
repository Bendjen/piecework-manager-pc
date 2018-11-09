<template>
  <div>
    <el-carousel :interval="4000" type="card" height="800px"  :autoplay="false">
    <el-carousel-item v-for="item in 6" :key="item" flex='dir:top cross:center'>
      <div flex='main:left cross:center' class='headLine'>
        <img width="128" height="128" src="@/assets/staff/default7.png" alt="">
        <div>
          <p><span>姓名：</span><span>张学礼</span></p>
          <p><span>工种：</span><span>034、054、45</span></p>
        </div>
      </div>
      <v-chart :forceFit="true" :height='600' style='width:650px;height:100%;margin-top:50px;' :data="data" :scale="scale">
        <v-tooltip />
        <v-axis />
        <v-bar position="year*sales" />
      </v-chart>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>