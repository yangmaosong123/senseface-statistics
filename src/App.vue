<template>
<div>
    <el-row>
      <el-col :span="6">
        <el-menu  class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#545c64">
            <el-menu-item ></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
             <el-menu-item style="font-size:200%">电子信息一机一档</el-menu-item>
            <el-menu-item index="1" >权限管理</el-menu-item>
            <el-menu-item index="2">设备点位</el-menu-item>
            <el-submenu index="3">
                <template slot="title">数据分析</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
                <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">设备管理</template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
                <el-menu-item index="4-3">选项3</el-menu-item>
            </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
</div>

</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>