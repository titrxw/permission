<template>
  <div>
    <Table ref="table" title="用户管理" :columns="column" :search="search" :getData="getData">
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
    <Edit v-model="add.show" :rowId="add.id" @updateList="$refs['table'].fresh()"></Edit>
    <Operation v-model="OperStatus" :id='rowId' @loadList='loadList'></Operation>
     <Modal
        v-model="modelStatus"
        title="提示"
        @on-ok="sub"
        @on-cancel="cancel">
        <p>是否{{nowData.enabled_status==1?"禁用":"开启"}}此用户？</p>
    </Modal>
  </div>
</template>
<script>
import Edit from "./edit.vue";
import Operation from "./operation.vue";
import api from "@/api";
import Table from "@/components/table";

export default {
  components: {
    Edit,
    Operation,
    Table
  },
  data() {
    return {
      rowId:0,
      modelStatus:false,
      OperStatus:false,
      nowData:{

      },
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
          key: "real_name",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.$router.push(
                      "/organization/manager/detail?id=" + params.row.id
                    );
                  }
                }
              },
              params.row.real_name
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
                "div",
                {
                  style: {
                    color: params.row.status==2?'blue':'',
                    cursor:params.row.status==2?'pointer':''
                  },
                  on: {
                    click: () => {
                      if(params.row.status!=2)return false;

                      this.OperStatus = true;
                      console.log(params.row.id)
                      this.rowId = params.row.id;
                    }
                  }
                },
                params.row.status_text
              )
            ]);
          }
        },
        {
          title: "状态",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modelStatus = true;
                      this.nowData = params.row;
                    }
                  }
                },
                params.row.enabled_status==1?"禁用":"开启"
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
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确定要重置密码？",
                        onOk: async () => {
                          let result = await api.resettingPassword({
                            id: param.row.id
                          });
                          if (result) {
                            this.$Message.info("操作成功");
                          }
                        }
                      });
                    }
                  }
                },
                "重置密码"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    loadList(e){
      this.OperStatus = e;
      this.$refs["table"].reload();
    },
    async sub(){
      let result = await api.changeManagerStatus({
        id:this.nowData.id,
        status:this.nowData.enabled_status==1?2:1
      });
      if(result){
        this.nowData={};
        this.modelStatus = false;
        this.$refs["table"].reload();
      }
    },
    cancel(){
      this.modelStatus = false;
      this.nowData = {};
    },
    getData(params) {
      let searchData = [];
      if (this.search.value != "") {
        searchData[this.search.name] = this.search.value;
      }
      searchData["status"] = this.search_status;

      return [api.managerList, params,searchData];
    }
  },
  mounted() {
    this.$refs["table"].reload();
  }
};
</script>
