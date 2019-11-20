<template>
  <PermissionControl root>
    <el-alert title="模块3-2-get" :closable="false"/>
    <br>

    <PermissionControl opcode="module3-2-post">
      <el-alert title="模块3-2-post" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="module3-2-put">
      <el-alert title="模块3-2-put" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="module3-2-delete">
      <el-alert title="模块3-2-delete" :closable="false"/>
      <br>
    </PermissionControl>
  </PermissionControl>
</template>