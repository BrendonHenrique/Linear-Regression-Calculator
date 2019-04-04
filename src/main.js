import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCloudUploadAlt)
library.add(faSync)
library.add(faFileCsv)
library.add(faEdit)


Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import {routes} from './routes';


const router =  new VueRouter({routes});

const vue = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export default vue;
