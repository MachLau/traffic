<template>
  <div>
    <div v-if="value" class="qrcode">
      <qrcode-vue :value="value" size="300"></qrcode-vue>
    </div>
    <div class="title">恭喜你，预约成功！</div>
    <div class="desc">
      预约码为：<span class="hightlight">{{ value }}</span
      ><br />请于
      <span class="hightlight">{{ `${clockNum}:00-${clockNum + 1}:00` }}</span
      >之间前往秀英港，走预约通道通行
    </div>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      value: "",
      clockNum: "",
    };
  },
  mounted() {
    this.value = window._applyRslt.id;
    this.clockNum = window._applyRslt.clockNum;
  },
};
</script>
<style scoped>
.title {
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: #000000;
  margin-top: 9px;
}
.desc {
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #111111;
  margin: 9px auto 0;
  width: 300px;
}
.qrcode {
  display: flex;
  justify-content: center;
}
.hightlight {
  color: #f21f57;
  font-weight: 700;
}
</style>
