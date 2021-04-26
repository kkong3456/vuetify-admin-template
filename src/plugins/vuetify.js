import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'
//import Vuetify from 'vuentify/lib'

Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont:'mdi',
    }
});
