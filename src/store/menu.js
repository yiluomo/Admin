const localData = localStorage.getItem('pz_csdn')

const state = localData?localData.menu:{
    isCollapse: false,
    seMenu: [],
    routerList:[],
    menuActive:'1-1'
};
const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse;
    },
    addMenu(state, payload) {
        if (state.seMenu.findIndex(item => item.path === payload.path) ===-1){
            state.seMenu.push(payload)
        }
    },
    closeMenu(state, payload) {
        //找到点击事件的索引
        const index= state.seMenu.findIndex(val=> val.name===payload.name)
        //删除指定索引
        state.seMenu.splice(index,1)
    },
    dynamicMenu(state,payload){
        console.log(payload);
        //通过glob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        console.log(modules); 
        function routerSet(router){
            router.forEach(route=>{
                //判断没有在子菜单,拼接路由数据
                if(!route.children){
                    const url = `../views${route.meta.path}/index.vue`
                    //拿到获取的vue组件
                    route.component = modules[url]
                }else{ 
                    routerSet(route.children)
                }
            })
        }
        routerSet(payload)
        //拿到完整的路由数据
        state.routerList = payload
    }  ,
    updataMenuActive(state,payload){
        state.menuActive = payload
    }
};
export default {
  state,
  mutations
}