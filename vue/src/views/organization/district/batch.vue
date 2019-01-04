<template>
	<div>
		<Exlist title='批量导入' :column="column" :data="data"  :page-size="10" :isPage = false>
		<Upload :action="apiHost + '/dealAdmin/Manager/setDistrictStore'"  :on-success="upload" name="contract" :data="uploadData" slot='action'>
            <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
        </Upload>
        <div slot='search'> 
			<Exsubmit @click="callBack">返回</Exsubmit>
		</div>
		</Exlist>
	</div>
</template>

<script>
import api from '../../../api';
import Exlist from '../../../components/ex-list.vue';
import Exsubmit from '../../../components/ex-submit.vue';
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
					title:'区域名称',
					key:'store',
					align:'center'
				},
				{
					title:'所属大区',
					key:'district',
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
			this.data = res.data;
            this.$Notice.success({
                title: '上传结果通知！',
                desc: '上传成功 ',
                duration: 15
            });
        },
        callBack() {
        	this.$router.push('/organization/district');
        }
	}
}
</script>

<style scoped>
	
</style>