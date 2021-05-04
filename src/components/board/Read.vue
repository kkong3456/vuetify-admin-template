<template>
 <v-simple-table>
   <template v-slot:defaut>
     <thread>
       <tr>
         <th class="text-left">글쓴이</th>
         <th class="text-left">제  목</th>
         <th class="text-left">내  용</th>
       </tr>
     </thread>
     <tbody>
       <tr
          v-for="(value,index) in data"
          :key="index"
        >
          <td>{{value.writer}}></td>
          <td>{{value.title}}</td>
          <td>{{value.content}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import data from '@/data'
export default {
  name:'Read',
  data(){
    return {
      data:data
    }
  }
}
</script>
