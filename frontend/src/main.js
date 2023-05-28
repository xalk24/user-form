import Vue from 'vue';
import mdiVue from 'mdi-vue';
import * as mdijs from '@mdi/js';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(mdiVue, {
  icons: mdijs,
});
Vue.use(VueAxios, axios);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
