<template>
  <div class="back-btn">
      <Button type="primary" @click="back">
        <Icon type="chevron-left"></Icon>
          返回
      </Button>
    </div>
</template>
<script>
export default {
  props: {
    href: {
      type: [String],
      default: 'BACK'
    }
  },
  methods: {
    back () {
      if (/^javas/.test(this.href) || !this.href) return
      const useRouter = typeof this.href === 'object' || (this.$router && typeof this.href === 'string' && !/http/.test(this.href))
      if (useRouter) {
        this.href === 'BACK' ? this.$router.go(-1) : this.$router.push(this.href)
      } else {
        window.location.href = this.href
      }
    }
  }
}
</script>
<style scoped>
  .back-btn{
    margin-bottom:13px;
  }
</style>
