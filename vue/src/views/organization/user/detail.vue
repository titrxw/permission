<template>
<div>
  <h2 style="margin-bottom:15px;">员工姓名：{{ info.real_name }}</h2>
  <Tabs v-model="curTab">
    <TabPane name="base" label="基本信息">
      <table
        style="width:100%;border-collapse:collapse;border:1px solid #DDDDDD;margin-top:30px;"
        border="1"
      >
        <tr>
          <td>姓名</td>
          <td>{{info.real_name}}</td>
          <td>工号</td>
          <td>{{info.manager_no}}</td>
        </tr>
        <tr>
          <td>性别</td>
          <td>{{info.sex}}</td>
          <td>电话</td>
          <td>{{info.mobile}}</td>
        </tr>
        <tr>
          <td>部门</td>
          <td>{{info.department_name}}</td>
          <td>职位</td>
          <td>{{info.role}}</td>
        </tr>
      </table>
    </TabPane>
    <TabPane name="achievement" label="每月业绩">
      <Achievement v-if="tabLoad['achievement']" v-model="$route.query.id"></Achievement>
    </TabPane>
    <TabPane name="user_map" label="带训关系">
      <UserMap v-if="tabLoad['user_map']" v-model="$route.query.id"></UserMap>
    </TabPane>
    <TabPane name="reward" label="带训奖励">
      <Reward v-if="tabLoad['reward']" v-model="$route.query.id"></Reward>
    </TabPane>
  </Tabs>
</div>
</template>
<script>
import UserMap from "./userMap";
import Achievement from './achievement'
import Reward from './reward'
import api from '@/api'
export default {
  data() {
    return {
      curTab: "base",
      tabLoad: {
        base: true
      },
      info: {}
    };
  },
  components: {
    UserMap,
    Achievement,
    Reward
  },
  watch: {
    curTab(val) {
      if (!this.tabLoad[val]) {
        this.tabLoad[val] = true;
      }
    }
  },
  async mounted () {
    let result = await api.managerInfo(this.$route.query.id)
    if (result) {
      this.info = result
    }
  }
};
</script>
