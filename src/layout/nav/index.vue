<template>
  <div class="nav">
    <ul flex='dir:top main:center cross:center'>
      <li flex='dir:top main:center cross:center'><img src="@/assets/nav/分钱了.png" ><p>工资</p></li>
      <li flex='dir:top main:center cross:center'><img src="@/assets/nav/记录种类.png" ><p>报表</p></li>
      <li flex='dir:top main:center cross:center'><img src="@/assets/nav/新消息.png" ><p>结算</p></li>
      <router-link flex='dir:top main:center cross:center' to="staff">
        <img src="@/assets/nav/证件.png" ><p>员工</p>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>