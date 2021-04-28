<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <p class="text-h5">해지 예측 정보</p>
                </v-col>
            </v-row>
        </v-card>
    </v-container>

</template>

<script>
import axios from 'axios';

const url='http://localhost:8000/booking/'
export default {
  mounted(){
    console.log(`url is ${url}`);
    axios({
      method:'GET',
      url:url
    }).then(res=>{
      console.log(res.data);
    })
  }
}
</script>

<style scoped>

</style>
