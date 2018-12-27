<template>
  <div>
        <div flex='main:justify cross:center' class='toolBar'>
            <p flex='cross:center' style='width:70%'>
                <span >命令输入：</span>
                <el-input style='width:600px' v-model.trim="cmd" @keydown.native='doCommand' placeholder="通过输入 “ [员工缩写] [工种] [数量] ” 进行连续快速计单（之间用空格隔开）"></el-input>
            </p>
            <p flex='cross:center'>
                <span style='padding-right:10px;'>切换到{{ifCharts?'表格模式':'图表模式'}}：</span>
                <i :class="ifCharts?'el-icon-tickets':'el-icon-picture-outline'" @click='ifCharts = !ifCharts'></i>
            </p>
        </div>
        <div v-show='ifCharts'>
            <div id='chart'></div>
        </div>

        <el-table :data="tableData" border style="width:100%" :max-height="600" v-show='!ifCharts'>
            <el-table-column label="员工/工种"  width="100" prop="name" fixed style="text-align:center" align="center"> </el-table-column>
            <el-table-column v-for='item in itemList' :key='item.name' :label="item.name" align="center"> 
                <template  slot-scope="scope" flex='main:center cross:center'>
                    <input type="number" class='cellInput' v-model='scope.row[scope.column.label]'  @change='recordByTable(scope.row.name,scope.column.label,$event)' @focus="$event.currentTarget.select()">
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>