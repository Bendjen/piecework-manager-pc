<template>
  <div class='searchContainer'>
    <div flex='cross:center main:center'>
      <div flex='cross:center' class='searchItem'>
        <span>员工：</span>
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
      <div flex='cross:center' class='searchItem'>
        <span>工种：</span>
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
      <div flex='cross:center' class='searchItem'>
        <span>时间：</span>
        <el-date-picker
          v-model="value8"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div style='margin-top:60px;'>
        <v-chart :forceFit="true" :height="height" :data="data">
          <v-legend :custom="true" :clickable="false" :items="items" />
          <v-axis />
          <v-tooltip />
          <v-bar position="type*money" shape="waterfall" :color="color" :tooltip="tooltip" />
        </v-chart>
    </div>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>