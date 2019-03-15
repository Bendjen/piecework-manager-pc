<template>
  <div flex='main:justify cross:center' class='settingContainer'>
    <div flex='dir:top cross:center main:center' @click="importData" class='item'>
      <i class="iconfont piecework-manager-pc icon-download" style='color:rgb(21, 101, 192)'></i>
      <p>导入数据</p>
    </div>
    <div flex='dir:top cross:center main:center' @click="exportData" class='item'>
      <i class="iconfont piecework-manager-pc icon-upload" style='color:rgb(0, 150, 136)'></i>
      <p>备份数据</p>
    </div>
    <div flex='dir:top cross:center main:center' @click="clearData" class='item'>
      <i class="iconfont piecework-manager-pc icon-lajixiang" style='color:#1296db'></i>
      <p>清空数据</p>
    </div>
    <div flex='dir:top cross:center main:center' @click="shakeData" class='item'>
      <i class="iconfont piecework-manager-pc icon-choujiang" style='color:#d4237a'></i>
      <p>随机数据</p>
    </div>
    <!-- 读取文件 -->
    <input type="file" id='file' style='width:0;height:0;position:absoluted;' v-show="false">
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>