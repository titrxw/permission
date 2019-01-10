<template>
  <div>
    <div class="panel-heading">模块管理</div>
    <Row style="margin-top:15px;margin-bottom:15px;padding-left:20px;">
      <Button type="info" @click="add">添加</Button>
    </Row>
    <Row style="margin-top:15px;">
      <Col span="5">
        <Tree :data="modules" @on-select-change="selectItem"></Tree>
      </Col>
      <Col span="19">
        <Form
          ref="category"
          :model="form.data"
          :rules="form.rules"
          :label-width="140"
          style="width:500px;"
        >
          <FormItem label="模块名称" prop="name">
            <Input v-model="form.data.name" placeholder="请输入模块名称"></Input>
          </FormItem>
          <FormItem label="上级模块">
            <Select v-model="form.data.pid">
              <Option :value="0">请选择</Option>
              <Option
                :value="item.id"
                v-for="(item, index) in categorys"
                :key="index"
              >{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="图标">
            <Input v-model="form.data.icon" placeholder="请输入模块图标"></Input>
          </FormItem>
          <FormItem label="描述">
            <Input v-model="form.data.desc" placeholder="请输入模块描述"></Input>
          </FormItem>
          <FormItem label="启用">
            <i-switch v-model="form.data.status" size="large" :trueValue="1" :falseValue="0">
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </i-switch>
          </FormItem>
          <FormItem>
            <Button type="info" @click="save">{{buttonTxt}}</Button>
            <Button
              type="error"
              v-if="form.data.id && form.data.id > 0"
              style="margin-left: 8px"
              @click="del"
            >删除</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import { formatTree } from "@/libs/tree";
export default {
  data() {
    return {
      buttonTxt: "添加",
      form: {
        data: {
          pid: 0,
          name: "",
          status: 1,
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: "请输入模块名称", trigger: "change" }
          ]
        }
      },
      categorys: [],
      modules: []
    };
  },
  methods: {
    async selectItem(item) {
      if (item && item[0]) {
        //   获取对应的信息
        this.form.data;
        this.buttonTxt = "修改";
      }
    },
    save() {
      this.$refs["category"].validate(async valid => {
        if (valid) {
          let result;

          if (this.form.data.id && this.form.data.id > 0) {
            result = await this.$api.saveModule(this.form.data);
          } else {
            delete this.form.data.id;
            result = await this.$api.saveModule(this.form.data);
          }

          if (result) {
            this.$Message.info("操作成功");
            this.reset();
            this.fetchList();
          }
        }
      });
    },
    add() {
      this.reset();
      this.buttonTxt = "添加";
    },
    del() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除该模块？",
        onOk: async () => {
          let result = await this.$api.deleteModule({ id: this.form.data.id });
          if (result) {
            this.$Notice.success({ title: "提示", desc: "模块删除成功" });
            this.fetchList();
            this.reset();
          }
        }
      });
    },
    reset() {
      this.form.data = {
        pid: 0,
        name: "",
        status: 1,
        desc: ''
      };
    },
    async fetchList() {
      let result = await this.$api.moduleList();
      if (result) {
        this.modules = result.children;
        this.categorys = formatTree(this.modules);
        console.log(this.categorys)
      }
    }
  },
  mounted: function() {
    this.fetchList();
  }
};
</script>