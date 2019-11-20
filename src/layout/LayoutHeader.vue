<template>
  <el-header>
    header
    <OpEditro/>
  </el-header>
</template>

<script>
import OpEditro from '../mock/OpEditor'

export default {
  name: 'LayoutHeader',
  components: {
    OpEditro
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
</style>