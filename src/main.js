import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate";
import firebase from 'firebase/app';
import 'firebase/auth';
// import messagePlugin from "./utils/message.plugin";

Vue.config.productionTip = false
const firebaseConfig  = {
    apiKey: "AIzaSyB3gkSzKYR8VMHXSG1M0MBEk-o8jm_cF7c",
    authDomain: "lavrovanna-download.firebaseapp.com",
    databaseURL: "https://lavrovanna-download.firebaseio.com",
    projectId: "lavrovanna-download",
    storageBucket: "lavrovanna-download.appspot.com",
    messagingSenderId: "724892420255",
    appId: "1:724892420255:web:cb8580205e5fa0fe317aaa",
    measurementId: "G-377VVH4DX1"
}
Vue.use(Vuelidate);
// Vue.use(messagePlugin);

firebase.initializeApp(firebaseConfig);

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
})
