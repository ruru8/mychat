import '../css/base.scss';

import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  components: { App },
  template: '<app />'
});
