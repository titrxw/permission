<template>
  <Modal v-model="show" :title="title" @on-cancel="close" width="600">
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120" class="form-data">
      <FormItem label="姓名" prop="real_name">
        <Input v-model="form.real_name" placeholder="请输入员工姓名"></Input>
      </FormItem>
      <FormItem label="工号" prop="manager_no">
        <Input v-model="form.manager_no" placeholder="请输入工号"></Input>
      </FormItem>
      <FormItem label="手机号" prop="mobile">
        <Input v-model="form.mobile" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup :true-value="1" :false-value="2" v-model="form.sex">
          <Radio label="1">
            <span>男</span>
          </Radio>
          <Radio label="2">
            <span>女</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem prop="department_job" v-for="(items, index) in form.department_job" :key="index" label="部门">
        <Row>
          <Col span="18">
            <Select v-model="items.department_id" style="margin-bottom:10px;">
              <Option
                v-for="(itemd,indexd) in departments"
                :value="itemd.id"
                :key="indexd"
                :disabled="itemd.disabled"
              >{{ itemd.title }}</Option>
            </Select>

            <Select v-model="items.job_id">
              <Option
                v-for="(itemr,indexr) in jobs"
                :value="itemr.id"
                :key="indexr"
              >{{ itemr.name}}</Option>
            </Select>
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemove(index)" type="error" v-if="false">删除</Button>
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
      form: {
        real_name: "",
        mobile: "",
        sex: "1",
        manager_no: "",
        department_job: [
          {
            department_id: null,
            job_id: null
          }
        ]
      },
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
            validator: FormValidate.mobile,
            trigger: "change"
          }
        ],
        department_job: [
          {
            required: true,
            message: "请选择部门职位",
            trigger: "change",
            type: 'array'
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          let result = this.form.department_job.every(function(item) {
            if (item.department_id <= 0 || item.job_id <= 0) {
              return false;
            }
          });
          if (!result) {
            this.$Message.warning("请完善部门职位信息");
            return false;
          }

          if (this.rowId) {
            this.form.id = this.rowId;
            result = await api.managerUpdate(this.form);
          } else {
            delete this.form.id;
            result = await api.managerAdd(this.form);
          }

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
        real_name: "",
        mobile: "",
        sex: "1",
        manager_no: "",
        department_job: [
          {
            department_id: null,
            job_id: null
          }
        ]
      };
      this.$emit("input", false);
    },
    async info() {
      let result = await api.managerDetail({ id: this.rowId });
      if (result) {
        if (result.department_job.length <= 0) {
          result.department_job = [
            {
              department_id: null,
              job_id: null
            }
          ];
        }
        this.form = result;
      }
    },
    handleRemove(index) {
      this.form.department_job.splice(index, 1);
    },
    handleAdd() {
      this.form.department_job.push({
        department_id: null,
        job_id: null
      });
    },
    async getDepartment() {
      let result = await api.departmentList();
      if (result) {
        this.departments = formatTree(result.children);
      }
    },
    async getJobs() {
      let result = await api.getJobs();
      if (result) {
        this.jobs = result.data;
      }
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        this.show = val;
        this.getJobs();
        this.getDepartment();
        if (this.rowId > 0) {
          this.title = "员工编辑";
          this.info();
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