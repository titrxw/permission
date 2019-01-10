<template>
<div>
    <Menu theme="dark" width="auto" :active-name="active" :open-names="open" accordion v-if="!shrink">
        <div v-for="(item, index) in menu" :key="index">
            <MenuItem v-if="!item.menu" :name="index" :key="index" @click.native="onMenuItemClick(item.path)">
            <Icon :size="16" :type="item.icon"></Icon>
            {{ item.text }}
            </MenuItem>
            <Submenu v-if="item.menu" :name="index">
                <template v-if="item.text" slot="title">
                                        <Icon :size="16" :type="item.icon"></Icon>
                                        {{item.text}}
</template>
                    <MenuItem :name="index + separator + mindex" v-for="(mitem, mindex) in item.menu" :key="index + separator + mindex" @click.native="onMenuItemClick(mitem.path)">
                    <Icon :type="mitem.icon"></Icon>
                    {{ mitem.text }}
                    </MenuItem>
            </Submenu>
        </div>
    </Menu>
<template v-for="(item, index) in menu" v-else>
<div style="text-align: center;" :key="index">
    <Dropdown placement="right-start" :key="index" @on-click="onMenuItemClick">
        <Button style="color:white;width: 70px;padding:14px 0;" type="text">
                                <Icon :size="20" :type="item.icon"></Icon>
                            </Button>
        <DropdownMenu style="width: 140px;" slot="list">
            <DropdownItem :name="item.path" :key="'d' + index" v-if="!item.menu">
                <Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ item.text }}</span>
            </DropdownItem>
            <template v-for="(child, i) in item.menu" v-else>
                                                <DropdownItem :name="child.path" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ child.text }}</span></DropdownItem>
</template>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>
<script>
export default {
  data() {
    return {
      open: [],
      separator: "-",
      menu: [],
      active: ""
    };
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMenuItemClick(path) {
      this.$router.push({
        path: path
      });
    }
  },
  mounted: function() {
      this.$api.menu().then(res => {
        this.menu = res;
      });
  }
};
</script>
