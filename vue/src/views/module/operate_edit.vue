<template>
  <Modal v-model="show" :title="title" @on-cancel="close" width="600">
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120" class="form-data">
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请输入操作名称"></Input>
      </FormItem>
      <FormItem label="链接" prop="url">
        <Input v-model="form.url" placeholder="请输入操作链接"></Input>
      </FormItem>
      <FormItem label="别名" prop="alias">
        <Input v-model="form.alias" placeholder="请输入操作别名"></Input>
      </FormItem>
      <FormItem prop="mid" label="所属模块">
        <Select v-model="form.mid" style="margin-bottom:10px;">
          <Option
            v-for="(itemd,indexd) in modules"
            :value="itemd.unid"
            :key="indexd"
          >{{ itemd.title }}</Option>
        </Select>
      </FormItem>

      <FormItem label="启用">
        <i-switch v-model="form.status" size="large" :trueValue="1" :falseValue="0">
          <span slot="open">启用</span>
          <span slot="close">禁用</span>
        </i-switch>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button size="large" @click="close" style="margin-right:20px;">取消</Button>
      <Button type="primary" size="large" @click="handleSubmit">提交</Button>
    </div>
  </Modal>
</template>

<script>
import { formatTree } from "@/libs/tree";
export default {
  props: {
    value: false,
    rowId: 0
  },
  data() {
    return {
      title: "操作添加",
      show: false,
      modules: [],
      form: {
        name: "",
        url: "",
        mid: "",
        status: 1,
        alias: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入操作名称",
            trigger: "change"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入链接",
            trigger: "change"
          }
        ],
        mid: [
          {
            required: true,
            message: "请选择所属模块",
            trigger: "change"
          }
        ],
        alias: [
          {
            required: true,
            message: "请输入操作别名",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(async valid => {
        if (!valid) {
          return false;
        }
        if (this.rowId) {
          this.form.id = this.rowId;
        } else {
          delete this.form.id;
        }
        let result = await this.$api.saveOperate(this.form);

        if (result) {
          this.$Notice.success({
            title: "提示",
            desc: "操作成功"
          });
          this.$emit("update-list", false);
          this.close();
        }
      });
    },
    reset () {
      this.form = {
          name: "",
          url: "",
          mid: "",
          status: 1,
          alias: ""
        };
    },
    close() {
      this.rowId == 0 && this.reset()
      this.show = false;
      this.$emit("input", false);
    },
    async info() {
      let result = await this.$api.getOperate(this.rowId);
      if (result) {
        this.form = result;
      }
    },
    async getModules() {
      let result = await this.$api.moduleList();
      if (result) {
        this.modules = formatTree(result.children);
      }
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        this.show = val;
        this.getModules();
      }
    },
    rowId(val) {
      if (val) {
        this.title = "操作编辑";
        this.info();
      } else {
        this.reset()
        this.title = "操作添加";
      }
    }
  }
};
</script>
<style scoped>
.form-data {
  width: 80% !important;
}
</style>