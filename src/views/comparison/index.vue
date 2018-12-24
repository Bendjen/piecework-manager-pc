<template>
  <div class='comparisonContainer' >
    <div flex='main:right cross:center' >
      <span style='padding-right:20px;'>月份：</span>
      <el-date-picker v-model="month" type="month" size='small' style='width:120px;margin-right:20px;'  :clearable="false" placeholder="选择月" value-format='yyyy-MM'></el-date-picker>
    </div>
    
    <v-chart :forceFit="true" :height="height" :data="chartData" :scale="scale">
      <v-tooltip/>
      <v-legend
        :custom="legendCustom"
        :allow-all-canceled="legendAllowAllCanceled"
        :items="legendItems"
        :on-click="legendOnClick"
      />
      <v-axis data-key="export" :grid="axisGrid" :label="axisLabel"/>
      <v-bar position="type*piece" color="#3182bd"/>

      <v-smooth-line position="type*export" color="#fdae6b" :size="gemoSize"/>
      <v-point shape="circle" position="type*export" color="#fdae6b" :size="gemoSize"/>
    </v-chart>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>