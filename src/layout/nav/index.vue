<template>
  <div class="nav" flex="main:center cross:center">
    <div flex='dir:top main:center cross:center' class="listContainer">
      <router-link flex='dir:top main:center cross:center' to="staff">
        <img src="@/assets/nav/员工.png" ><p>员工</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="record">
        <img src="@/assets/nav/计单.png" ><p>记单</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="delivery">
        <img src="@/assets/nav/出货.png" ><p>出货</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="comparison">
        <img src="@/assets/nav/核对.png" ><p>核对</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="search">
        <img src="@/assets/nav/查询.png" ><p>查询</p>
      </router-link>
      <router-link flex='dir:top main:center cross:center' to="setting">
        <img src="@/assets/nav/设置.png" ><p>设置</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>