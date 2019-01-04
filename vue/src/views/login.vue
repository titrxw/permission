<template>
  <div class="container">
    <div id="particles"></div>
    <div class="enter-form">
      <Form class="form" :label-width="0" ref="form" :model="form" :rules="validateRule">
        <FormItem prop="real_name">
          <Input placeholder="请输入联系人姓名" v-model="form.real_name"></Input>
        </FormItem>
        <FormItem prop="mobile">
          <Input placeholder="请输入手机号码" v-model="form.mobile"></Input>
        </FormItem>
        <Button type="success" long @click.native="submit">登录</Button>
      </Form>
    </div>
  </div>
</template>
<script>
import "particles.js";
import FormValidate from '@/libs/formValidate'
import api from "@/api";
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管家手机号码"));
      } else {
        if (/^1\d{10}$/.test(value)) {
          callback();
        }
        callback(new Error("请输入正确的手机号码"));
      }
    };
    return {
      form: {
        password: "",
        mobile: ""
      },
      validateRule: {
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        mobile: [
          {
            required: true,
            validator: FormValidate.mobile,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(async result => {
        if (result) {
          let res = await api.addCompany(this.form);
          if (res) {
            this.$Notice.success({
              title: "提示",
              desc: "入驻申请提交成功"
            });
            this.$refs["form"].resetFields();
          }
        }
      });
    }
  },
  components: {
    Upload
  },

  mounted() {
    particlesJS("particles", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 600
          }
        },
        color: {
          value: ["#2d8cf0", "#19be6b", "#f90", "#ed3f14"]
        },
        shape: {
          type: ["circle"],
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: "#eee",
          opacity: 0.6,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: true,
          attract: {
            enable: false,
            rotateX: 100,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "Window",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
};
</script>
<style lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: Center;
  flex-direction: column;
  height: 100%;

  .enter-form {
    z-index: 10;
    height: 700px;
    width: 800px;
    background: rgba(232, 232, 232, 0.5);
    box-shadow: 1px 0px 3px 0px #f4f4f4;
    h1 {
      text-align: center;
      margin-top: 70px;
    }
    .form {
      width: 300px;
      margin: 0 auto;
      margin-top: 35px;
      .ivu-input {
        height: 55px;
        font-size: 14px;
      }
      button {
        height: 55px;
        font-size: 17px;
      }
    }
  }
  #particles {
    position: fixed;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
}
</style>