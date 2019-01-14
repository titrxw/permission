<template>
  <div>
    <MMenu theme="dark" :data="menu" :shrink="shrink"></MMenu>
  </div>
</template>
<script>
import MMenu from '@/components/menu'
export default {
  data() {
    return {
      menu: []
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
  mounted: function() {
      this.$api.menu().then(res => {
        this.menu = res;
      });
  }
};
</script>
