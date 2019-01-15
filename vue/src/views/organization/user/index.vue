<template>
  <div>
    <Table ref="table" title="员工管理" :columns="column" :search="search" :getData="getData">
      <Form slot="table-operate">
        <Button type="primary" @click="add.show = true;add.id = 0;">添加</Button>
      </Form>
      <Form slot="search" ref="formInline" inline>
        <FormItem>
          <Input v-model="search.value" style="width:200px;">
            <Select v-model="search.name" slot="prepend" style="width:100px;">
              <template v-for="(item,index) in searchOption">
                <Option :value="index" :key="index">{{item}}</Option>
              </template>
            </Select>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="info" @click="$refs['table'].doSearch()">搜索</Button>
        </FormItem>
      </Form>
    </Table>
    <Edit v-model="add.show" :rowId="add.id" @update-list="$refs['table'].fresh()"></Edit>
  </div>
</template>
<script>
import Edit from "./edit.vue";
import Table from "@/components/table";

export default {
  components: {
    Edit,
    Table
  },
  data() {
    return {
      add: {
        show: false,
        id: 0
      },
      search: { name: "mobile", value: "" },
      searchOption: { mobile: "手机号", real_name: "姓名" },
      column: [
        {
          title: "序号",
          align: "center",
          render: (h, param) => {
            return h("span", {}, param.index - 0 + 1);
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "name",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.$router.push(
                      "/organization/user/detail?id=" + params.row.id
                    );
                  }
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "电话",
          align: "center",
          key: "mobile"
        },
        {
          title: "部门",
          align: "center",
          key: "department",
          width: 450
        },
        {
          title: "职位",
          align: "center",
          key: "role"
        },
        {
          title: "在职状态",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "i-switch",
                {
                  props: {
                    trueValue: 1,
                    falseValue: 0,
                    value: params.row.status
                  },
                  on: {
                    'on-change': () => {
                      let desc = params.row.status == 1 ? "禁用" : "启用";
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确定要" + desc + "该员工?",
                        onOk: async () => {
                          params.row.status = params.row.status == 1 ? 0 : 1;
                          let result = await this.$api.userStatus({
                            id: params.row.id,
                            status: params.row.status
                          });
                          if (result) {
                            this.$Notice.success({
                              title: "提示",
                              desc: "操作成功"
                            });
                            this.$refs["table"].fresh();
                          }
                        },
                        onCancel: () => {
                          this.$refs["table"].fresh();
                        }
                      });
                    }
                  }
                },
                params.row.status_text
              )
            ]);
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, param) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.add.id = param.row.id;
                      this.add.show = true;
                    }
                  }
                },
                "编辑"
              ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginLeft: "10px"
              //     },
              //     on: {
              //       click: () => {
              //         this.$Modal.confirm({
              //           title: "提示",
              //           content: "确定要重置密码？",
              //           onOk: async () => {
              //             let result = await api.resettingPassword({
              //               id: param.row.id
              //             });
              //             if (result) {
              //               this.$Message.info("操作成功");
              //             }
              //           }
              //         });
              //       }
              //     }
              //   },
              //   "重置密码"
              // )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    getData(params) {
      let searchData = [];
      if (this.search.value != "") {
        searchData[this.search.name] = this.search.value;
      }
      searchData["status"] = this.search_status;

      return [this.$api.userList, params, searchData];
    }
  },
  mounted() {
    this.$refs["table"].reload();
  }
};
</script>
