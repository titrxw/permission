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
      <FormItem>
        <Button type="info" @click.native="endTime = '';$refs['table'].reload()">全部</Button>
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
      endTime: '',
      columns: [
        {
          title: "合同编号",
          key: "contract_no"
        },
        {
          title: "合同价（元）",
          key: "contract_price"
        },
        {
          title: "成交价（元）",
          key: "contract_deal_price"
        },
        {
          title: "应收收入（元）",
          key: "profit"
        },
        {
          title: "实收收入（元）",
          key: "actual_profit"
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
          title: "应得业绩（元）",
          key: "person_profit"
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
      return [api.monthlyPerformance, params, search];
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
