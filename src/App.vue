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
          active-class="secondary"
          class="py-2"
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
    gradient:'rgba(0,0,0,0.7),rgba(0,0,0,0.7)',
    items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' ,to:'/'},
          { title: 'GridSystem', icon: 'mdi-view-dashboard' ,to:'/grid-system'},
          { title: 'GridListPage', icon: 'mdi-information-outline' ,to:'/grid-list-page'},
          { title: 'Breakpoints', icon: 'mdi-account' ,to:'/break-points'},
          { title: 'Typography', icon: 'mdi-graphql' ,to:'/typo-graphy'},
          { title: 'TableMenu', icon: 'mdi-graphql' ,to:'/tables'},
          { title: 'FormMenu', icon: 'mdi-graphql' ,to:'/forms'},
          { title: 'ButtonMenu', icon: 'mdi-graphql' ,to:'/buttons'},
          { title: 'IconMenu', icon: 'mdi-graphql' ,to:'/icons'},

        ],
        right: null,
  }),
};
</script>
