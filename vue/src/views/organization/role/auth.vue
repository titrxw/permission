<template>
  <div>
    <Tree :data="auths" @on-check-change="selectItem" show-checkbox multiple></Tree>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number]
    }
  },
  data() {
    return {
      auths: [],
      selected: []
    };
  },
  methods: {
    selectItem(e) {
      this.selected = [];
      e.forEach(element => {
        if (element.mid) {
          this.selected.push(element.unid);
        }
      });
      this.$emit("update", this.selected);
    }
  },
  async mounted() {
    let result = await this.$api.getPermiss(this.value);
    if (result) {
      this.auths = result.children;
    }
  },
  watch: {
    async value(val) {
      if (val) {
        let result = await this.$api.getPermiss(this.value);
        if (result) {
          this.auths = result.children;
        }
      }
    }
  }
};
</script>
<style scoped>
.item {
  display: block;
  width: 220px;
  float: left;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
</style>
