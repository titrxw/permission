<template>
  <div>
    <div class="panel-heading">部门结构</div>
    <Row style="margin-top:15px;margin-bottom:15px;padding-left:20px;">
      <Button type="info" @click="add">添加</Button>
    </Row>
    <Row style="margin-top:15px;">
      <Col span="5">
        <Tree :data="departments" @on-select-change="selectItem"></Tree>
      </Col>
      <Col span="19">
        <Form
          ref="category"
          :model="form.data"
          :rules="form.rules"
          :label-width="140"
          style="width:500px;"
        >
          <FormItem label="部门名称" prop="name">
            <Input v-model="form.data.name" placeholder="请输入部门名称"></Input>
          </FormItem>
          <FormItem label="上级部门">
            <Select v-model="form.data.parent_id">
              <Option :value="0">请选择</Option>
              <Option
                :value="item.id"
                v-for="(item, index) in categorys"
                :key="index"
              >{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="别名">
            <Input v-model="form.data.alias" placeholder="请输入部门别名"></Input>
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
import api from "@/api";
import { formatTree } from "@/libs/tree";
export default {
  data() {
    return {
      buttonTxt: "添加",
      form: {
        data: {
          parent_id: 0,
          name: "",
          alias: "",
          status: 1
        },
        rules: {
          name: [
            { required: true, message: "请输入区域名称", trigger: "blur" }
          ]
        }
      },
      categorys: [],
      departments: []
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
            result = await api.updateDepartment(this.form.data);
          } else {
            delete this.form.data.id;
            result = await api.departmentAdd(this.form.data);
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
        content: "确定要删除该部门？",
        onOk: async () => {
          let result = await api.deleteDepartment({ id: this.form.data.id });
          if (result) {
            this.$Notice.success({ title: "提示", desc: "部门删除成功" });
            this.fetchList();
            this.reset();
          }
        }
      });
    },
    reset() {
      this.form.data = {
        parent_id: 0,
        name: "",
        alias: "",
        status: 1
      };
    },
    async fetchList() {
      let result = await api.departmentList();
      if (result) {
        this.departments = result.children;
        this.categorys = formatTree(this.data);
      }
    }
  },
  mounted: function() {
    this.fetchList();
  }
};
</script>