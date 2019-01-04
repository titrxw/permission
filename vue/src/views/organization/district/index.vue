<template>
  <div>
    <Exlist
      title="业务人员配置"
      :nowPage="page"
      :column="column"
      :data="data"
      :total="total"
      @fetch-list="fetchList"
    >
    </Exlist>
    <Modal v-model="changeShow" width="600">
      <p slot="header">
        <span>重新选择</span>
      </p>
      <div style="display: flex;margin-bottom: 20px;">
        <Input v-model="changeData.search">
          <Select v-model="changeData.value" slot="prepend" style="width: 80px">
            <Option value="real_name">姓名</Option>
            <Option value="mobile">手机号</Option>
          </Select>
        </Input>
        <Button type="primary" @click="searchManager">搜索</Button>
      </div>

      <Table :columns="columns" :data="managerData" border></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import api from "@/api";
import Exlist from "@/components/ex-list.vue";
export default {
  components: {
    Exlist
  },
  data() {
    return {
      changeShow: false,
      changeData: {
        search: "",
        value: "",
        role_id: 0
      },
      rowId: 0,
      managerData: [],
      total: 0,
      data: [],
      page: 1,
      uploadData: {
        token: sessionStorage.getItem("token")
      },
      column: [
        {
          title: "序号",
          key: "id",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.index - 0 + 1);
          }
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "所属大区",
          key: "parent",
          align: "center"
        },
        {
          title: "权证责任人",
          key: "warrant_name",
          align: "center",
          render: (h, params) => {
            let authority_status = false;
            if (params.row.warrant_name) {
              authority_status = true;
            }

            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "dashed"
                  },
                  style: {
                    width: "100px"
                  },
                  on: {
                    click: () => {
                      this.rowId = params.row.id;
                      this.changeData.role_id = 3;
                      this.changeShow = true;
                      this.searchManager();
                    }
                  }
                },
                authority_status ? params.row.warrant_name : "绑定责任人"
              )
            ]);
          }
        },
        {
          title: "信贷责任人",
          key: "credit_name",
          align: "center",
          render: (h, params) => {
            let credit_status = false;
            if (params.row.credit_name) {
              credit_status = true;
            }

            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "dashed"
                  },
                  style: {
                    width: "100px"
                  },
                  on: {
                    click: () => {
                      this.rowId = params.row.id;
                      this.changeData.role_id = 8;
                      this.changeShow = true;
                      this.searchManager();
                    }
                  }
                },
                credit_status ? params.row.credit_name : "绑定责任人"
              )
            ]);
          }
        }
      ],
      columns: [
        {
          title: "姓名",
          key: "real_name",
          align: "center"
        },
        {
          title: "电话",
          key: "mobile",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "info"
                },
                on: {
                  click: async () => {
                    let res = await api.setDistricStore({
                      id: this.rowId,
                      manager_id: params.row.id
                    });
                    if (res) {
                      this.$Message.info("操作成功");
                      this.changeShow = false;
                      this.changeData.role_id = 0;
                      this.fetchList(this.page);
                    }
                  }
                }
              },
              "绑定"
            );
          }
        }
      ]
    };
  },
  methods: {
    async fetchList(page) {
      if (page) {
        this.page = page;
      } else {
        this.page = 1;
      }

      let res = await api.districStoreList({ page: this.page });
      if (res) {
        this.data = res.data;
        this.total = res.total;
      }
    },
    async searchManager() {
      let search = [];

      search["role_id"] = this.changeData.role_id;
      if (this.changeData.search && this.changeData.value) {
        search[this.changeData.value] = this.changeData.search;
      }

      let res = await api.createSignList(search);
      if (res) {
        this.managerData = res;
      }
    }
  },
  mounted: function() {
    this.fetchList();
  },
  watch: {
    changeShow: function() {
      if (!this.changeShow) {
        this.changeData.search = "";
        this.changeData.value = "";
      }
    }
  }
};
</script>