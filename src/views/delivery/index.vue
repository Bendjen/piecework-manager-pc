<template>
  <div>
        <div flex='main:justify cross:center' class='toolBar'>
            <p flex='cross:center' style='width:70%'>
                <span >命令输入：</span>
                <el-input style='width:600px' v-model.trim="cmd" @keydown.native='doCommand' placeholder="通过输入 “ [工种] [数量] ” 进行连续快速计单（之间用空格隔开）"></el-input>
            </p>
            <p>
                <i class="el-icon-plus" style='padding-right:15px;'></i>
                <i class="el-icon-setting"></i>
            </p>
        </div>
        <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
            <v-tooltip />
            <v-axis />
            <v-bar position="year*sales" />
        </v-chart>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>