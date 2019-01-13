<template>
  <Modal v-model="show" title="职位编辑" @on-cancel="close" width="1000">
    <Form ref="job" :model="form" :label-width="80" :rules="ruleValidate">
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请输入职位名称"></Input>
      </FormItem>
      <FormItem label="启用">
        <i-switch v-model="form.status" size="large" :trueValue="1" :falseValue="0">
          <span slot="open">启用</span>
          <span slot="close">禁用</span>
        </i-switch>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: {
    rowId: 0,
    value: false
  },
  data() {
    return {
      show: false,
      form: {
        name: "",
        status: 1
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    async submit() {
      this.$refs["job"].validate(async valid => {
        if (valid) {
          if (this.rowId) {
            this.form.id = this.rowId;
          } else {
            delete this.form.id;
          }
          let res = await this.$api.saveJob(this.form);
          if (res) {
            this.$Notice.success({ title: "提示", desc: "操作成功" });
            this.$emit("update-list");
            this.close();
          }
        }
      });
    },
    async detail() {
      let result = await this.$api.getJob(this.rowId);
      if (result) {
        this.form = result;
      }
    }
  },
  watch: {
    value: function(val) {
      this.show = val;
    },
    rowId(val) {
      if (val) {
        this.detail();
      } else {
        this.form = {
          name: "",
          status: 1
        };
      }
    }
  }
};
</script>