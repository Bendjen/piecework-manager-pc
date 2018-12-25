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
        <div v-if='ifCharts'>
            <v-chart :forceFit="true" :height="chartHeight" :data="chartsData" >
                <v-coord type="rect" direction="LB" />
                <v-tooltip />
                <v-legend />
                <v-axis dataKey="name" :label="label" />
                <v-stack-bar position="name*数量" color="工种" />
            </v-chart>
            <!-- <v-plugin>
                <v-slider :width="26" height="auto"
                    :data="originDv" x-axis="num" y-axis="name" :scales="{
                    time: {
                        type: 'name',
                        tickCount: 10,
                        mask: 'M/DD H:mm'
                    }
                    }"
                    :background-chart="{
                    type: 'line'
                    }"
                    :on-change="slideChange"/>
            </v-plugin> -->
        </div>

        <el-table :data="tableData" border style="width:100%" :max-height="chartHeight" v-else>
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