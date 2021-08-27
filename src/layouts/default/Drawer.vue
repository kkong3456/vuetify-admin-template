<template>
  <v-navigation-drawer
    v-bind="$attrs"
    dark
    app
    :src="require('@/assets/sidebar.jpg')"
  >
    <!-- v-if="$vuetify.breakpoint.mdAndDown" -->
    <template
      v-slot:img="props"
    >
      <v-img
        :gradient="gradient"
        v-bind="props"
      />
    </template>
    <v-list-item>
      <v-list-item-content>
        <router-link
          to="/"
          class="text-decoration-none white--text"
        >
          <v-list-item-title class="text-h4 font-weight-bold">
            RS-AI
          </v-list-item-title>
        </router-link>
        <v-list-item-subtitle class="teal--text text--lighten-4">
          강북/강원 코어센터
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />
    <v-list
      nav
      dense
    >
      <div
        v-for="(link, i) in links"
        :key="i"
      >
        <v-list-item
          v-if="!link.subLinks"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
          @click="showBreadCrumb(link)"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title
            v-text="link.text"
          />
        </v-list-item>

        <v-list-group
          v-else
          :key="link.text"
          no-action
          :prepend-icon="link.icon"
          :value="false"
          @click="showBreadCrumb(link)"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="sublink in link.subLinks"
            :key="sublink.text"
            :to="sublink.to"
            @click="showBreadCrumb(sublink)"
          >
            <v-list-item-icon class="px-2">
              <v-icon>{{ sublink.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ sublink.text }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import eventBus from '@/js/eventBus';

export default {
  name:'DefaultDrawer',

  data: () => ({
    gradient:'rgba(0,0,0,0.7),rgba(0,0,0,0.7)',
   
    right: null,
    links: [
      {
        // to     : '/',
        // icon   : 'mdi-view-dashboard',
        // text   : 'Dashboard',
        to  : '/',
        icon:'mdi-view-dashboard',
        text:'Dashboard',
      },

      {
        icon: 'mdi-folder',
        text: '추이현황 CONTENTS',
        subLinks:[
          {
            text :'0. 위치기반 해지 추이',
            to:'/rs-daytime-locations',
            icon:'mdi-plus',
          },
          {
            text:'1. 본부별 실적현황',
            to:'/rsn-bonbu-sales-perf',
            icon:'mdi-plus',
          },
          {
            text:'2. 지사별 실적현황',
            to:'',
            icon:'mdi-plus',
          },
          {
            text:'3. 해지 VOC추이',
            to:'/rsn-hj-voc',
            icon:'mdi-plus',
          },
          {
            text:'4. 품질 VOC추이',
            to:'/rsn-pj-voc',
            icon:'mdi-plus',
          }
        ],
      },
      {
        icon:'mdi-folder',
        text:'예측현황CONTENTS',
        subLinks:[
          {
            text:'0. 해지예측',
            to:'/hj-prediction',
            icon:'mdi-plus',
          },
          {
            text:'1.본부별 실적예측',
            to:'/bonbu-prediction',
            icon:'mdi-plus',
          },
          {
            text:'2.지사별 실적예측',
            to:'/jisa-prediction',
            icon:'mdi-plus',
          },
          {
            text:'3.해지VOC예측',
            to:'/hjvoc-prediction',
            icon:'mdi-plus',
          },
          {
            text:'4.품질VOC예측',
            to:'/pjvoc-prediction',
            icon:'mdi-plus',
          }
        ]
      },
      
      // {
      //   icon:'mdi-folder',
      //   text:'4. 해지분포 MAP',
      //   subLinks:[
      //     {
      //       text:'4-1. Day Time MAP',
      //       to:'/rs-daytime-locations',
      //       icon:'mdi-plus',
      //     },
      //     {
      //       text:'4-2. Night Time MAP',
      //       to:'/rs-nighttime-locations',
      //       icon:'mdi-plus',
      //     },
      //   ]
      // }
    ]
  }),

  methods:{
    showBreadCrumb(sublink){
      eventBus.$emit('triggerEventBus',[sublink.text,sublink.to]);  //drawer.vue 메뉴 클릭시 appbar에도 메뉴 표시
    }
  }
}



</script>
<style>
 .v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {padding: 0 8px;} /* 메뉴너비  */
/*.container{margin:0;}  본문화면이 중앙으로 치우치는 것을 방지 */


/* 메뉴와 아이콘 간격조정 */
.v-list-item--dense .v-list-item__icon, .v-list--dense .v-list-item .v-list-item__icon {
  
    margin-right: 20px !important;
}


/* 서브메뉴의 위치 조정 */
.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {
    padding-left: 22px !important;
}

</style>
