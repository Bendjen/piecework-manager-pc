<template>
  <div id="app">
    <Nav></Nav>
    <h1 class="navTitle">{{$route.meta.title}}</h1>
    <div class="container" flex="main:center cross:center">
      <div class="wrapper">
        <!-- <transition name="slide">  -->
          <router-view></router-view>
        <!-- </transition>  -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" src='./index.scss' scoped ></style>
<script lang="ts" src='./index.ts'  ></script>
