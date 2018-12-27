<template>
  <div class="searchContainer">
    <div flex="cross:center main:center">
      <div flex="cross:center" class="searchItem">
        <span>类型：</span>
        <el-select v-model="params.action" filterable placeholder="请选择">
          <el-option
            v-for="item in actionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div flex="cross:center" class="searchItem" v-if="params.action === 'PIECE_RECORD'">
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
      <el-button type="primary" @click="filter">筛选</el-button>
    </div>
    <div style="margin-top:60px;">
      <div id="chart"></div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>