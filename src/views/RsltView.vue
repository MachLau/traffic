<template>
  <div class="about">
    <nut-navbar @on-click-back="back" @on-click-title="title" title="预约结果">
      <template #left>
        <div>返回</div>
      </template>
      <template #right>
        <nut-icon class="right" name="share-n"></nut-icon>
      </template>
    </nut-navbar>
    <ApplyRslt />
  </div>
</template>
<script>
import ApplyRslt from "../components/ApplyRslt.vue";
export default {
  components: {
    ApplyRslt,
  },
  setup() {
    const back = () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.close();
      }
    };
    return { back };
  },
};
</script>
<style></style>
