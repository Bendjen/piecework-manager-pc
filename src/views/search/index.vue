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
    <el-dialog title="记录编辑" :visible.sync="dialogVisible" width="30%" class="editContainer">
      <div>
        <p flex="main:justify cross:center">
          <span>编辑时间：</span>
          <el-input v-model="chooseData.time" disabled placeholder="请输入内容" style="width:260px;"></el-input>
        </p>
        <p flex="main:justify cross:center">
          <span>工种：</span>
          <el-select v-model="chooseData.type" filterable placeholder="请选择" style="width:260px;">
            <el-option
              v-for="item in itemTypeList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </p>
        <p flex="main:justify cross:center" v-if="params.action == 'PIECE_RECORD'">
          <span>员工：</span>
          <el-select v-model="chooseData.staff" filterable placeholder="请选择" style="width:260px;">
            <el-option
              v-for="item in staffList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </p>
        <p flex="main:justify cross:center">
          <span>数量：</span>
          <el-input
            type="number"
            v-model.trim="chooseData.num"
            placeholder="请输入内容"
            style="width:260px;"
          ></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editRecord">修 改</el-button>
        <el-button type="danger" size="small" @click="deleteRecord">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>