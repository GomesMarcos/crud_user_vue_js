<template>
  <nav class="nav navbar navbar-expand-sm navbar-dark bg-dark justify-center">
    <a class="nav-link position-relative p-0" href="#">
      <img src="../assets/logo.png" alt="Logo do projeto" class="nav-brand" />
    </a>
    <h1 class="nav-title position-absolute text-center w-100 m-0">
      CRUD Usando Vue, MySQL e Node
    </h1>
  </nav>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style>
.nav-link {
  z-index: 1;
}
.nav-brand {
  max-width: 3rem;
}
.nav-title {
  color: white;
}
</style>
