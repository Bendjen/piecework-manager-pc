<template>
  <div flex='main:justify cross:center' class='settingContainer'>
    <div flex='dir:top cross:center main:center' @click="importData">
      <i class="iconfont piecework-manager-pc icon-download" style='color:rgb(21, 101, 192)'></i>
      <p>导入数据</p>
    </div>
    <div flex='dir:top cross:center main:center' @click="exportData">
      <i class="iconfont piecework-manager-pc icon-upload" style='color:rgb(0, 150, 136)'></i>
      <p>备份数据</p>
    </div>
    <!-- 读取文件 -->
    <input type="file" id='file' style='width:0;height:0;position:absoluted;' v-show="false">
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>