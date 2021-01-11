<template>
  <div>
    <div
      class="modal fade"
      id="confirmDelete"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Deseja remover {{ parentUsuario.nome }} do banco de dados?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button @click="deletarUsuario" type="button" class="btn btn-danger">Remover</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Usuario from '../services/usuarios'

export default {
  name: 'ConfirmDelete',
  props: {
    parentUsuario: {
      type: Object,
      default: null,
    },
    parentUsuarios: {
      type: Array,
    },
  },

  data() {
    return {
      updatedUsuarios: [],
      toast: {},
    }
  },

  methods: {
    deletarUsuario() {
      Usuario.deletar(this.parentUsuario).then((res) => {
        if (res.data.status !== 400) {
          const msgToast = res.data.msg
          this.exibirToast(msgToast, 200)

          // Fechando modal após editar usuario
          this.fecharModal()

          // Recarregando tabela de usuários
          this.recarregarTabela()
        } else {
          const msgToast = res.data.msg
          this.exibirToast(msgToast, 400)
        }
      })
    },

    recarregarTabela() {
      Usuario.listar().then((res) => {
        this.updatedUsuarios = res.data
        this.$emit('updatedUsuarios', this.updatedUsuarios)
      })
    },

    fecharModal() {
      document.getElementById('confirmDelete').click()
    },

    exibirToast(msg, status) {
      // Emitindo valor atualizado parao componente Toast
      this.toast.msg = msg
      this.toast.status = status
      this.$emit('updateToast', this.toast)

      // Exibindo o toast na tela
      this.toastHTML = document.getElementById('toast')
      this.toastHTML.classList.add('show')
      setTimeout(() => {
        this.toastHTML.classList.remove('show')
      }, 2000)
    },
  },
}
</script>
