<template>
<div>
	<Table ref="table" title="角色管理" :columns="column" :getData="fetchList">
		<Button slot="table-operate" type="success" @click.native="edit.id = 0;edit.show = true;">添加</Button>
	</Table>
	<Edit v-model="edit.show" :rowId="edit.id" @update-list="$refs['table'].fresh()"></Edit>
</div>
</template>

<script>
import Table from '@/components/table';
import Edit from './edit'
export default {
	components:{
		Table,
		Edit
	},
	data() {
		return {
			edit: {
				id: 0,
				show: false
			},
			column:[
				{
					title:'序号',
					key:'id',
					align:'center'
				},
				{
					title:'名称',
					key:'name',
					align:'center'
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
                          let result = await this.$api.saveRole({
                            id: params.row.id,
														status: params.row.status,
														name: params.row.status
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
					title:'操作',
					key:'',
					align:'center',
					render: (h,params) => {
						return h('Button',{
							props:{
								type:'success'
							},
							on: {
								click:() =>{
									this.edit.id = params.row.id
									this.edit.show = true
								}
							}
						},'编辑')
					}	
				},
			]
		}
	},
	methods : {
		fetchList(params) {
			return [this.$api.roleList, params]
		},
	},
	mounted: function() {
		this.$refs['table'].reload();
	}
}
</script>