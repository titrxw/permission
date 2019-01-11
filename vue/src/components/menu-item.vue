<template>
  <div>
    <Menu :theme="theme" v-if="!shrink">
      <div v-for="(item, aindex) in data" :key="aindex">
        <Submenu v-if="item.menu" :name="index + '-' + aindex">
          <template slot="title">
            <Icon :type="item.icon"/>
            {{ item.text }}
          </template>
          <tree-menu :shrink="shrink" :data="item.menu" :index="index + '-' + aindex+ '-c'"></tree-menu>
        </Submenu>
        <MenuItem v-else :name="index + '-' + aindex + '-'" @click.native="go(item.url)">
          <Icon :type="item.icon"></Icon>
          {{ item.text }}
        </MenuItem>
      </div>
    </Menu>
    <Dropdown
      v-else
      style="display: flex;flex-direction: column;width:auto;"
      placement="right-start"
      v-for="(item, aindex) in data"
      :key="aindex"
    >
      <DropdownItem :key="aindex" @click.native="item.menu? '' : go(item.url)">
        <Icon :type="item.icon"></Icon>
        <span style="padding-left:10px;">{{ item.text }}</span>
      </DropdownItem>
      <DropdownMenu
        v-if="item.menu"
        :key="aindex"
        slot="list"
      >
        <tree-menu :shrink="shrink" :data="item.menu" :index="index + '-' + aindex+ '-c'"></tree-menu>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
export default {
  name: "treeMenu",
  props: {
    data: {
      type: Array
    },
    index: {
      type: [String, Number],
      default: 0
    },
    theme: {
      type: String,
      default: "dark"
    },
    shrink: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    go(path) {
      this.$router.push(path);
    }
  }
};
</script>