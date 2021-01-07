<template>
  <Nav />
</template>

<script>
import Nav from "./Nav";
import Usuarios from "../services/usuarios";

export default {
  components: { Nav },
  name: "crud_users",

  mounted() {
    Usuarios.listar().then((response) => {
      console.log(response.data);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
