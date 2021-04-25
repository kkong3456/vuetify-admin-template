// .eslintrc.js
module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],
  plugins: [
    'vuetify'
  ],
  rules: {
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/no-legacy-grid':'error',  //veutify 2.0 미만버전 코딩 에러처리
  }
}
