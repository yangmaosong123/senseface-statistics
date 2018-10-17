<template>
<div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="抓拍/告警数据可视化" name="first"></el-tab-pane>
        <el-tab-pane label="抓拍/告警数据统计表" name="second"></el-tab-pane>
    </el-tabs>
    <el-card>
        
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
            <el-col :span="6">
                <el-form-item label="开始时间:">
                     <el-date-picker v-model="ruleForm.startTime" type="date" placeholder="选择开始日期"   value-format="yyyy-MM-dd"    @blur="handleCompareTheSize"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="结束时间:">
                     <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择结束日期"  value-format="yyyy-MM-dd"    @blur="handleCompareTheSize"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="3">
                <el-button :disabled="formDisabled" type="primary" @click="find" >查询</el-button>
                 <el-button :disabled="formDisabled" type="primary" @click="find">导出</el-button>
            </el-col>
        </el-row>
    </el-form>
    </el-card>

    <div class="custom-tree-container">
        <div class="block">
            <el-row>
                <el-col :span="8">
                    <p>区域</p>
                </el-col>
                <el-col :span="8">
                    <p>抓拍数</p>
                </el-col>
                <el-col :span="8">
                    <p>告警数</p>
                </el-col>
            </el-row>
             <el-tree
                :data="cityData"
                node-key="id"
                :expand-on-click-node="false"
                :render-content="renderContent">
    </el-tree>          
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        const data = [{
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
                label: '二级 3-2'
            }]
        }];
        return {
            activeName: 'first',
            ruleForm: {
                satrtTime: "",
                endTime: "",
            },
            cityData: JSON.parse(JSON.stringify(data)),
            formDisabled: false,//查询（导出）按钮控制
        }
    },
    methods: {
        //树形结构
        renderContent(h, {node, data,store}) {
            return ( 
                < span class = "custom-tree-node" >
                    <span > {node.label} </span>
                     <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
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
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    border: 1px;
}
</style>
