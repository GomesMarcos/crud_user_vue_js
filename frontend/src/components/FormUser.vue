<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalForm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >

    <!-- Form de criação de usuário -->
    <form class="form-group" @submit.prevent="salvar">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adicionar Novo Usuário</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
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
                v-model="usuario.nome"
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
                v-model="usuario.email"
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
  },
  data() {
    return {
      usuario: {
        nome: '',
        email: '',
      },
    }
  },

  methods: {
    salvar() {
      try {
        Usuario.salvar(this.usuario)
          .then(() => {
            alert('Salvo com sucesso!')
            // Fechando modal após salvar usuario
            this.fecharModal()
  
            // Limpando form
            this.limparForm()
  
            // Recarregando tabela de usuários
            this.recarregarTabela()
          })
      } catch (error) {
        console.log(error);
      }
    },

    limparForm() {
      this.usuario = {}
    },

    recarregarTabela() {
      Usuario.listar().then((response) => {
        this.parentUsuarios = response.data
        this.$emit('updatedUsuarios', this.parentUsuarios)
      })
    },

    fecharModal() {
      document.getElementsByClassName('close')[0].click()
    },
  },
}
</script>

<style lang="scss">
.modal {
  &-title, .close { color: lightcyan; }

  &-header, input, &-footer { border-color: gray;}

  &-content {
    background-color: lighten(#17191A, 10%);

    label { color: lightcyan; }

    input {
      background-color: #17191a;
    }
  }
}
</style>
