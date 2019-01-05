<template>
  <Modal v-model="show" title="角色编辑" @on-cancel="close" width="1000">
    <Divider orientation="left">基本信息</Divider>
    <Form ref="auth" :model="form" :label-width="80" :rules="ruleValidate">
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem label="启用">
        <i-switch v-model="form.status" size="large" :trueValue="1" :falseValue="0">
          <span slot="open">启用</span>
          <span slot="close">禁用</span>
        </i-switch>
      </FormItem>
    </Form>
    <Divider orientation="left">权限</Divider>
    <Auth v-model="form.auths"></Auth>
    <div slot="footer">
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </Modal>
</template>
<script>
import api from "@/api";
import Auth from "./auth";
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
        status: 0,
        auths: []
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
  components: {
    Auth
  },
  methods: {
    close() {
      this.form = {
        name: "",
        status: 0,
        auths: []
      };
      this.$emit("input", false);
    },
    async submit() {
      this.$refs["auth"].validate(async valid => {
        if (valid) {
          if (this.rowId) {
            this.form.id = this.rowId
            // update
          } else {
            // add
          }
          let res = true;
          if (res) {
            this.$Notice.success({ title: "提示", desc: "操作成功" });
            this.$emit("update-list");
            this.close();
          }
        }
      });
    },
    async detail() {
      let result = await api.roleInfo(this.rowId);
      if (result) {
        this.form = result;
      }
    }
  },
  watch: {
    value: function(val) {
      this.show = val;
      if (val) {
        this.detail();
      }
    }
  }
};
</script>