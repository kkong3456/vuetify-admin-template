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

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
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
        >
          <v-list-item-icon>
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
    items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' ,to:'/'},
          { title: 'GridSystem', icon: 'mdi-view-dashboard' ,to:'/grid-system'},
          { title: 'GridListPage', icon: 'mdi-information-outline' ,to:'/grid-list-page'},
           { title: 'Breakpoints', icon: 'mdi-account' ,to:'/break-points'},

        ],
        right: null,
  }),
};
</script>
