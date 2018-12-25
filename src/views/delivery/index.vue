<template>
  <div class="deliveryContainer">
    <div flex="main:justify cross:center" class="toolBar">
      <p flex="cross:center" style="width:70%">
        <span>命令输入：</span>
        <el-input
          style="width:600px"
          v-model.trim="cmd"
          @keydown.native="doCommand"
          placeholder="通过输入 “ [工种] [数量] ” 进行连续快速计单（之间用空格隔开）"
        ></el-input>
      </p>
      <p>
        <i class="el-icon-plus" style="padding-right:15px;" @click="addItemDialog = true"></i>
        <i class="el-icon-setting" @click="itemListDialog = true"></i>
      </p>
    </div>
    <v-chart :forceFit="true" :height="g2Config.height" :data="exportSummary" :scale="g2Config.scale">
      <v-tooltip/>
      <v-axis/>
      <v-bar :position="g2Config.position" :label="g2Config.label" :color="g2Config.color"/>
    </v-chart>

    <el-dialog title="添加型号" :visible.sync="addItemDialog" width="25%">
      <div>
        <p class="line" flex="main:center cross:center">
          <span>型号名称：</span>
          <el-input style="width:200px;" v-model.trim="newItem.name" placeholder="请输入型号名称"></el-input>
        </p>
        <p class="line" flex="main:center cross:center">
          <span>单价：</span>
          <el-input
            type="number"
            style="width:200px;"
            v-model.trim="newItem.price"
            placeholder="请输入型号单价"
          ></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="addItem" :disabled="!(newItem.name && newItem.price)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="型号管理" :visible.sync="itemListDialog" width="30%">
      <div v-if="itemList.length >0">
        <p class="itemLine" flex="main:center cross:center">
          <span>序号</span>
          <span>名称</span>
          <span>价格</span>
          <span>操作</span>
        </p>
        <div style="max-height:400px;overflow-y:auto">
          <p
            v-for="(item,index) in itemList"
            :key="index"
            class="itemLine"
            flex="main:center cross:center"
          >
            <span>{{index+1}}</span>
            <input
              type="text"
              class="opacityInput"
              :value="item.name"
              @click="$event.currentTarget.select()"
              @change="changeName(item.name,$event)"
            >
            <input
              type="number"
              class="opacityInput"
              :value="item.price"
              @click="$event.currentTarget.select()"
              @change="changePrice(item.name,$event)"
            >
            <i class="el-icon-close" @click="deleteItem(item.name)"></i>
          </p>
        </div>
      </div>
      <div v-else flex="main:center cross:center">
        <p style="font-size:16px;">没有任何型号,
          <span
            style="color:#4089ca;text-decoration: underline;cursor:pointer"
            @click="addItemDialog = true"
          >去添加</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="itemListDialog = false">取 消</el-button>
        <el-button type="primary" @click="addItem" :disabled="!(newItem.name && newItem.price)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style lang="scss" src='./index.scss' ></style>