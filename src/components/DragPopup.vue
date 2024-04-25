<template>
    <div v-if="visible" :class="['shadeBox', isCenterShow ? 'centerShow' : '']" @click.self="closePopUp()">
        <div class="popUpBox" id="popUpBox">
            <div class="popUpContent">
                <slot></slot>
            </div>
            <div class="popUpTitle popUpTitle-bottom" id="popUpTitle" @pointerdown="pointerdownVerticalFun"
                @pointerup="pointerupVerticalFun" @pointermove="pointermoveVerticalFun">
                <div class="titleContent">
                    <span class="titleTxt">{{ popUpTitle }}</span>
                </div>
                <div @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, withDefaults } from "vue";
const emit = defineEmits(["closePopUp", "update:visible"]);

interface Props {
    visible?: boolean;
    fixedX?: number;
    fixedY?: number;
    popUpTitle?: string;
    type?: string;
    isCenterShow?: boolean;
    isHandFlag?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    visible: false,
    fixedX: 0,
    fixedY: 0,
    popUpTitle: '拖拽此处',
    type: 'left',
    isCenterShow: false,
    isHandFlag: false,
})
console.log("props", props)

const dataMap = reactive({
    isMoving: false,
    dragX: 0,
    dragY: 0,
});

const pointerdownVerticalFun = (e: MouseEvent) => {
    dataMap.isMoving = true;
    const popUpBox = document.getElementById("popUpBox");
    if (popUpBox) {
        dataMap.dragX = e.clientX - popUpBox.offsetLeft;
        dataMap.dragY = e.clientY - popUpBox.offsetTop;
    }
};

const pointermoveVerticalFun = (e: MouseEvent) => {
    const popUpBox = document.getElementById("popUpBox");
    if (dataMap.isMoving && popUpBox) {
        let left = e.clientX - dataMap.dragX;
        let top = e.clientY - dataMap.dragY;
        if (left < 0) {
            left = 0;
        } else if (left > window.innerWidth - popUpBox.offsetWidth) {
            left = window.innerWidth - popUpBox.offsetWidth;
        }
        if (top < 0) {
            top = 0;
        } else if (top > window.innerHeight - popUpBox.offsetHeight) {
            top = window.innerHeight - popUpBox.offsetHeight;
        }
        popUpBox.style.top = top + "px";
        popUpBox.style.left = left + "px";
    }
};

const pointerupVerticalFun = () => {
    dataMap.isMoving = false;
};

const closePopUp = () => {
    emit("closePopUp", 'bg')
};
const close = () => {
    emit('update:visible', !props.visible);
}

onMounted(() => {
    const popUpBox = document.getElementById("popUpBox");
    if (!props.isCenterShow && popUpBox) {
        if (props.type == 'left') {
            popUpBox.style.top = props.fixedY + "px";
            popUpBox.style.left = props.fixedX + "px";
        } else if (props.type == 'right') {
            popUpBox.style.top = props.fixedY + "px";
            popUpBox.style.right = props.fixedX + "px";
        }
    }
});


</script>

<style lang="less" scoped>
.centerShow {
    display: flex;
    align-items: center;
    justify-content: center;
}

.shadeBox {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: transparent;
    user-select: none;

    .popUpBox {
        min-width: 100px;
        position: fixed;
        // background: #F2F5F8;
        box-shadow: 0px 4px 12px 0px rgba(8, 2, 2, 0.16);


        .popUpTitle {
            touch-action: none;
            padding: 0 24px;
            box-sizing: border-box;
            height: 56px;
            line-height: 56px;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 8px 8px 0 0;
            padding: 0 24px;
            box-sizing: border-box;

            .titleContent {
                display: flex;
                align-items: center;

                .titleTxt {
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.85);
                }
            }

            .minimizeBtn {
                width: 24px;
                height: 24px;
            }
        }

        .popUpTitle-bottom {
            line-height: 100%;
        }

        .popUpContent {
            min-height: 400px;
            min-height: 10px;
            background: #F2F5F8;
            border-radius: 0 0 8px 8px;
        }
    }
}
</style>