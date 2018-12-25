<template>
  <div class='employeeContainer'>
    <div flex="main:right cross:center">
      <img src="@/assets/staff/money.png" @click="computeMoney" class="computeMoney">
      <i class="el-icon-plus" @click="addStaffDialog=true"></i>
    </div>
    <el-carousel
      :interval="4000"
      type="card"
      height="680px"
      :autoplay="false"
      ref = "carousel"
      v-if="staffList.length > 0"
    >
      <el-carousel-item v-for="(item,index) in staffList" :key="item.id" :name="item.name">
        <i class="el-icon-close" @click="deleteStaff(item.name)"></i>
        <span class="number">{{index + 1}}</span>
        <div flex="main:center cross:center" class="headLine">
          <img width="156" height="156" src="@/assets/staff/default7.png" alt>
          <div>
            <p>
              <span>姓名：</span>
              <input
                @change="staffNameChange(item.name,$event)"
                @click="$event.currentTarget.select()"
                class="opacityInput"
                type="text"
                :value="item.name"
              >
            </p>
            <p>
              <span>缩写：</span>
              <input
                @change="staffShortChange(item.short,$event)"
                @click="$event.currentTarget.select()"
                class="opacityInput"
                type="text"
                :value="item.short"
              >
            </p>
          </div>
        </div>
        <v-chart :forceFit="true" :height="g2Config.height"  style="width:550px;margin:5px auto" :data="chartsData[index]">
          <v-tooltip/>
          <v-axis/>
          <v-bar :position="g2Config.position" :label="g2Config.label" :color="g2Config.color"/>
        </v-chart>
      </el-carousel-item>
    </el-carousel>
   <div v-else class='promptText' flex='main:center cross:center'>没有员工信息，请点击右上角添加员工进行添加</div>

    <el-dialog title="添加员工" :visible="addStaffDialog"  width="30%">
      <p flex='main:center cross:center'>
        <span style='margin-right:40px;'>姓名：</span>
        <el-input v-model.trim="newStaff.name" placeholder="请输入员工姓名" style='width:300px;'></el-input>
      </p>
      <p flex='main:center cross:center' style='margin-top:20px;'>
        <span style='margin-right:40px;'>缩写：</span>
        <el-input v-model.trim="newStaff.short" placeholder="请用来计单的员工缩写" style='width:300px;'></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStaffDialog = false">关 闭</el-button>
        <el-button type="primary" @click="addStaff" :disabled="!(newStaff.name && newStaff.short)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>