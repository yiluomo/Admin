import{_ as M,u as P,o as U,H as D,r as f,I as L,b as _,e as O,f as $,g as t,h as z,j as v,w as l,i as y,J as j,K as H,F as J,L as q,M as G,p as A,s as Q,E as W,v as X,x as Y,y as Z,z as ee,N as te,B as ae,C as oe,O as le}from"./index-0x5QSI-3.js";const ne={class:"btns"},se={class:"pagination-info"},ie={class:"dialog-footer"},re={__name:"index",setup(de){const E=P();U(()=>{D().then(({data:a})=>{console.log(a),C.value=a.data}),p()});const s=f({pageNum:1,pageSize:10}),u=f({list:[],total:0}),k=(a={})=>{m.value=!0,q(()=>{a&&(Object.assign(n,{id:a.id,name:a.name}),c.value.setCheckedKeys(a.permission))})},N=a=>{s.pageSize=a,p()},w=a=>{s.pageNum=a,p()},p=()=>{L(s).then(({data:a})=>{const{list:e,total:i}=a.data;u.list=e,u.total=i})},g=_(),n=f({name:"",Permissions:"",id:""}),C=_([]),m=_(!1),x=()=>{m.value=!1,g.value.resetFields(),c.value.setCheckedKeys(V)},V=[4,5],c=_(),S=f({name:[{required:!0,trigger:"blur",message:"请输入权限名称"}]}),F=async a=>{a&&await a.validate((e,i)=>{if(e){const r=JSON.stringify(c.value.getCheckedKeys());G({name:n.name,permissions:r,id:n.id}).then(({data:d})=>{x(),p()})}else console.log("error submit!",i)})};return(a,e)=>{const i=A,r=Q,d=W,B=X,K=Y,h=Z,b=ee,R=te,T=ae,I=oe;return O(),$(J,null,[t(i,{route:z(E)},null,8,["route"]),v("div",ne,[t(r,{icon:z(j),type:"primary",onClick:e[0]||(e[0]=o=>k(null)),size:"small"},{default:l(()=>e[6]||(e[6]=[y("新增")])),_:1},8,["icon"])]),t(B,{data:u.list,style:{width:"100%"}},{default:l(()=>[t(d,{prop:"id",label:"id"}),t(d,{prop:"name",label:"昵称"}),t(d,{prop:"permissionName",label:"菜单权限",width:"500px"}),t(d,{label:"操作"},{default:l(o=>[t(r,{type:"primary",onClick:ue=>k(o.row)},{default:l(()=>e[7]||(e[7]=[y("编辑")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),v("div",se,[t(K,{"current-page":s.pageNum,"onUpdate:currentPage":e[1]||(e[1]=o=>s.pageNum=o),"page-size":s.pageSize,background:!1,size:"small",layout:"total, prev, pager, next",total:u.total,onSizeChange:N,onCurrentChange:w},null,8,["current-page","page-size","total"])]),t(I,{modelValue:m.value,"onUpdate:modelValue":e[5]||(e[5]=o=>m.value=o),"before-close":x,title:"添加权限",width:"500"},{footer:l(()=>[v("div",ie,[t(r,{type:"primary",onClick:e[4]||(e[4]=o=>F(g.value))},{default:l(()=>e[8]||(e[8]=[y("确认")])),_:1})])]),default:l(()=>[t(T,{ref_key:"formRef",ref:g,"label-width":"100px","label-position":"left",model:n,rules:S},{default:l(()=>[H(t(b,{props:"id"},{default:l(()=>[t(h,{modelValue:n.id,"onUpdate:modelValue":e[2]||(e[2]=o=>n.id=o)},null,8,["modelValue"])]),_:1},512),[[le,!1]]),t(b,{label:"名称",prop:"name"},{default:l(()=>[t(h,{modelValue:n.name,"onUpdate:modelValue":e[3]||(e[3]=o=>n.name=o),placeholder:"请填写权限名称"},null,8,["modelValue"])]),_:1}),t(b,{label:"权限",prop:"Permissions"},{default:l(()=>[t(R,{ref_key:"treeRef",ref:c,style:{"max-width":"600px"},data:C.value,"node-key":"id","show-checkbox":"","default-checked-keys":V,"default-expanded-keys":[2]},null,8,["data"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])],64)}}},me=M(re,[["__scopeId","data-v-64129cb6"]]);export{me as default};