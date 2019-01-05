<template>
  <div>
    <Tabs>
      <TabPane :label="item.title" v-for="(item, index) in auths" :key="index">
        <table style="border-spacing: 0;border-collapse: collapse;border: 1px solid #cbd0db;width: 100%;margin-bottom: 20px;">
          <tr v-for="(aitem, aindex) in item.children" :key="aindex">
            <th style="padding: 8px 10px;border-right:1px solid #cbd0db;    width: 150px;">
              <Checkbox
                v-model="aitem.selected"
                @click.native="moduleChange($event, index, aindex)"
              >{{ aitem.title }}</Checkbox>
            </th>
            <td style="padding-left:15px;">
              <div class="item" v-for="(bitem, bindex) in aitem.children" :key="bindex">
                <Checkbox
                  @click.native="itemChange($event, index, aindex, bindex)"
                  v-model="bitem.selected"
                >{{ bitem.title }}</Checkbox>
              </div>
            </td>
          </tr>
        </table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      auths: [
        {
          id: "",
          title: "ewrwer",
          children: [
            {
              id: "",
              title: "werwer",
              selected: false,
              children: [
                {
                  title: "werwer",
                  id: "",
                  selected: false
                }
              ]
            }
          ]
        },
        {
          id: "",
          title: "ewrwe213213r",
          children: [
            {
              id: "",
              title: "wer2wer",
              selected: false,
              children: [
                {
                  title: "we3rwer",
                  id: "",
                  selected: false
                },
                {
                  title: "werw4er123",
                  id: "",
                  selected: false
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    moduleChange(event, pindex, index) {
      event.preventDefault();
      this.auths[pindex]["children"][index]["selected"] = !this.auths[pindex][
        "children"
      ][index]["selected"];
      this.auths[pindex]["children"][index]["children"].forEach(Element => {
        Element.selected = this.auths[pindex]["children"][index]["selected"];
      });
    },
    itemChange(event, pindex, index, bindex) {
      event.preventDefault();
      this.auths[pindex]["children"][index]["children"][bindex][
        "selected"
      ] = !this.auths[pindex]["children"][index]["children"][bindex][
        "selected"
      ];
      this.auths[pindex]["children"][index]["selected"] = this.auths[pindex][
        "children"
      ][index]["children"].every(Element => {
        return Element.selected;
      });
    }
  }
};
</script>
<style scoped>
.item {
  display: block;
  width: 220px;
  float: left;
  font-size: 14px;
  height: 30px;
    line-height: 30px;
}
</style>
