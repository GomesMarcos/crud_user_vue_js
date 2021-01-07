<template>
  <CrudUsers />
</template>

<script>
// import Nav from "./components/Nav.vue";
import CrudUsers from "./components/CrudUsers.vue";

export default {
  name: "App",
  components: { CrudUsers },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo-wrapper img {
  max-width: 64px;
}
</style>
