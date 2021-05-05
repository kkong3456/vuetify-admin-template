<template>
<div>
 <table>
  <th>
    <td>글쓴이</td>
    <td>제목</td>
    <td>내용</td>
  </th>
  <tr v-for="(value,index) in data"
    v-bind:key=index
    v-on:click="detail(index)"
  >
    <td>{{value.writer}}</td>
    <td>{{value.title}}</td>
    <td>{{value.content}}</td>
  </tr>
 </table>
 <button v-on:click="write">글쓰기</button>
</div>
</template>

<script>
import data from '@/data'
export default {
  name:'RS_Read',
  data(){
    return {
      data:data
    }
  },
  created(){
    console.log(this.data);
  },
  methods:{
    write(){
      this.$router.push({
        path:'create',
      })
    },
    detail(index){
     this.$router.push({
     //  this.$router.push({path:`detail/${index}`})
      name:'RS_Detail',
      params:{
        contentId:index
      }
    })
    }
  }
}
</script>
