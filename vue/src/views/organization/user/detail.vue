<template>
  <Back :back="true" :title="'员工 -' + info.real_name + ' - 详情'">
    <Form:label-width="80">
      <FormItem label="姓名">
        {{info.real_name}}
      </FormItem>
      <FormItem label="性别">
        {{info.sex}}
      </FormItem>
      <FormItem label="工号">
        {{info.manager_no}}
      </FormItem>
      <FormItem label="电话">
        {{info.mobile}}
      </FormItem>
      <FormItem label="部门职位">
        <div v-for="(item, index) in info.department_job" :key="index">
          {{ item.department }} ： {{ item.job }}
        </div>
      </FormItem>
    </Form>
  </Back>
</template>
<script>
import api from "@/api";
import Back from "@/components/back";
export default {
  data() {
    return {
      info: {}
    };
  },
  components: {
    Back
  },
  async mounted() {
    let result = await api.managerInfo(this.$route.query.id);
    if (result) {
      this.info = result;
    }
  }
};
</script>
