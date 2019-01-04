<template>
    <div>
        <div class="panel-heading">组织架构</div>
        <Row style="margin-top:15px;margin-bottom:15px;padding-left:20px;">
            <Button type="info" @click="add">添加</Button>
        </Row>
        <Row style="margin-top:15px;">
        <Col span="5">
            <Tree :data="data" @on-select-change="selectItem"></Tree>
        </Col>
        <Col span="19">
            <Form ref="category" :model="form.data" :rules="form.rules" :label-width="140" style="width:500px;">
                <FormItem label="组织名称" prop="name">
                    <Input v-model="form.data.name" placeholder="请输入组织名称"></Input>
                </FormItem>
                <FormItem label="组织类型" prop="type">
                    <Select v-model="form.data.type">
                        <Option :value="index" v-for="(item, index) in type" :key="index">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="上级组织" prop="parent_id">
                    <Select v-model="form.data.parent_id">
                        <Option :value="0">请选择</Option>
                        <Option :value="item.id" v-for="(item, index) in categorys" :key="index">{{ item.title }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="区域四至" prop="" v-if="form.data.type == 2">
                    <Input v-model="limit[0]" style="margin-bottom: 5px;">
				        <span slot="append">以南</span>
				    </Input>
				    <Input v-model="limit[1]" style="margin-bottom: 5px;">
				        <span slot="append">以北</span>
				    </Input>
				    <Input v-model="limit[2]" style="margin-bottom: 5px;">
				        <span slot="append">以东</span>
				    </Input>
				    <Input v-model="limit[3]" style="margin-bottom: 15px;">
				        <span slot="append">以西</span>
				    </Input>
                </FormItem>
                <FormItem>
                    <Button type="info" @click="save">{{buttonTxt}}</Button>
                    <Button type="error" v-if="form.data.id && form.data.id > 0" style="margin-left: 8px" @click="del">删除</Button>
                </FormItem>
            </Form>
        </Col>
        </Row>
    </div>
</template>
<script>
import api from "@/api";
import { formatTree } from "@/libs/tree";
export default {
    data() {
        const vParent = (rule, value, callback) => {
            if (value < 0) {
                callback(new Error("请选择上级组织"));
            }
          
            callback();
        };

        return {
            buttonTxt: "添加",
            form: {
                data: {
                    id: "",
                    parent_id: 0,
                    name: "",
                    type:'',
                    info:[],
                },
                rules: {
                    name: [
                        {required: true,message: "请输入区域名称",trigger: "blur"}
                    ],
                    parent_id: [
                        {required: true,validator: vParent,trigger: "blur"}
                    ],
                    type: [
                        {required: true,validator: vParent,trigger: "blur"}
                    ],
                }
            },
            categorys: [],
            data: [],
            type:[],
            limit:[]
        };
    },
    methods: {
        async selectItem(item) {
            if (item && item[0]){
                let res = await api.departmentdetail({id: item[0]['id']});
                res.parent_id = parseInt(res.parent_id);
                this.form.data = res;
                if(res.info){
                	if(res.info.limit){
                		this.limit = res.info.limit;
                	}               	
                }else{
                	this.form.data.info = [];
                	this.limit = [];
                }
                
                this.buttonTxt = "修改";
            }
        },
        save() {
            this.$refs["category"].validate(async valid => {
                if (valid) {
                	let result;
                	if(this.limit.length > 0 && this.limit.length < 4){
                		this.$Message.warning('请完善区域四至信息');
                		return false;
                	}
                	
                	if(this.limit.length == 4){
                		let msg = '';
                		for(var i = 0; i < this.limit.length; i++){
                			if(!this.limit[i]){
                				msg = '请完善区域四至信息';
                				break;
                			}
                		}
                		
                		if(msg){
                			this.$Message.warning(msg);
                			return false;
                		}               		
                	}
                	
                	if(this.limit.length == 4){
                		this.form.data.info['limit'] = this.limit;
                	}

                	if(this.form.data.id && this.form.data.id > 0){
                		result = await api.updateDepartment(this.form.data);
                	}else{
                		delete this.form.data.id;
                		result = await api.departmentAdd(this.form.data);
                	}
                	
                    if (result) {
                        this.$Message.info('操作成功'); 
                        this.reset();
                        this.fetchList();
                    }
                }
            });
        },
        add() {
            this.reset();
            this.buttonTxt = "添加"
        },
        del() {
            this.$Modal.confirm({
                title: "提示",
                content: "确定要删除该分类？",
                onOk: async () => {
                    let result = await api.deleteDepartment({id: this.form.data.id});
                    if (result) {
                        this.$Notice.success({title: "提示",desc: "分类删除成功"});
                        this.fetchList();
                        this.reset();
                    }
                }
            });
        },
        reset(){
            this.form.data = {
                    id: "",
                    parent_id: 0,
                    name: "",
                    type:'1',
                    info:[]
               };
            this.limit = [];
        },
        async fetchList(){
            let result = await api.departmentList();
            if (result) {
            	this.data = result.children;
                this.categorys = formatTree(this.data);
            }
        },
        async getType(){
        	let result = await api.getDepartmentType();
        	if(result){
        		this.type = result;
        	}
        }
    },
    mounted: function() {
    	this.getType();
        this.fetchList();
    }
};
</script>