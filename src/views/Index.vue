<template>
  <div class="page-index">
    首页

    <el-button type="primary" @click="getList">点击测试 模块1-1-get</el-button>
  </div>
</template>

<script>
import { getList } from '../apis'

export default {
  name: 'index',
  methods: {
    getList () {
      getList().then(() => {
        this.$message.success('有操作权限')
      }).catch(error => {
        console.log(error)
        this.$message.warning('没有操作权限')
      })
    }
  }
}
</script>