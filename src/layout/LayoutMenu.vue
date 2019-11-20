<template>
  <el-aside width="200px">
    <PermissionMenuTree :routes="permissionRoutes"/>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'
import { PermissionMenuTree } from '../store/permission'

export default {
  name:  'LayoutMenu',
  components: {
    PermissionMenuTree
  },
  computed: {
    ...mapState('permission', ['permissionRoutes'])
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
</style>