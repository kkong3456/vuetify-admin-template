<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-btn
            elevation="2"
            x-large
          >
            Button
          </v-btn>
          <v-btn
            class="mx-2"
            color="primary"
            fab
            dark
            small
          >
            Button2
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            large
            color="pink"
          >
            Button3
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            color="indigo"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <div class="text-h1 pa-17">
            우리나라 만세
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>
