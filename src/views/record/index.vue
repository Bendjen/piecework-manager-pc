<template>
  <div>
        <p flex='main:right cross:center' class='toolBar'><i class='el-icon-refresh' @click='ifCharts = !ifCharts'></i></p>
        <div v-if='ifCharts'>123</div>
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