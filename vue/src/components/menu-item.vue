<template>
  <Menu>
    <div v-for="(item, aindex) in data" :key="aindex">
      <Submenu v-if="item.menu" :name="index + '-' + aindex">
        <template slot="title">
          <Icon :type="item.icon"/>
          {{ item.text }}
        </template>
        <tree-menu :data="item.menu" :index="index + '-' + aindex+ '-c'"></tree-menu>
      </Submenu>
      <MenuItem v-else :name="index + '-' + aindex + '-'">
        <Icon :type="item.icon"></Icon>
        {{ item.text }}
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
export default {
  name: "treeMenu",
  props: {
    data: {
      type: Array
    },
    index: {
      type: [String, Number]
    }
  }
};
</script>