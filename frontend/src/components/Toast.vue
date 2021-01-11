<template>
  <div
    class="toast alert "
    :class="statusToast === 200 ? 'alert-success show' : 'alert-danger show'"
    id="toast"
  >
    <span>{{ msgToast }}</span>
  </div>
</template>

<script>
export default {
  props: {
    msgToast: {
      type: String,
    },
    statusToast: {
      type: Number,
    },
  },

  /* Para exibir o toast foi necessário adicionar a clsase 'show'
  no HTML e removê-la ao montar o componente. */
  mounted() {
    document.getElementById('toast').classList.remove('show')
  },
}
</script>

<style lang="scss">
.toast {
  position: fixed;
  right: 32px;
  top: 32px;
  opacity: 0;
  visibility: hidden;
  border: 2px solid;
  // border-radius: 10px;
  text-align: center;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;

  &.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>
