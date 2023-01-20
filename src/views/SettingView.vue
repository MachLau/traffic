<template>
  <div>
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item label="数据日期" prop="date">
        <div
          class="date-desc"
          @click="
            () => {
              openSwitch('isVisible');
            }
          "
        >
          {{ formData.date }}
        </div>

        <nut-calendar
          v-model:visible="isVisible"
          :default-value="formData.date"
          @close="closeSwitch('isVisible')"
          @choose="setChooseValue"
        >
        </nut-calendar>
      </nut-form-item>
      <nut-form-item
        label="随机校验码"
        prop="random"
        required
        :rules="[{ required: true, message: '请填写' }]"
      >
        <input
          class="nut-input-text"
          placeholder="点这里输入"
          v-model="formData.random"
          type="text"
        />
      </nut-form-item>

      <nut-form-item label="文件上传">
        <nut-uploader
          url="http://127.0.0.1:7001/upload"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          v-model:file-list="formData.defaultFileList"
        >
        </nut-uploader>
      </nut-form-item>
      <nut-cell>
        <nut-row :gutter="10">
          <nut-col
            :span="3"
            v-for="(slot, index) in formData.slots"
            :key="index"
            ><nut-input
              :label="index || '0'"
              class="slots-number"
              label-align="center"
              input-align="center"
              placeholder="请输入数字"
              v-model="formData.slots[index]"
              type="number"
            />
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell>
        <nut-button block @click="submit" type="primary">预约</nut-button>
      </nut-cell>
    </nut-form>
  </div>
</template>
<script>
import { ref, reactive, toRefs } from "vue";
import { Toast } from "@nutui/nutui";
export default {
  components: {},
  setup() {
    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const formData = reactive({
      date,
      random: "",
      number: "",
      defaultFileList: [],
      slots: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    });
    const ruleForm = ref(null);
    const state = reactive({
      isVisible: false,
    });
    const openSwitch = (param) => {
      state[`${param}`] = true;
    };
    const closeSwitch = (param) => {
      state[`${param}`] = false;
    };
    const setChooseValue = (param) => {
      console.log("param", param);
      formData.date = param[3];
    };

    const submit = () => {
      ruleForm.value.validate().then(({ valid, errors }) => {
        if (valid) {
          console.log("success", formData);
        } else {
          console.log("error submit!!", errors);
        }
      });
    };
    const reset = () => {
      ruleForm.value.reset();
    };
    // 函数校验
    const customValidator = (val) => /^\d+$/.test(val);
    const customRulePropValidator = (val, rule) => {
      return rule.reg.test(val);
    };
    // Promise 异步校验
    const asyncValidator = (val) => {
      return new Promise((resolve) => {
        Toast.loading("模拟异步验证中...");
        setTimeout(() => {
          Toast.hide();
          resolve(
            /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/.test(val)
          );
        }, 1000);
      });
    };
    const back = () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.close();
      }
    };
    const radioVal = ref("");
    return {
      ruleForm,
      formData,
      customValidator,
      customRulePropValidator,
      asyncValidator,
      submit,
      reset,
      back,
      radioVal,
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue,
    };
  },
};
</script>
<style>
.date-desc {
  color: #00b897;
  text-align: right;
}
.slots-number {
  flex-direction: column;
  padding-left: 0;
  padding-right: 0;
}
</style>
