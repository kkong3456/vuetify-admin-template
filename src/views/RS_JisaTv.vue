<template>
    <v-container>
        <v-card>
            <v-row>
              <v-col>
                <v-menu offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"  
                    >
                    광역본부
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item,index) in items"
                      :key="index"
                    >
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p class="text-h5 text-center">[지사  TV 순신규 추이]</p>
                    <jisa-tv-net-new-increase-line-chart v-bind:selectedBonbu="item.title"></jisa-tv-net-new-increase-line-chart>

                </v-col>
            </v-row>
             <v-row>
                <v-col>
                  <p class="text-h5 text-center">[지사 TV 순해지 추이]</p>
                  <jisa-tv-hj-line-chart></jisa-tv-hj-line-chart>
                  
                </v-col>
             </v-row>
             <v-row>

                <v-col> 
                  <p class="text-h5 text-center">[지사 TV 순증/감 추이]</p>
                  <jisa-tv-net-increase-line-chart></jisa-tv-net-increase-line-chart>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import JisaTvNetNewIncreaseLineChart from '@/components/charts/JisaTvNetNewIncreaseLineChart'
import JisaTvNetIncreaseLineChart from '@/components/charts/JisaTvNetIncreaseLineChart'
import JisaTvHjLineChart from '@/components/charts/JisaTvHjLineChart'

export default {
  name:'RS_JisaTv',
  components:{
    JisaTvNetNewIncreaseLineChart,
    JisaTvNetIncreaseLineChart,
    JisaTvHjLineChart,
    //BonbuRadarChart,
  },
  data(){
    return {
      items:[
        {title:'동부고객본부'},
        {title:'북부고객본부'},
        {title:'강남고객본부'},
      ]
    }  
  }
}
</script>

<style scoped>

</style>
