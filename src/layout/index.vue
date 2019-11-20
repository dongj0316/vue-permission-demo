<template>
  <el-container class="layout">
    <LayoutMenu/>
    <el-container class="layout-main">
      <LayoutHeader/>
      <el-main class="layout-main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from './LayoutHeader'
import LayoutMenu from './LayoutMenu'

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutMenu
  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  &-main {
    flex-direction: column;
  }
}
</style>