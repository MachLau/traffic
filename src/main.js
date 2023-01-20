import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(NutUI);
app.mount("#app");
