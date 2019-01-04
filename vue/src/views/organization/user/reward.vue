<template>
  <Table
    style="margin-top:15px;"
    ref="table"
    :columns="columns"
    :getData="getData"
  >
  <Form ref="formInline" inline slot="search">
      <FormItem>
        <DatePicker
          :transfer="true"
          @on-change="monthChange"
          type="month"
          placeholder="月份选择"
          style="width: 200px"
        ></DatePicker>
      </FormItem>
    </Form>
  </Table>
</template>
<script>
import Table from "@/components/table";
import api from "@/api";
export default {
  props: {
    value: {
      type: [Number, String]
    }
  },
  data() {
    return {
      columns: [
        {
          title: "合同编号",
          key: "contract_no"
        },
        {
          title: "经纪人",
          key: "manager_name"
        },
        {
          title: "成交时间",
          key: "deal_time"
        },
        {
          title: "分单类型",
          key: "results_type"
        },
        {
          title: "分单业绩",
          key: "profit"
        },
        {
          title: "带训奖基数",
          key: "salary_base"
        },
        {
          title: "带训奖级别",
          key: "level"
        },
        {
          title: "带训奖",
          key: "salary"
        },
        {
          title: "是否核发",
          key: "status_text"
        }
      ]
    };
  },
  components: {
    Table
  },
  methods: {
    getData(params) {
      let search = {deal_time: this.endTime}
      params["manager_id"] = this.value;
      return [api.myTeachReward, params, search];
    },
    monthChange(e) {
      this.endTime = e;
      this.$refs["table"].doSearch();
    }
  },
  async mounted() {
    this.$refs["table"].reload();
  }
};
</script>
