<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon class="icon" size="20" @click="store.commit('collapseMenu')">
                <Fold />
            </el-icon>
            <ul class='flex-box'>
                <li v-for="(item, index) in selectMenu" :key="item.path" :class='{selected:route.path ===item.path}' class="tab flex-box"
                    @mouseover="selectTab(index)" @mouseout="deselectTab(index)">
                    <el-icon size="12">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link :to="item.path" class="text flex-box">
                        {{ item.name }}
                    </router-link>
                    <el-icon size="12" class="close" :class="{ 'visible': selectedIndex === index }" @click="closeTab(item,index)">
                        <Close />
                    </el-icon>
                </li>
            </ul>
        </div>
        <div class="header-right">
            <el-dropdown @command="handleClick">
                <div class="el-dropdown-link flex-box">
                    <el-avatar src="userInfo.avatar" />
                    <p class="user-name">{{userInfo.name}}</p>
                </div>
                <template #dropdown>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute ,useRouter} from "vue-router";

// 拿到store的实例
const store = useStore();
//当前的路由对象
const route = useRoute();
const router = useRouter();
const selectMenu = computed(() => store.state.menu.seMenu);

const userInfo = JSON.parse(localStorage.getItem('pz_userInfo'))

const selectedIndex = ref(-1);

const selectTab = (index) => {
    selectedIndex.value = index;
};

const deselectTab = (index) => {
    if (selectedIndex.value === index) {
        selectedIndex.value = -1;
    }
};
//点击关闭tag
const closeTab = (item, index) => {
    if (!item || typeof index !== 'number' || index < 0) {
        console.error('Invalid parameters for closeTab');
        return;
    }
    try {
        store.commit("closeMenu", item);
    } catch (error) {
        console.error('Error closing menu:', error);
        return;
    }
    // 判断删除的是否当前页
    if (route.path !== item.path) {
        return;
    }
    const selectedMenuData = selectMenu.value;
    const menuLength = selectedMenuData.length;
    try {
        if (index >= menuLength) {
            if (menuLength > 0) {
                router.push({ path: selectedMenuData[menuLength - 1].path });
            } else {
                router.push({ path: '/' });
            }
        } else {
            router.push({ path: selectedMenuData[index].path });
        }
    } catch (error) {
        console.error('Error navigating to new path:', error);
    }
}
const handleClick = (command) => {
    if (command === 'cancel') {
        localStorage.removeItem('pz_token');//清除token
        localStorage.removeItem('pz_userInfo');//清除token
        localStorage.removeItem('pz_csdn');
        window.location.href =window.location.origin;
    }
}
</script>

<style scoped>
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .header-left {
        height: 100%;

        .icon {
            width: 45px;
            height: 100%;
        }

        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }

        .tab {
            padding: 0 10px;
            height: 100%;
            .text {
                margin: 0 5px;
            }

            .close {
                visibility: hidden;
            }

            .visible {
                visibility: visible;
                cursor: pointer;
                color: #000;
            }
            &.selected {
                a{
                    color:#409eff
                }
                i{
                    color:#409eff
                }
                background-color: #f5f5f5;
            }
        }

        .tab:hover {
            background-color: #f5f5f5;
        }
    }

    .header-right {
        .user-name {
            margin-left: 10px;
        }
    }

    a {
        height: 100%;
        color: #333;
        font-size: 15px;
    }
}
</style>