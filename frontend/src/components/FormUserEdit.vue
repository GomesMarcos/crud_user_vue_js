<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalFormEdit"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <!-- Form de edição de usuário -->
    <form class="form-group" @submit.prevent="atualizar">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Usuário</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              id="closeModalEdit"
              @click="limparForm"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <p>
              <label for="userName">Nome</label>
              <input
                required
                type="text"
                class="form-control"
                name="userName"
                id="userName"
                aria-describedby="nomelHelpId"
                placeholder="Ex: Jonas Rasche"
                v-model="parentUsuarioEditado.nome"
              />
            </p>
            <p>
              <label for="userEmail">E-mail</label>
              <input
                required
                type="email"
                class="form-control"
                name="userEmail"
                id="userEmail"
                aria-describedby="emailHelpId"
                placeholder="usuario@exemplo.com"
                v-model="parentUsuarioEditado.email"
              />
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="limparForm"
            >
              Fechar
            </button>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Usuario from '../services/usuarios'

export default {
  nome: 'FormUser',
  props: {
    parentUsuarios: {
      type: Array,
    },
    parentUsuarioEditado: {
      type: Object,
    },
  },
  data() {
    return {
      toast: {},
      updatedUsuarios: [],
      toastHTML: null,
    }
  },

  methods: {
    atualizar() {
      Usuario.editar(this.parentUsuarioEditado).then((res) => {
        if (res.data.status !== 400) {
          const msgToast = res.data.msg
          this.exibirToast(msgToast, 200)

          // Fechando modal após editar usuario
          this.fecharModal()

          // Limpando form
          this.limparForm()

          // Recarregando tabela de usuários
          this.recarregarTabela()
        } else {
          const msgToast = res.data.msg
          this.exibirToast(msgToast, 400)
        }
      })
    },

    limparForm() {
      this.usuario = {}
    },

    recarregarTabela() {
      Usuario.listar().then((res) => {
        this.updatedUsuarios = res.data
        this.$emit('updatedUsuarios', this.updatedUsuarios)
      })
    },

    fecharModal() {
      document.getElementById('closeModalEdit').click()
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
