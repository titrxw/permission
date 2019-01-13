<template>
  <div>
    <Table ref="table" title="操作管理" :columns="column" :getData="fetchList">
      <Button slot="table-operate" type="success" @click.native="edit.id = 0;edit.show = true;">添加</Button>
    </Table>
    <Edit v-model="edit.show" :rowId="edit.id" @update-list="$refs['table'].fresh()"></Edit>
  </div>
</template>

<script>
import Table from "@/components/table";
import Edit from "./operate_edit";
export default {
  components: {
    Table,
    Edit
  },
  data() {
    return {
      edit: {
        id: 0,
        show: false
      },
      column: [
        {
          title: "序号",
          key: "id",
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "别名",
          key: "alias",
          align: "center"
        },
        {
          title: "上级模块",
          key: "name",
          align: "center"
        },
        {
          title: "链接",
          key: "url",
          align: "center"
        },
        {
          title: "启用",
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
                      content: "确定要" + desc + "该操作?",
                      onOk: async () => {
                        params.row.status = params.row.status == 1 ? 0 : 1;
                        let result = await this.$api.saveOperate({
													name: params.row.name,
                          id: params.row.id,
                          status: params.row.status,
                          url: params.row.url,
                          mid: params.row.mid
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
          key: "",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  on: {
                    click: () => {
                      this.edit.id = params.row.id;
                      this.edit.show = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确定要删除该操作？",
                        onOk: async () => {
                          let result = await this.$api.deleteOperate(params.row.id);
                          if (result) {
                            this.$Notice.success({
                              title: "提示",
                              desc: "操作删除成功"
                            });
                            this.$refs["table"].reload();
                          }
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    fetchList(params) {
      return [this.$api.operateList, params];
    }
  },
  mounted: function() {
    this.$refs["table"].reload();
  }
};
</script>