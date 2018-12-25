<template>
  <div class="searchContainer">
    <div flex="cross:center main:center">
      <div flex="cross:center" class="searchItem">
        <span>类型：</span>
        <el-select v-model="params.action" filterable placeholder="请选择">
          <el-option
            v-for="item in actionList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </div>
      <div flex="cross:center" class="searchItem" v-if="params.action === '计单'">
        <span>员工：</span>
        <el-select v-model="params.staff" filterable placeholder="请选择">
          <el-option
            v-for="item in staffList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div flex="cross:center" class="searchItem">
        <span>工种：</span>
        <el-select v-model="params.type" filterable placeholder="请选择">
          <el-option
            v-for="item in itemTypeList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div flex="cross:center" class="searchItem">
        <span>时间：</span>
        <el-date-picker v-model="params.month" type="month" placeholder="选择月" :clearable="false"></el-date-picker>
      </div>
      <el-button type="primary" @click='filter'>筛选</el-button>
    </div>
    <div style="margin-top:60px;">
      <v-chart :forceFit="true" :height="height" :data="chartsData">
        <v-legend :custom="true" :clickable="false" :items="items"/>
        <v-axis/>
        <v-tooltip/>
        <v-bar position="type*money" shape="waterfall" :color="color" :tooltip="tooltip"/>
      </v-chart>
    </div>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>