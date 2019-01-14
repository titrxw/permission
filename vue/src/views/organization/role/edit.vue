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
    <Auth @update="authUpdate" v-if="show" v-model="unid"></Auth>
    <div slot="footer">
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </Modal>
</template>
<script>
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
      unid:'',
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
    reset() {
      this.form = {
          name: "",
          status: 0,
          auths: []
        };
        this.unid = ''
    },
    close() {
      this.rowId == 0 && this.reset();
      this.$emit("input", false);
    },
    authUpdate (data) {
      this.form.auths = data
    },
    async submit() {
      this.$refs["auth"].validate(async valid => {
        if (valid) {
          if (this.rowId) {
            this.form.id = this.rowId
          } else {
            delete this.form.id
          }
          let res = await this.$api.saveRole(this.form);
          if (res) {
            this.$Notice.success({ title: "提示", desc: "操作成功" });
            this.$emit("update-list");
            this.close();
          }
        }
      });
    },
    async detail() {
      let result = await this.$api.getRole(this.rowId);
      if (result) {
        this.unid = result.unid
        this.form = result;
      }
    }
  },
  watch: {
    value: function(val) {
      this.show = val;
    },
    rowId (val) {
      if (val) {
        this.detail();
      } else {
        this.reset()
      }
    }
  }
};
</script>