<script>
import { ref, reactive } from "vue";
import { Toast } from "@nutui/nutui";
import router from "../router";
import ChineseNumberPlateSelector from "./ChineseNumberPlateSelector.vue";
import { getSlotsRemain } from "../request";
import { applyAction } from "../request";
export default {
  setup() {
    const formData = reactive({
      name: "",
      tel: "",
      applyClockNum: "",
    });
    const cpfRef = ref(null);
    const ruleForm = ref(null);

    const submit = () => {
      ruleForm.value.validate().then(({ valid, errors }) => {
        const cph = cpfRef.value.getCPH();
        if (cph.length < 7) {
          Toast.fail("请输入您完整车牌号！");
        }
        if (valid) {
          applyAction(Object.assign({ number: cph }, formData)).then(
            (response) => {
              const { code, msg, data } = response.data;
              if (code == 200) {
                console.log("applyAction", data);
                window._applyRslt = data;
                router.push("/rslt");
              } else {
                Toast.fail(msg);
              }
            }
          );
          console.log("success", formData);
        } else {
          console.log("error submit!!", errors);
        }
      });
    };
    // Promise 异步校验
    const asyncValidator = (val) => {
      return new Promise((resolve) => {
        // Toast.loading("模拟异步验证中...");
        // setTimeout(() => {
        //   Toast.hide();
        //   resolve(
        //     /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/.test(val)
        //   );
        // }, 1000);
        resolve(
          /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/.test(val)
        );
      });
    };
    const back = () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.close();
      }
    };
    return {
      ruleForm,
      cpfRef,
      formData,
      asyncValidator,
      submit,
      back,
    };
  },
  components: {
    ChineseNumberPlateSelector,
  },

  data() {
    return {
      remains: [],
    };
  },
  methods: {
    setRemains() {
      getSlotsRemain().then((response) => {
        this.remains = response.data.data;
      });
    },
  },
  mounted() {
    this.setRemains();
  },
};
</script>
<template>
  <nut-navbar @on-click-back="back" title="预约临时通道">
    <template #left>
      <div>返回</div>
    </template>
    <template #right>
      <nut-icon class="right" name="share-n"></nut-icon>
    </template>
  </nut-navbar>
  <ChineseNumberPlateSelector ref="cpfRef" />
  <nut-form :model-value="formData" ref="ruleForm">
    <nut-form-item label="姓名" prop="name">
      <input
        class="nut-input-text"
        v-model="formData.name"
        placeholder="请输入姓名"
        type="text"
      />
    </nut-form-item>
    <nut-form-item
      label="联系电话"
      prop="tel"
      required
      :rules="[
        { required: true, message: '请填写联系电话' },
        { validator: asyncValidator, message: '电话格式不正确' },
      ]"
    >
      <input
        class="nut-input-text"
        v-model="formData.tel"
        placeholder="电话用于发送预约成功短信！"
        type="text"
      />
    </nut-form-item>
    <nut-form-item
      label="预计通行时间"
      prop="applyClockNum"
      required
      :rules="[{ required: true, message: '请选择通行时间' }]"
    >
      <nut-radiogroup v-model="formData.applyClockNum" direction="horizontal">
        <nut-radio
          v-for="item in remains"
          :key="item.clockNum"
          shape="button"
          :label="item.clockNum"
          :disabled="item.remain === 0"
          >{{
            `${item.clockNum}:00-${item.clockNum + 1}:00 (${item.remain})`
          }}</nut-radio
        >
      </nut-radiogroup>
    </nut-form-item>
    <nut-cell>
      <nut-button block @click="submit" type="primary">预约</nut-button>
    </nut-cell>
  </nut-form>
</template>
