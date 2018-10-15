<template >
<div>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="抓拍/告警数据可视化" name="first">抓拍/告警数据可视化</el-tab-pane>
        <el-tab-pane label="抓拍/告警数据统计表" name="second">抓拍/告警数据统计表</el-tab-pane>
        </el-tabs>
    </div>
    <div>
        
    </div>
   
</div>
     
</template>
<script>
export default {
    data(){
        return{
          activeName:'first'  
        }
    },
    methods:{
        handleClick:function(tab, event){

        }
    }

}
</script>
