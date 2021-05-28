import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'
//import Vuetify from 'vuentify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const theme={
  primary:colors.deepOrange
}

export default new Vuetify({
  icons:{
    iconfont:'mdi',
  },
  breakpoint:{
    thresholds:{
      //xs:388,  //xs의 사이즈 Pixcel 오버라이드
    },
    mobileBreakpoint:'xs',  //모바일은 xs기준
    theme:{
      themes:{
        light:{
          primary:'#ff0000',  //vuetifyjs.com/en/features/presets/#default-preset 사이트에서 정의된 기본 색상을 재정의
          //    secondary:'#777777',
        },
        // light:theme,
        //dark:theme
      }
    }

  }
});
