<template>
  <v-fade-transition mode="in-out">
    <router-view />
  </v-fade-transition>
</template>

<script>

import '@/styles/overrides.sass'
export default {
  name: 'App',
};
</script>

<style>
 thead.v-data-table-header >tr >th{
   font-size:1rem !important;
   /* line-height:40px !important;
   vertical-align:middle !important; 
   해지 테이블의 헤더 글자 크기 조정
   */
  
 }

 
 </style>