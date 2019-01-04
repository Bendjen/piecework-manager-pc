<template>
  <div class="employeeContainer">
    <div flex="main:right cross:center">
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="选择月"
        :clearable="false"
        @change="changeMonth"
        style="width:115px;margin-right:20px;"
      ></el-date-picker>
      <img src="@/assets/staff/money.png" @click="computeMoney" class="computeMoney">
      <i class="el-icon-plus" @click="addStaffDialog=true"></i>
    </div>
    <el-carousel
      :interval="4000"
      type="card"
      height="680px"
      :autoplay="false"
      ref="carousel"
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
        <div :id="`chart${index}`" style="width:550px;margin:5px auto"></div>
        <!-- <v-chart :forceFit="true" :height="g2Config.height"  style="width:550px;margin:5px auto" :data="chartsData[index]">
          <v-tooltip/>
          <v-axis/>
          <v-bar :position="g2Config.position" :label="g2Config.label" :color="g2Config.color"/>
        </v-chart>-->
      </el-carousel-item>
    </el-carousel>
    <div v-else class="promptText" flex="main:center cross:center">没有员工信息，请点击右上角添加员工进行添加</div>

    <el-dialog title="添加员工" :visible="addStaffDialog" width="30%">
      <p flex="main:center cross:center">
        <span style="margin-right:40px;">姓名：</span>
        <el-input v-model.trim="newStaff.name" placeholder="请输入员工姓名" style="width:300px;"></el-input>
      </p>
      <p flex="main:center cross:center" style="margin-top:20px;">
        <span style="margin-right:40px;">缩写：</span>
        <el-input v-model.trim="newStaff.short" placeholder="请用来计单的员工缩写" style="width:300px;"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStaffDialog = false">关 闭</el-button>
        <el-button
          type="primary"
          @click="addStaff"
          :disabled="!(newStaff.name && newStaff.short)"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="工资核算" :visible="salaryDialog" class="salaryDialog" width="30%">
      <div class="content">
        <p flex="main:justify cross:center"  class='thead'>
          <span>序号</span>
          <span>员工</span>
          <span>应发工资</span>
        </p>
        <p flex="main:justify cross:center" v-for="(item,index) in salaryList" :key="item.name">
          <span>{{index+1}}</span>
          <span>{{item.name}}</span>
          <span flex="main:center cross:center">
            <el-popover popper-class="popper" placement="top-start" trigger="hover">
              <div>
                <p v-if="item.total !== 0">工资明细：{{item.name}}</p>
                <div v-if="item.total !== 0">
                  <p v-for="detail in item.detail" :key="detail.type">
                    <em class="type">{{detail.type}}:</em>
                    <span>
                      <em class="num">{{detail.price}} 元</em>*
                      <em class="price">{{detail.num}} 件</em>=
                      <em class="total">{{$NP.times(detail.price,detail.num)}} 元</em>
                    </span>
                  </p>
                </div>
                <p v-else>工资明细：无</p>
              </div>
              <div
                slot="reference"
                style="cursor:pointer"
                flex="main:center cross:center"
              >{{item.total}}元</div>
            </el-popover>
          </span>
        </p>
        <div style='color:#c9c9c9;margin-top:50px;'>（将鼠标悬浮于应发工资上可查看工资明细）</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="salaryDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>