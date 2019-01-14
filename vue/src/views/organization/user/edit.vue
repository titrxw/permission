<template>
  <Modal v-model="show" :title="title" @on-cancel="close" width="600">
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120" class="form-data">
      <FormItem label="姓名" prop="name">
        <Input v-model="form.name" placeholder="请输入员工姓名"></Input>
      </FormItem>
      <FormItem label="工号" prop="no">
        <Input v-model="form.no" placeholder="请输入工号"></Input>
      </FormItem>
      <FormItem label="手机号" prop="mobile">
        <Input v-model="form.mobile" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup :true-value="1" :false-value="2" v-model="form.sex">
          <Radio :label="1">
            <span>男</span>
          </Radio>
          <Radio :label="2">
            <span>女</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem prop="department_id" label="部门">
          <Select v-model="form.department_id" style="margin-bottom:10px;">
            <Option
              v-for="(itemd,indexd) in departments"
              :value="itemd.unid"
              :key="indexd"
            >{{ itemd.title }}</Option>
          </Select>
      </FormItem>
      <FormItem prop="job_id" label="职位">
          <Select v-model="form.job_id" style="margin-bottom:10px;">
            <Option
              v-for="(itemd,indexd) in roles"
              :value="itemd.unid"
              :key="indexd"
            >{{ itemd.name }}</Option>
          </Select>
      </FormItem>
      <FormItem prop="role_id" label="角色">
          <Select v-model="form.role_id" multiple  style="margin-bottom:10px;">
            <Option
              v-for="(itemd,indexd) in roles"
              :value="itemd.unid"
              :key="indexd"
            >{{ itemd.name }}</Option>
          </Select>
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
import FormValidate from "@/libs/formValidate";
export default {
  props: {
    value: false,
    rowId: 0
  },
  data() {
    return {
      title: "员工添加",
      show: false,
      departments: [],
      jobs: [],
      roles: [],
      form: {
        name: "",
        mobile: "",
        sex: 1,
        no: "",
        department_id: null,
        job_id: null,
        role_id: []
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        no: [
          {
            required: true,
            message: "请输入工号",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            validator: FormValidate.mobile,
            trigger: "change"
          }
        ],
        department_id: [
          {
            required: true,
            message: "请选择部门",
            trigger: "blur"
          }
        ],
        job_id: [
          {
            required: true,
            message: "请选择职位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.rowId) {
            this.form.id = this.rowId;
          } else {
            delete this.form.id;
          }

          let result = await this.$api.saveUser(this.form);
          if (result) {
            this.$Notice.success({
              title: "提示",
              desc: "操作成功"
            });
            this.close();
            this.$emit("update-list", false);
          }
        }
      });
    },
    close() {
      this.show = false;
      this.form = {
        name: "",
        mobile: "",
        sex: 1,
        no: "",
        department_id: null,
        job_id: null,
        role_id: []
      };
      this.$emit("input", false);
    },
    async info() {
      let result = await this.$api.getUser(this.rowId);
      if (result) {
        this.form = result;
      }
    },
    async getDepartment() {
      let result = await this.$api.departmentList(1);
      if (result) {
        this.departments = formatTree(result.children);
      }
    },
    async getJobs() {
      let result = await this.$api.jobList({status:1});
      if (result) {
        this.jobs = result.data;
      }
    },
    async getRole() {
      let result = await this.$api.roleList({status:1});
      if (result) {
        this.roles = result.data;
      }
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        this.show = val;
        this.getJobs();
        this.getDepartment();
        this.getRole();
      }
    },
    rowId (val) {
      if (val) {
        this.title = "员工编辑";
        this.info();
      } else {
        this.title = "员工添加";
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