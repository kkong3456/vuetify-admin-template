<template>
  <v-container
    fluid>
<v-card class="pa-3">
      <v-row dense>
        <v-col cols="auto">
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
         <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
         <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
         <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
         <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-5 pa-3">
      <v-row dense>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
      </v-row>
       <v-row dense>
         <v-spacer></v-spacer>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
      </v-row>
    </v-card>


    <v-card class="mt-5 pa-3">
      <v-row dense
        v-bind:style="{height:'120px'}"
        class="red"
        align="center"
      >
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
      </v-row>
       <v-row dense
         :style="{height:'120px'}"
         class="yellow"
       >
        <v-col align-self="end">
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-col align-self="center">
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
        <v-col align-self="start">
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
      </v-row>
    </v-card>


    <v-card class="mt-5 pa-3">
      <v-row
        dense
        justify="space-between"
      >
        <v-col cols="auto">
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
         <v-col cols="auto">
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
         <v-col cols="auto">
          <v-card class="pa-3" outlined>
            Col
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

</template>

<script>
export default{

}
</script>

<style scoped>


</style>
