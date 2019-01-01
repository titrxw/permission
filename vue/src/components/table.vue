<template>
  <div class="table-panel">
    <div class="panel-heading" v-if="title">{{ title }}</div>
    <Row class="table-toolbar" v-if="$slots['table-operate'] || $slots['search']">
      <Col span="6">
        <slot name="table-operate"></slot>
      </Col>
      <Col span="18">
        <div class="table-bar">
          <slot name="search"></slot>
        </div>
      </Col>
    </Row>
    <Table
      @on-selection-change="selectionChange"
      ref="table"
      border
      highlight-row
      :no-data-text="noDataText"
      :columns="columns"
      :data="data.data"
    ></Table>
    <Row type="flex" v-if="data.total" justify="space-between">
      <div>
        <slot name="foot-operate"></slot>
      </div>
      <div>
        <Page
          class="page"
          :total="data.total"
          show-total
          show-elevator
          :current="page"
          @on-change="loadDataByPage"
        ></Page>
      </div>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    noDataText:{
      type:String,
      default:'暂无数据'
    },
    getData: {
      type: Function,
      default: null
    },
    after: {
      type: Function,
      default: null
    },
    search: {
      type: Object
    }
  },
  data() {
    return {
      page: 1,
      data: {
        data: [],
        total: 0
      },
      isSearch: false,
      fromSearch: false
    };
  },
  methods: {
    selectionChange(e) {
      this.$emit("selection-change", e);
    },
    loadDataByPage(page) {
      this.page = page;
      this.fetchList();
    },
    async fetchList() {
      if (!this.getData) {
        return false;
      }

      let params = {
        page: this.page
      };
      let result = this.getData(params);
      params = result[1];
      if (this.isSearch && result[2]) {
        params = { ...params, ...result[2] };
      }
      result = await result[0](params);
      if (result) {
        if (this.after) {
          result = this.after(result)
        }
        this.data = result;
      } else {
        this.data = {
          data: [],
          total: 0
        };
      }
    },
    reload() {
      this.isSearch = false
      this.page = 1;
      this.fetchList();
    },
    fresh() {
      this.fetchList();
    },
    selectionAll(status) {
      this.$refs.table.selectAll(status);
    },
    async doSearch() {
      this.fromSearch = true
      this.isSearch = true;
      this.page = 1;
      await this.fetchList();
      this.fromSearch = false
    }
  },
  watch: {
    search: {
      deep:true,
      handler(val) {
        if(!this.fromSearch) {
          this.isSearch = false;
        }
      }
    }
  }
};
</script>
<style lang="less">
.table-panel {
  .panel-heading {
    text-align: left;
    width: 100%;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #eeeff1;
    padding: 15px;
    font-size: 16px;
    font-weight: 700;
  }
  .table-toolbar {
    margin-top: 15px !important;
    margin-bottom: 15px !important;
    padding-bottom: 15px !important;
    border-bottom: 1px dashed #eeeff1;
    .table-bar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 10px;
    }
    .ivu-form-inline .ivu-form-item {
      margin-right: 0px;
    }
    .table-toolbar .table-bar .search-bar .ivu-form-item {
      margin-bottom: 0;
    }
  }
  .page {
    text-align: right;
    margin: 10px;
  }
  .ivu-form-item {
    margin-bottom: 0px !important;
  }
  .ivu-radio-group {
    margin-right: 10px;
  }
}
</style>