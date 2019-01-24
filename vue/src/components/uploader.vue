<template>
  <div>
    <div class="upload-list" v-for="(item, index) in uploaders" :key="index">
      <img :src="imgHost + item.url">
      <div class="upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="large_view(item.url)"></Icon>
        <Icon v-if="upload" type="ios-trash-outline" @click.native="remove(item)"></Icon>
      </div>
    </div>
    <Upload
      v-if="upload"
      ref="upload"
      :show-upload-list="false"
      :on-success="success"
      :format="format"
      :max-size="2048"
      :on-format-error="format_error"
      :on-exceeded-size="size_error"
      :multiple="multiple"
      type="drag"
      :action="uploadHost"
      :data="extra"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片查看器" v-model="large_img_show">
      <img :src="imgHost + large_img_url " v-if="large_img_show" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    value: "",
    format: ["jpg", "jpeg", "png"],
    multiple: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show_upload_list: true,
      extra: {
        token: sessionStorage.getItem("token")
      },
      uploaders: [],
      large_img_show: false,
      large_img_url: "",
      default_data: [],
      urls: ""
    };
  },
  methods: {
    success(res, file) {
      file.url = res.data.url;
      if (this.multiple) {
        this.uploaders.push({
          url: res.data.url
        });
        if (this.urls) {
          this.urls += "," + res.data.url;
        } else {
          this.urls += res.data.url;
        }
      } else {
        this.uploaders[0] = {
          url: res.data.url
        };
        this.urls = res.data.url;
      }

      this.$emit("input", this.urls);
    },
    format_error() {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: " 请上传正确格式的文件"
      });
    },
    size_error() {
      this.$Notice.warning({
        title: "上传文件太大",
        desc: " 最大上传文件大小为 2M"
      });
    },
    remove(file) {
      this.uploaders.splice(this.uploaders.indexOf(file), 1);
      if (this.multiple) {
        this.urls = "";
        this.uploaders.forEach((item, index) => {
          this.urls += item.url;
          if (index != this.uploaders.length - 1) {
            this.urls += ",";
          }
        });
      } else {
        this.urls = "";
      }

      this.$emit("input", this.urls);
    },
    large_view(url) {
      this.large_img_url = url;
      this.large_img_show = true;
    },
    init() {
      let t = [];
      this.urls = "";
      if (this.value && this.value != "") {
        let _self = this;
        this.value.split(",").forEach(function(url, index, item) {
          t.push({ url: url });
          if (_self.urls) {
            _self.urls += "," + url;
          } else {
            _self.urls += url;
          }
        });
      }

      this.uploaders = t;
    }
  },
  mounted() {
    if (this.upload) this.uploaders = this.$refs.upload.fileList;
    this.init();
  },
  watch: {
    value: function(val, val2) {
      this.init();
    }
  }
};
</script>
<style lang="less">
.upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
  img {
    width: 100%;
    height: 100%;
  }
  .upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
}
.upload-list:hover .upload-list-cover {
  display: block;
}
</style>