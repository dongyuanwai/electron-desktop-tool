<template>
    <h1>
      这是 second 页面
    </h1>
    <DragPopup v-model:visible="show" :isCenterShow="show"  >
      <div class="box">12121</div>
    </DragPopup>
    <button @click="go">去first页面</button>
    <button @click="show=!show">开启popup</button>
  </template>
  
  <script setup lang="ts">
  import {ref} from 'vue';
  import { useRouter } from 'vue-router';
  import DragPopup from '../../components/DragPopup.vue';
  const router = useRouter()
  const go = () => {
    router.push('/');
  };
  
  const show = ref(false)
  
  </script>
  
  <style scoped>
  
  </style>
  <style scoped lang="less">
  .box{
    width: 300px;
    height: 300px;
  }
  </style>


