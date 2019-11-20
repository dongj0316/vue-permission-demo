<template>
  <PermissionControl root>
    <el-alert title="模块1-1-get" :closable="false"/>
    <br>

    <PermissionControl opcode="module1-1-post">
      <el-alert title="模块1-1-post" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="module1-1-put">
      <el-alert title="模块1-1-put" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="module1-1-delete">
      <el-alert title="模块1-1-delete" :closable="false"/>
      <br>
    </PermissionControl>
  </PermissionControl>
</template>

<script>
export default {
  name: 'module1-1'
}
</script>