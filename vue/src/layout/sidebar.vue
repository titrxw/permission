<template>
<div>
    <MMenu theme="dark" :data="menu"></MMenu>
    
    </div>
</template>
<script>
import MMenu from '@/components/menu'
export default {
  data() {
    return {
      open: [],
      separator: "-",
      menu: [],
      active: ""
    };
  },
  components: {
      MMenu
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
