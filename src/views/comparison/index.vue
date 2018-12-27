<template>
  <div class='comparisonContainer' >
    <div flex='main:right cross:center' >
      <span style='padding-right:20px;'>月份：</span>
      <el-date-picker v-model="month" type="month" size='small' style='width:120px;margin-right:20px;'  @change='freshCharts' :clearable="false" placeholder="选择月" value-format='yyyy-MM'></el-date-picker>
    </div>
    <div id='chart'></div>
    <!-- <v-chart :forceFit="true" :height="g2Config.height" :data="chartData" :scale="g2Config.scale">
      <v-tooltip/>
      <v-legend
        :custom="g2Config.legendCustom"
        :allow-all-canceled="g2Config.legendAllowAllCanceled"
        :items="g2Config.legendItems"
        :on-click="g2Config.legendOnClick"
      />
      <v-axis data-key="出货" :grid="g2Config.axisGrid" :label="g2Config.axisLabel"/>
      <v-bar position="type*计单" color="#3182bd"/>

      <v-smooth-line position="type*出货" color="#fdae6b" :size="g2Config.gemoSize"/>
      <v-point shape="circle" position="type*出货" color="#fdae6b" :size="g2Config.gemoSize"/>
    </v-chart> -->
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>