<template>
  <div>
    <div flex='main:right cross:center'>
      <img src="@/assets/staff/money.png" @click='computeMoney' class='computeMoney'>
      <i class="el-icon-plus" @click='addStaff'></i>
    </div>
    <el-carousel :interval="4000" type="card" height="680px"  :autoplay="false">
      <el-carousel-item v-for="(item,index) in staffList" :key="item" >
        <i class="el-icon-close" @click='deleteStaff'></i>
        <span class='number'>{{index+1}}</span>
        <div flex='main:center cross:center' class='headLine'>
          <img width="156" height="156" src="@/assets/staff/default7.png" alt="">
          <div>
            <p><span>姓名：</span><input @change='staffNameChange' @click='$event.currentTarget.select()' class='opacityInput' type="text" :value='item'></p>
            <p><span>工种：</span><span>034、054、45</span></p>
          </div>
        </div>
        <v-chart :forceFit="true" :height="height" style='width:650px;margin:5px auto' :data="data">
          <v-tooltip />
          <v-axis />
          <v-legend />
          <v-stack-bar position="月份*月均降雨量" color="name" />
        </v-chart>
      </el-carousel-item>
    </el-carousel>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :show-close = 'true'
      width="80%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>