<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer=!drawer" />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      :src="require('@/assets/sidebar.jpg')"
    >
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
          <v-list-item-title class="text-h4 font-weight-bold">
            RS-AI
          </v-list-item-title>
          <v-list-item-subtitle>
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
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="link.text" />
          </v-list-item>

          <v-list-group
            v-else
            :key="link.text"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :key="sublink.text"
              :to="sublink.to"
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


    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import '@/styles/overrides.sass'
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    drawer:true,
    gradient:'rgba(0,0,0,0.7),rgba(0,0,0,0.7)',
    // items: [
    //   { title: '1. 해지 예측 정보', icon: 'mdi-view-dashboard' ,to:'/'},
    //   { title: '1-1. 예측 시나리오', icon: 'mdi-align-horizontal-left',to:'/scenario'},
    //   { title: '1-2. 고 위험 사이트', icon: 'mdi-align-horizontal-left',to:'/dangeroussite'},
    //  ],
    right: null,
    links: [
      {
        to     : '/',
        icon   : 'mdi-view-dashboard',
        text   : 'Dashboard',
      },
      {
        icon     : 'mdi-folder',
        text     : '1. 해지 예측 정보',
        subLinks : [
          {
            text : '1-1 예측 시나리오',
            to    : '/scenario',
            icon  : 'mdi-plus'
          },
          {
            text : '1-2 고 위험 사이트',
            to    : '/dangeroussite',
            icon  : 'mdi-plus'
          },
        ]
      },
      {
        icon     : 'mdi-folder',
        text     : '2. 해지 징후 VOC',
        subLinks : [
          {
            text : '2-1 해지관련 VOC 추이',
            to    : '/sale-voc',
            icon  : 'mdi-plus'
          },
          {
            text : '2-2 유무선 품질 VOC',
            to    : '/network-voc',
            icon  : 'mdi-plus'
          },
        ]
      },
      {
        icon     : 'mdi-folder',
        text     : '3. 실적/지표 관리',
        subLinks : [
          {
            text : '3-1 본부별 추이',
            to    : '/bonbu',
            icon  : 'mdi-plus'
          },
          {
            text : '3-2 상품별 추이',
            to    : '/product',
            icon  : 'mdi-plus'
          },
          {
            text : '3-3 지사별 추이(TV)',
            to    : '/jisa-tv',
            icon  : 'mdi-plus'
          },
          {
            text : '3-4 지사별 추이(무선)',
            to    : '/jisa-wireless',
            icon  : 'mdi-plus'
          },
          {
            text : '3-5 지사별 추이(인터넷)',
            to    : '/jisa-internet',
            icon  : 'mdi-plus'
          },
        ]
      },
    ]
  }),
};
</script>

<style scoped>
 .v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {padding: 0 8px;} /* 메뉴너비  */
/*.container{margin:0;}  본문화면이 중앙으로 치우치는 것을 방지 */


</style>
