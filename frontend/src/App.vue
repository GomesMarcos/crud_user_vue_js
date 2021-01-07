<template>
  <CrudUsers />
</template>

<script>
// import Nav from "./components/Nav.vue";
import CrudUsers from "./components/CrudUsers.vue";
import Usuario from './services/usuarios'

export default {
  name: "App",
  components: {
    CrudUsers,
  },
  mounted() {
    Usuario.listar().then(response => {
      console.log('mounted')
      console.log(response)
    })
  },
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
