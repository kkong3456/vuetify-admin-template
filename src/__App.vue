<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon v-on:click="drawer=!drawer"></v-app-bar-nav-icon>
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
        dense
        nav
      >
        <v-list-item              
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
          active-class="secondary"
          class="py-1 pa-5"

        >
          <v-list-item-icon class="mr-3">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    drawer:false,
    gradient:'rgba(0,0,0,0.7),rgba(0,0,0,0.7)',
    items: [
      { title: '1. 해지 예측 정보', icon: 'mdi-view-dashboard' ,to:'/'},
      { title: '1-1. 예측 시나리오', icon: 'mdi-align-horizontal-left',to:'/scenario'}
       

        ],
        right: null,
  }),
};
</script>
