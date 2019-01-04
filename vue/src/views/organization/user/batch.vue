<template>
	<div>
		<Exlist title='批量导入' :column="column" :data="data"  :page-size="10" :isPage = false>
		<div slot='action'>
			<Upload :action="apiHost + 'dealAdmin/manager/batchaddmanager'"  :on-success="upload" name="managers" :data="uploadData" class='uploadContent' :show-upload-list='false'>
	            <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
	        </Upload>
	        <a href="http://zh5j.cn/doc/template/人员名单.csv" style='margin-left:20px;'>点击下载批量添加人员模板</a>	        
		</div>
		        
        <div slot='search'> 
			<Exsubmit @click="callBack">返回</Exsubmit>
		</div>
		</Exlist>
	</div>
</template>

<script>
import api from '@/api';
import Exlist from '@/components/ex-list.vue';
import Exsubmit from '@/components/ex-submit.vue';
export default {
	components: {
		Exlist,
		Exsubmit
	},
	data() {
		return {
			data:[
				
			],
			column:[
				{
					title:'姓名',
					key:'real_name',
					align:'center'
				},
				{
					title:'手机号',
					key:'mobile',
					align:'center'
				},	
				{
					title:'岗位',
					key:'role',
					align:'center'
				},
				{
					title:'工号',
					key:'manager_no',
					align:'center'
				},
				{
					title:'性别',
					key:'sex',
					align:'center'
				},	
				{
					title:'所属大区',
					key:'district_id',
					align:'center'
				},
				{
					title:'所属小区',
					key:'store_id',
					align:'center'
				},							
			],
			uploadData:{
				token: sessionStorage.getItem('token')
			}
		}
	},
	methods: {
		upload(res, file){
			this.data = res.data.data;
            this.$Notice.success({
                title: '上传结果通知！',
                desc: '上传成功 '+res.data.total+' 条',
                duration: 15
            });
        },
        callBack() {
        	this.$router.push('/organization/manager');
        }
	}
}
</script>

<style scoped>
.uploadContent{
	display: inline-block !important; 
}	
.table-toolbar{
	margin-bottom:0 !important;
	padding-bottom:0 !important;
}
</style>