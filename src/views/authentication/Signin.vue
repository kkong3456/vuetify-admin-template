
<template>
  <v-container class="fill-height">
    <v-row justify="center"> 
      <v-col cols="auto">
        <v-card
          width="460"
          :elevation="5"
        >
          <v-card-text class="text-center px-12 py-16">
            <div class="text-h5 font-weight-black mb-5">
              로그인
            </div>
            <v-text-field
              label="이메일"
              clearable
              prepend-icon="mdi-email-outline"
              class="pl-3"
            />
            <v-text-field
              label="비밀번호"
              clearable
              prepend-icon="mdi-lock-outline"
              class="pl-3"
            />
            <v-btn
              block
              x-large
              rounded
              color="primary"
              class="text-h6 mt-6"
            >
              로그인
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {

}
</script>
<style scoped>

</style>
