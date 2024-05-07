<template>
    <button @click="begainScreen">截屏</button>
  
    <img class="box-img" :src="imgSrc" alt="">
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import ScreenShot from "js-web-screen-shot";
  import { getDesktopCapturerSource, getInitStream } from '@/utils/tool'
  
  const imgSrc = ref("")
  const begainScreen = async () => {
    // 下面这两块自己考虑  
    const sources = await getDesktopCapturerSource(); // 这里返回的是设备上的所有窗口信息
    // 这里可以对`sources`数组下面id进行判断  找到当前的electron窗口  这里为了简单直接拿了第一个
    console.log("sources", sources);
    const stream = await getInitStream(sources.filter(e => e.name == "董员外")[0]);
    console.log("🚀 ~ doScreenShot ~ stream:", stream)
  
    new ScreenShot({
      enableWebRtc: true, // 启用webrtc
      screenFlow: stream!, // 传入屏幕流数据
      level: 999,
      completeCallback: callback,
    });
  }
  
  
  const callback = (base64data: any) => {
    console.log("base64data", base64data);
    imgSrc.value = base64data.base64
  }
  
  </script>
  
  <style scoped lang="less">
  .box-img{
      width: 200px;
      position: fixed;
      right: 10px;
      top: 10px;
      border: 2px solid red; 
  }
  </style>