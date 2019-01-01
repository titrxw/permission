<template>
    <div>
        <div class="panel-heading">{{title}}</div>
        <Row class="table-toolbar">
            <Col span="4">
                <div>
                    <slot name="action"></slot>
                </div>
            </Col>
            <Col span="20">
                <div class="table-bar">
                    <div>
                        <Form ref="formInline" inline>
                        <slot name="search"></slot>
                        </Form>
                    </div>
                </div>
            </Col>
        </Row>

        <Table border highlight-row :columns="column" :data="data"></Table>
        <Row class="footer" type="flex" justify="space-between" v-if= 'isPage'>
            <div></div>
            <div>
                <Page  class="page" :current='nowPage' :total="getTotal" :page-size="pageSize" show-total show-elevator @on-change="fetchList"></Page>
            </div>
        </Row>
    </div>
</template>
<script>
    export default {
        name: 'ex-list',
        props: {
        	nowPage: {
                type: Number,
                default: 1
            },
            title: {
                type: String,
                default: ''
            },
            column: {
                type: Array,
                required: true
            },
            data: {
                type: Array,
                default: function() {
                    return []
                }
            },
            total: {
                type: [Number, String],
                default: 0
            },
            pageSize: {
                type: Number,
                default: 10
            },
            isPage:{
            	type: Boolean,
                default: true
            },
        },
        data: ()=> {
            return {
                
            }
        },
        computed: {
            getTotal() {
                return parseInt(this.total)
            }
        },
        methods: {
            fetchList(page) {
                this.$emit("fetch-list", page)
            }
        }
    }
</script>
<style scoped>
    .row-bottom{
        margin-bottom:15px;
    }
</style>
