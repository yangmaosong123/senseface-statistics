<template>
<div>  
    <el-card class="search">
        <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="开始时间:">
                        <el-date-picker type="date" v-model="ruleForm.startTime"  @blur="handleCompareTheSize" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="结束时间:">
                        <el-date-picker type="date" v-model="ruleForm.endTime" @blur="handleCompareTheSize" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-button :disabled="formDisabled" type="primary" @click="find">查询</el-button>
                    <el-button :disabled="formDisabled" type="primary" @click="find">导出</el-button>
                </el-col>
            </el-row>
        </el-form>

         <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="抓拍/告警数据可视化">抓拍/告警数据可视化</el-tab-pane>
            <el-tab-pane label="抓拍/告警数据统计表"> 
                  <div class="custom-tree-container">      
                    <el-tree :data="cityData" node-key="id" :expand-on-click-node="false" :render-content="renderContent">
                    </el-tree>
                </div> 
            </el-tab-pane> 
        </el-tabs>  
    </el-card> 
</div>
</template>

<script>
export default {
    data() {
        const data = [
            {id:-1,label:"区域"},
            {
            id: 1,
            label: '昆明市',
            children: [{
                    id: 4,
                    label: '五华区',
                },
                {
                    id: 9,
                    label: '西山区',
                }
            ]
        }, {
            id: 2,
            label: '曲靖市',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
        }, {
            id: 3,
            label: '丽江市',
            children: [{
                id: 7,
                label: '二级 3-1'
            }, {
                id: 8,
                label: '二级 3-2',
                children:[
                    {id: 9,  label: '3级 3-1-1'},
                    {id: 10,  label: '3级 3-1-2'},
                ],
            }]
        }];
        return {
            activeName: 'first',
            ruleForm: {
                satrtTime: "",
                endTime: "",
            },
              formDisabled: false,//控制查询（导出）按钮
            cityData: JSON.parse(JSON.stringify(data)),
        }
    },
    methods: {
        renderContent(h, {
            node,
            data,
            store
        }) {

           if(node.data.id==-1){
                return ( <
                    span class = "custom-tree-node tree-title" >
                        <span> {node.label} </span> 
                        <span style="width:300px" class = "custom-num">
                            <span>抓拍数</span> 
                            <span>警告数</span>  
                        </span> 
                    </span>); 
           }

           var i=Math.floor(Math.random()*20000);
            var j=Math.floor(Math.random()*200000);
            data.i=i;
            data.j=j;
            return ( 
                <span class = "custom-tree-node">
                        <span> {node.label} </span> 
                        <span style="width:300px" class="custom-num">
                            <span>{data.i}</span> 
                            <span>{data.j}</span> 
                        </span> 
                    </span>);
                },
         //时间控制
      handleCompareTheSize() {
        let _this = this;
        if (_this.ruleForm.startTime && _this.ruleForm.endTime)
          if (_this.ruleForm.startTime > _this.ruleForm.endTime) {
            _this.$message({
              type: 'warning',
              message: '开始时间必须小于结束时间，请返回修改！'
            });
            _this.formDisabled = true;
          } else _this.formDisabled = false;
        else _this.formDisabled = false;
      },

        }

    }
</script>

<style>
.search{
    margin:20px;
    text-align:center;
    min-height:500px;
}
.custom-tree-container{
    width:100%;    
    margin-top:30px;     
    border: 1px solid #ebeef5;
    border-radius:3px;
    padding:30px;
}
.custom-num{
    display: flex;
    justify-content: space-between;
    flex-direction:row;    
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px; 
}


/*每行有底线，行高最小50*/
.el-tree-node__content{
    border-bottom:1px solid #ebeef5;
    min-height:50px;
}

/*标题为粗体*/
.el-tree>.el-tree-node:first-child{    
    font-weight: bold;
} 

 
</style>
