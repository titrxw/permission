<template>
	<div>
        <Exlist  title='岗位管理' :column="column" :data="data"   @fetch-list="fetchList" :isPage='false'>
         	
        </Exlist>
  	</div>
</template>

<script>
import api from '../../../api';
import Exlist from '../../../components/ex-list.vue';
export default {
	components:{
		Exlist
	},
	data() {
		return {
			data:[],
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
					title:'操作',
					key:'',
					align:'center',
					render: (h,params) => {
						return h('Button',{
							props:{
								type:'info'
							},
							style:{
								
							},
							on: {
								click:() =>{
									this.$Message.warning('请联系管理员');
								}
							}
						},'设置权限')
					}	
				},
			]
		}
	},
	methods : {
		async fetchList() {
			let res = await api.authNameList();
			if(res){
				this.data = res;
			}
		},
	},
	mounted: function() {
		this.fetchList();
	}
}
</script>

<style>
	
</style>