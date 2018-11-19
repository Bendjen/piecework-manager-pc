<template>
  <div>
        <p flex='main:right cross:center' class='toolBar'><i class='el-icon-refresh' @click='ifCharts = !ifCharts'></i></p>
        <v-chart :forceFit="true" :height="300" :data="data" v-if='ifCharts'> 
            <v-tooltip />
            <v-axis />
            <v-legend />
            <v-stack-bar position="月份*月均降雨量" color="name" />
        </v-chart>

        <el-table :data="tableData" border style="width:100%" height="680" v-else>
            <el-table-column label="员工/工种"  width="100" prop="name" fixed style="text-align:center" align="center"> </el-table-column>
            <el-table-column v-for='item in itemList' :key='item.name' :label="item.name" align="center"> 
                <template  slot-scope="scope" flex='main:center cross:center'>
                    <input type="text" class='cellInput' v-model='scope.row[scope.column.label]' @focus="$event.currentTarget.select()">
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>