<template>
  <div id="user" style="width:100%;height:600px;overflow:auto;"></div>
</template>
<script>
import echarts from "echarts";
import api from "@/api";
export default {
  props: {
    value: {
      type: [Number, String]
    }
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    async init() {
      let result = await api.managerTeacher(this.value);
      if (!result) {
        return false;
      }
      this.data = result;
      let myChart = echarts.init(document.getElementById("user"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "tree",
            data: [this.data],
            left: "2%",
            right: "2%",
            top: "8%",
            bottom: "20%",
            symbol: "emptyCircle",
            orient: "vertical",
            expandAndCollapse: false,
            label: {
              normal: {
                position: "top",
                rotate: 0,
                verticalAlign: "middle",
                align: "right",
                fontSize: 13,
                color: 'red'
              }
            },
            leaves: {
              label: {
                normal: {
                  position: "bottom",
                  rotate: -90,
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },
            animationDurationUpdate: 750
          }
        ]
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
