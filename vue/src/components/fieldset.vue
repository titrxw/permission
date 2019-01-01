<template>
  <fieldset :class="fclass">
  <legend>{{ content }}</legend>
  <slot></slot>
  </fieldset>
</template>
<script>
export default {
  data () {
    return {
      fclass: ''
    }
  },
  props: {
    content: {
      type: [String, Number],
      default: ''
    }
  },
  mounted: function () {
    let tclass = ''
    if (this.content === '') {
        tclass = 'hide'
    }
    if (this.$slots.default) {
      tclass += 'field-content'
    } else {
      tclass += 'field-title'
    }
    this.fclass = tclass
  }
}
</script>
<style scoped>
.field-title {
    margin: 10px 0 10px;
    border: none;
    border-top: 1px solid #e2e2e2;
}
.field-content {
    margin: 10px 0 20px;
    border-top: 1px solid #e2e2e2;
}
legend {
    margin-left: 20px;
    padding: 0 10px;
    font-size: 20px;
    font-weight: 300;
}
.hide{
  display: none;
}
</style>

