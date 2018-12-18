<template>
  <div>
        <div flex='main:justify cross:center' class='toolBar'>
            <p flex='cross:center' style='width:70%'>
                <span >命令输入：</span>
                <el-input style='width:600px' v-model.trim="cmd" @keydown.native='doCommand' placeholder="通过输入 “ [员工姓名首字母] [工种] [数量] ” 进行连续快速计单（之间用空格隔开）"></el-input>
            </p>
            <p flex='cross:center'>
                <span style='padding-right:10px;'>切换到{{ifCharts?'表格模式':'图表模式'}}：</span>
                <i :class="ifCharts?'el-icon-tickets':'el-icon-picture-outline'" @click='ifCharts = !ifCharts'></i>
            </p>
        </div>

            <v-chart :forceFit="true" :height="chartHeight" :data="chartsData"  v-if='ifCharts'>
                <v-slider :data="chartsData" xAxis='name' yAxis='name' />
                <v-coord type="rect" direction="LB" />
                <v-tooltip />
                <v-legend />
                <v-axis dataKey="name" :label="label" />
                <v-stack-bar position="name*数量" color="工种" />
            </v-chart>
    

        <el-table :data="tableData" border style="width:100%" :height="chartHeight" v-else>
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