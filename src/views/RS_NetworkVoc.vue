<template>

    <v-container fluid>
        <!-- <input v-bind:value="inputText" v-on:input="updateInput"/> -->
        <input v-model="inputText"/>
        <v-card>{{inputText}}</v-card>
    </v-container>

</template>

<script>
export default {
    data(){
        return {
            inputText:'여기에 입력하세요',
        }
    },
    methods:{
        updateInput(e){
            const updateText=e.target.value;
            this.inputText=updateText;
        }
    }
}
</script>