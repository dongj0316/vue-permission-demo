<template>
  <div class="op-editor">
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点我修改权限
    </el-button>

    <el-drawer
      title="仅测试"
      custom-class="op-editor-drawer"
      size="80%"
      :visible.sync="drawer">
      <div style="padding: 20px;height:100%;overflow: auto">
        <el-table :data="routes" row-key="name" default-expand-all size="mini">
          <el-table-column property="meta.title" label="菜单名" width="150px"></el-table-column>
          <el-table-column property="name" label="操作权限">
            <template slot-scope="scope">
              <template v-if="!routeNameMap[scope.row.name]">
                无
              </template>
              <template v-else>
                <template v-for="op in routeNameMap[scope.row.name]">
                  <el-checkbox v-model="op.checked" @change="onChange($event, op, routeNameMap[scope.row.name], scope.row)" :label="op.name" :key="op.opcode"></el-checkbox>
                </template>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="onSave" type="primary">保 存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import operations, { setLocalOp, getLocalOp } from './operations'

export default {
  name: 'op-editor',
  data () {
    const localOp = getLocalOp()
    const formatedOperations = operations.map(op => ({
      ...op,
      checked: localOp.some(o => o.opcode === op.opcode)
    }))
    const routeNameMap = {}
    formatedOperations.forEach(op => {
      if (!routeNameMap[op.routeName]) {
        routeNameMap[op.routeName] = formatedOperations.filter(v => v.routeName === op.routeName)
      }
    })

    return {
      drawer: false,
      operations: formatedOperations,
      routeNameMap
    }
  },
  computed: {
    ...mapState('permission', ['permissionRoutesCopy']),
    routes () {
      return this.permissionRoutesCopy.slice(0, this.permissionRoutesCopy.length - 1)
    }
  },
  methods: {
    onChange (val, op, ops, route) {
      const isRequireChange = route.meta.requireOps.indexOf(op.opcode) > -1

      if (!val) {
        if (isRequireChange) {
          ops.forEach(p => {
            p.checked = false
          })
        }
      } else {
        if (!isRequireChange) {
          ops.filter(p => route.meta.requireOps.indexOf(p.opcode) > -1).forEach(p => {
            p.checked = true
          })
        }
      }
    },
    onSave () {
      const operations = this.operations.filter(op => op.checked)

      setLocalOp(operations)
      window.location.reload()
    }
  }
}
</script>

<style lang="less">
.op-editor-drawer {
  .el-drawer__body {
    overflow: hidden;
  }
}
</style>
<style lang="less" scoped>
.op-editor {
  display: inline-block;
}
</style>