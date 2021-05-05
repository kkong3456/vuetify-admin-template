<template>
  <div>
    <div>{{data.writer}}</div>
    <div>{{data.title}}</div>
    <div>{{data.content}}</div>
    <button v-on:click="updateData">수정|</button>
    <button v-on:click="deleteData"> 삭제</button>
  </div>
</template>

<script>
import data from '@/data'
export default {
  name:'RS_Detail',
  data(){
    const index=this.$route.params.contentId
    return{
      data:data[index],
      index:index,
    }
  },

  methods:{
    deleteData(){
      data.splice(this.index,1);
      this.$router.push({
        path:'/'
      })
    },
    updateData(){
      this.$router.push({
        name:'RS_Create',
        params:{
          contentId:this.index
        }
      })
    }
  }

}
</script>
