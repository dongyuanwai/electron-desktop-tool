<template>
    <div>
        <img class="back-box" src="/public/back.png" @click="back" alt="">
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const back = () => {
    router.go(-1);
};


</script>

<style scoped></style>
<style scoped lang="less">
.back-box {
    width: 40px;
    height: 40px;
    position: fixed;
    left: 30px;
    top: 30px;
}
</style>
