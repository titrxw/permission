<template>
<div>
	<Table ref="table" title="职位管理" :columns="column" :getData="fetchList">
		<Button slot="table-operate" type="success" @click.native="edit.id = 0;edit.show = true;">添加</Button>
	</Table>
	<Edit v-model="edit.show" :rowId="edit.id"></Edit>
</div>
</template>

<script>
import api from '@/api';
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
                    falseValue: 0
                  },
                  on: {
                    click: () => {}
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
		async fetchList(params) {
			return [api.roleList, params]
		},
	},
	mounted: function() {
		this.$refs['table'].reload();
	}
}
</script>