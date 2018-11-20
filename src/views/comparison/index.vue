<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-legend
        :custom="legendCustom"
        :allow-all-canceled="legendAllowAllCanceled"
        :items="legendItems"
        :on-click="legendOnClick"
      />
      <v-axis
        data-key="people"
        :grid="axisGrid"
        :label="axisLabel"
      />
      <v-bar position="time*waiting" color="#3182bd" />
      <v-smooth-line position="time*people" color="#fdae6b" :size="gemoSize" />
      <v-point shape="circle" position="time*people" color="#fdae6b" :size="gemoSize" />
    </v-chart>
  </div>
</template>

<script lang="ts" src='./index.ts'></script>
<style scoped lang="scss" src='./index.scss' ></style>