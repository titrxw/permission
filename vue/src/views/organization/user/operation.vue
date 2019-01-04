<template>
    <Modal v-model="show" @on-cancel="close" width="600" title="调整在职状态">
       <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
            <FormItem label="在职状态" prop='status'>
                <Select v-model="formInline.status">
                    <Option v-for="(item,i) in statusList" :value="i" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>

            <FormItem v-if="formInline.status==4" label="原因" prop='fired_reason'>
                <Select v-model="formInline.fired_reason">
                    <Option v-for="(item,i) in reasonList" :value="i" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
       </Form>

       <div slot="footer">
            <Button size="large" @click="close" style="margin-right:20px;">取消</Button>
            <Button type="primary" size="large" @click="handleSubmit">提交</Button>
        </div>
    </Modal>
</template>
<script>
import api from '@/api'
export default {
    props:{
        value:false,
        id:0,
    },
    data(){
        return {
            show:false,
            formInline: {
                id:0,
                status: '',
                fired_reason: ''
            },
            statusList:[],
            reasonList:[],
            ruleInline: {
                status: [
                    { required: true, message: '请选择在职状态', trigger: 'change' }
                ],
                fired_reason: [
                    { required: true, message: '请选择原因', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        handleSubmit() {
            this.$refs['formInline'].validate(async (valid) => {
                    if (valid) {
                        this.formInline.id = this.id;
                        if(this.formInline.status!=4){
                            this.formInline.fired_reason = '';
                        }
                        let result = await api.updateManagerStatus(this.formInline);
                        if(result){
                            this.$Message.success('操作成功!');
                            console.log(this.formInline)
                            this.show = false;
                            this.$emit('loadList',this.show)
                        }
                    } else {
                        this.$Message.error('请选择对应项!');
                    }
                })
        },
        close(){
            this.show = false;
            this.$emit('input',this.show)
        }
    },
    async mounted(){
        let statusList;
        let reasonList;
        statusList = await api.getManagerStatus({type:1});
        reasonList = await api.getManagerFiredReason();
        if(statusList){
            this.statusList = statusList;
        }
        if(reasonList){
            this.reasonList = reasonList;
        }
    },
    watch:{
        value(val){
            this.show = val;
            if(val==true)this.$refs['formInline'].resetFields();
        }
    }
}
</script>
<style lang="less" scoped>

</style>

