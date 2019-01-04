<template>
    <Modal
        v-model="show"
        title="添加用户"
        @on-cancel="close">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem :label-width='120' label='分类名称'  prop="domainName">
                    <Input  v-model="formValidate.domainName" placeholder="请输入分类名称"></Input>
                </FormItem>
                <FormItem :label-width='120' label='别名'  prop="name">
                    <Input  v-model="formValidate.name" placeholder="请输入别名"></Input>
                </FormItem>
            </Form>
    </Modal>
</template>

<script>
export default {
  props: {
    value: false
  },
  data() {
    return {
      show: false,
      formValidate: {
        domainName: "",
        name: ""
      },
      ruleValidate: {
        domainName: [{ required: false, message: "", trigger: "blur" }],
        name: [{ required: false, message: "", trigger: "blur" }]
      }
    };
  },
  methods:{
      close(){
          this.show = false;
          this.$emit('changeShow',this.show)
      }
  },
  watch: {
        value: function(val) {
            this.show = val;
        }
    }
};
</script>
<style scoped>
</style>
