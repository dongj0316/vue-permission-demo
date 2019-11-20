<template>
  <PermissionControl root>
    <el-alert title="模块2-1-get" :closable="false"/>
    <br>

    <PermissionControl opcode="module2-1-post">
      <el-alert title="模块2-2-post" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="module2-1-put">
      <el-alert title="模块2-2-put" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="module2-1-delete">
      <el-alert title="模块2-2-delete" :closable="false"/>
      <br>
    </PermissionControl>
  </PermissionControl>
</template>