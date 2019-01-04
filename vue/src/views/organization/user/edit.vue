<template>
  <Modal v-model="show" :title="title" @on-cancel="close" width="600">
    <Form
      ref="formData"
      :model="formData"
      :rules="ruleValidate"
      :label-width="120"
      class="form-data"
    >
      <FormItem label="姓名" prop="real_name">
        <Input v-model="formData.real_name" placeholder="请输入员工姓名"></Input>
      </FormItem>
      <FormItem label="工号" prop="manager_no">
        <Input v-model="formData.manager_no" placeholder="请输入工号"></Input>
      </FormItem>
      <FormItem label="手机号" prop="mobile">
        <Input v-model="formData.mobile" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem label="员工类型" prop="status">
        <Select v-model="formData.status">
          <Option
            v-for="(item,index) in managerStatus"
            :value="parseInt(index)"
            :key="index"
          >{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup :true-value="1" :false-value="2" v-model="formData.sex">
          <Radio label="1">
            <span>男</span>
          </Radio>
          <Radio label="2">
            <span>女</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem
        v-for="(items, index) in formData.department_role"
        :key="index -0 + 2"
        label="部门职位 "
      >
        <Row>
          <Col span="18">
            <Select v-model="items.department_id" style="margin-bottom:10px;">
              <Option
                v-for="(itemd,indexd) in departmentData"
                :value="itemd.id"
                :key="indexd"
              >{{ itemd.title }}</Option>
            </Select>

            <Select v-model="items.role_id">
              <Option
                v-for="(itemr,indexr) in roleData"
                :value="parseInt(itemr.id)"
                :key="indexr"
              >{{ itemr.name}}</Option>
            </Select>
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemove(index)" type="error" v-if="false">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="false">
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button size="large" @click="close" style="margin-right:20px;">取消</Button>
      <Button type="primary" size="large" @click="handleSubmit">提交</Button>
    </div>
  </Modal>
</template>

<script>
import api from "@/api";
import { formatTree } from "@/libs/tree";
export default {
  props: {
    value: false,
    rowId: 0
  },
  data() {
    return {
      title: "员工添加",
      show: false,
      departmentData: [],
      roleData: [],
      formData: {
        real_name: "",
        mobile: "",
        sex: "1",
        manager_no: "",
        department_role: [],
        status: 2
      },
      managerStatus: [],
      ruleValidate: {
        real_name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        manager_no: [
          {
            required: true,
            message: "请输入工号",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择员工类型",
            trigger: "blur",
            type: "number"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["formData"].validate(async valid => {
        if (valid) {
          for (var i = 0; i < this.formData.department_role.length; i++) {
            if (
              !this.formData.department_role[i].department_id ||
              !this.formData.department_role[i].role_id
            ) {
              this.$Message.warning("请完善部门职位信息");
              return;
            }
          }

          let result;
          if (this.rowId) {
            this.formData.id = this.rowId;
            result = await api.managerUpdate(this.formData);
          } else {
            delete this.formData.id;
            result = await api.managerAdd(this.formData);
          }

          if (result) {
            this.$Message.info("操作成功");
            this.close()
            this.$emit("updateList", false);
          }
        }
      });
    },
    close() {
			this.show = false;
			this.$emit('input', false)
    },
    async getDataList() {
      let result = await api.managerDetail({ id: this.rowId });
      if (result) {
        if (result.department_role.length > 0) {
          for (var i = 0; i < result.department_role.length; i++) {
            result.department_role[i].department_id = parseInt(
              result.department_role[i].department_id
            );
            result.department_role[i].role_id = parseInt(
              result.department_role[i].role_id
            );
          }
        } else {
          result.department_role = [
            {
              department_id: "",
              role_id: ""
            }
          ];
        }

        result.status = parseInt(result.status);
        this.formData = result;
      }
    },
    reset() {
      this.formData.real_name = "";
      this.formData.sex = "1";
      this.formData.manager_no = "";
      this.formData.mobile = "";
      this.formData.department_role = [
        {
          department_id: "",
          role_id: ""
        }
      ];
      this.formData.status = 2;
    },
    handleRemove(index) {
      this.formData.department_role.splice(index, 1);
    },
    handleAdd() {
      this.formData.department_role.push({
        department_id: 0,
        role_id: 0
      });
    },
    async getDepartment() {
      let result = await api.departmentList();
      if (result) {
        this.departmentData = formatTree(result.children);
      }
    },
    async getRole() {
      let result = await api.getRole();
      if (result) {
        this.roleData = result.data;
      }
    },
    async getManagerStatus() {
      let result = await api.getManagerStatus();
      if (result) {
        this.managerStatus = result;
      }
    }
  },
  mounted: function() {},
  watch: {
    value: function(val) {
      if (val) {
        this.getRole();
        this.getManagerStatus();
        this.getDepartment();
        this.show = val;
        if (this.rowId > 0) {
          this.title = "员工编辑";
          this.getDataList();
        } else {
          this.reset();
        }
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