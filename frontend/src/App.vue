<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';

export default {
  name: 'App',
  components: {
    MainPage,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
