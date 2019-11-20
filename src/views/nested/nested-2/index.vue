<template>
  <PermissionControl root>
    <el-alert title="嵌套-1-2-get" :closable="false"/>
    <br>

    <PermissionControl opcode="nested-1-2-post">
      <el-alert title="嵌套-1-2-post" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="nested-1-2-put">
      <el-alert title="嵌套-1-2-put" :closable="false"/>
      <br>
    </PermissionControl>
    <PermissionControl opcode="nested-1-2-delete">
      <el-alert title="嵌套-1-2-delete" :closable="false"/>
      <br>
    </PermissionControl>
  </PermissionControl>
</template>