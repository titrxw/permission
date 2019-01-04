<template>
  <div>
    <div style="text-align:right;" v-if="back">
      <Button style="color:#2d8cf0;" size="large" icon="md-arrow-back" type="text" @click="go">返回</Button>
    </div>
    <fieldset :class="fclass">
      <legend v-if="title">{{ title }}</legend>
    </fieldset>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fclass: ""
    };
  },
  props: {
    title: {
      type: [String, Number],
      default: ""
    },
    border: {
      type: [Boolean],
      default: false
    },
    back: {
      type: [Boolean],
      default: false
    }
  },
  mounted: function() {
    let tclass = "";
    if (this.border) {
      tclass = "field-box";
    } else {
      tclass = "field-title";
    }
    this.fclass = tclass;
  },
  methods: {
    go() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.field-title {
  margin: 0px 0 10px;
  border: none;
  border-top: 1px solid #e2e2e2;
  padding: 10px;
}

.field-box {
  margin: 0px 0 20px;
  border: 1px solid #e2e2e2;
  padding: 10px;
}

legend {
  margin-left: 20px;
  padding: 0 10px;
  font-size: 20px;
  font-weight: 300;
}
</style>

