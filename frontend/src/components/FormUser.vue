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
            <!-- Form de criação de usuário -->
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
              <small id="nomelHelpId" class="form-text text-muted"
                >Insira o nome do usuário {{ usuario.nome }}
              </small>
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
              <small id="emailHelpId" class="form-text text-muted"
                >Insira o e-mail do usuário</small
              >
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
          <p>{{ usuarios }}</p>
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
    usuarios: {
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
      Usuario.salvar(this.usuario)
        .then(() => {
          alert('Salvo com sucesso!')
        })
        .then(() => {
          // Fechando modal após salvar usuario
          this.fecharModal()
          // Recarregando tabela de usuários
          this.limparForm()
        })
    },
    limparForm() {
      this.usuario = {}
      this.recarregarTabela()
    },
    recarregarTabela() {
      Usuario.listar().then((response) => {
        this.usuarios = response.data
      })
    },
    fecharModal() {
      document.getElementsByClassName('close')[0].click()
    },
  },
}
</script>

<style></style>
