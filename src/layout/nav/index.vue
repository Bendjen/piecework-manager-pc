<template>
  <div class="nav" flex="main:center cross:center">
    <div flex='dir:top main:center cross:center' class="listContainer">
      <router-link flex='dir:top main:center cross:center' to="staff">
        <img src="@/assets/nav/证件.png" ><p>员工</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="staff">
        <img src="@/assets/nav/分钱了.png" ><p>工资</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="record">
        <img src="@/assets/nav/记录种类.png" ><p>记单</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="comparison">
        <img src="@/assets/nav/新消息.png" ><p>核对</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>