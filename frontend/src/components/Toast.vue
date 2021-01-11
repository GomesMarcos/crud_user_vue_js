<template>
  <div class="toast" :class="statusToast === 'success' ? 'text-success' : 'text-danger'">
    <div class="toast-body">
      {{ msgToast }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgToast: '',
      statusToast: '',
    }
  },
}
</script>

<style lang="scss">
.toast {
  position: absolute;
  background-color: lightgray;
  left: 0;
  right: 0;
  margin: auto;
  top: 25vh;
  width: 256px;
  opacity: 0;
  visibility: hidden;
  border: 1px solid gray;
  border-radius: 10px;
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
