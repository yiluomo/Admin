<template>  
  <el-menu :default-active="activeIndex" unique-opened :collapse="isCollapse" :collapse-transition="false">
    <!-- 递归实现侧边栏渲染 -->
    <template v-for="(item, index) in props.menuData" :key="`${props.index}-${item.meta.id}`">
      <!-- 不存在子菜单栏时 -->
      <el-menu-item  @click="handleclick(item, `${props.index}-${item.meta.id}`)"
        v-if="!item.children || item.children.length === 0" :index="`${props.index}-${item.meta.id}`">
        <el-icon size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </el-menu-item>
     <!-- 存在子菜单栏时 -->   
      <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
        <template #title>
          <el-icon size="20">
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.name }}</span>
        </template>
        <tree-menu :menuData="item.children" :index="`${props.index}-${item.meta.id}`" />
      </el-sub-menu>

    </template>
  </el-menu>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['menuData', 'index']);
const store = useStore()
const isCollapse = computed(() => store.state.menu.isCollapse)


// 设置初始激活项
const activeIndex = ref('1-1'); // 示例初始激活项

//创建Router实例
const router = useRouter();
const handleclick = (item, active) => {
  // console.log(item, 'item');
  store.commit('addMenu',item.meta) 
  store.commit('updataMenuActive',active) 
  router.push({ path: item.meta.path });
}

</script>

<style scoped>
/* 可以在这里添加样式 */
</style>