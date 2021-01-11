<template>
  <div>
    <div class="container">
      <!-- Caso o número usuários seja muito grande, um novo botão adicionar é renderizado no topo da table -->
      <div class="row my-3 d-flex flex-end" v-if="usuarios.length > 5">
        <div class="col text-right">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary btn-lg"
            data-toggle="modal"
            data-target="#modalForm"
          >
            + Adicionar Usuário
          </button>
        </div>
      </div>

      <table class="table table-stripped table-hover nt-5">
        <thead class="table-head">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th class="text-center" scope="col">Ações</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="usuario of usuarios" :key="usuario.id">
            <td data-label="ID">{{ usuario.id }}</td>
            <td data-label="Nome">{{ usuario.nome }}</td>
            <td data-label="E-mail">{{ usuario.email }}</td>
            <td data-label="Ações">
              <div class="d-flex flex-column align-items-center">
                <button
                  class="btn btn-secondary text-uppercase w-50"
                  @click="setUsuarioClicado(usuario)"
                  data-toggle="modal"
                  data-target="#modalFormEdit"
                  >atualizar {{ usuario.nome }}</button
                >
                <button
                  class="btn btn-danger text-uppercase w-50"
                  @click="setUsuarioClicado(usuario)"
                  data-toggle="modal"
                  data-target="#confirmDelete"
                  >deletar {{ usuario.nome }}</button
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="row my-3 d-flex flex-end">
        <div class="col text-right">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary btn-lg"
            data-toggle="modal"
            data-target="#modalForm"
          >
            + Adicionar Usuário
          </button>
        </div>
      </div>
    </div>

    <FormUser
      :parentUsuarios="usuarios"
      @updatedUsuarios="usuarios = $event"
      @updateToast="toast = $event"
    />
    <FormUserEdit
      :parentUsuarioEditado="usuarioClicado"
      :parentUsuarios="usuarios"
      @updatedUsuarios="usuarios = $event"
      @updateToast="toast = $event"
    />
    <ConfirmDelete
      :parentUsuario="usuarioClicado"
      @updatedUsuarios="usuarios = $event"
      @updateToast="toast = $event"
    />
    <Toast :msgToast="toast.msg" :statusToast="toast.status" />
  </div>
</template>

<script>
import Usuarios from '../services/usuarios'
import FormUser from './FormUser'
import FormUserEdit from './FormUserEdit'
import ConfirmDelete from './ConfirmDelete'
import Toast from './Toast'

export default {
  name: 'CrudUsers',
  components: { FormUser, FormUserEdit, ConfirmDelete, Toast },

  data() {
    return {
      usuarios: [],
      usuarioClicado: {},
      toast: {
        msg: '',
        status: 400,
      },
    }
  },

  mounted() {
    Usuarios.listar().then((res) => {
      this.usuarios = res.data
    })
  },

  methods: {
    setUsuarioClicado(usuario) {
      this.usuarioClicado = usuario
    },

    updateToast(toast) {
      this.toast = toast
    },
  },
}
</script>

<style lang="scss">
$breakpoint: 768px;

.table {
  margin-bottom: 0 !important;

  thead {
    tr > th {
      color: #222;
    }
  }

  tbody {
    tr {
      color: darkgray;
      border-bottom: lightgray;

      &:nth-of-type(odd) {
        color: lightgray;
        background-color: #999;
      }
    }
  }
}

td,
th {
  border: none !important;
}

.table-hover {
  tbody {
    tr:hover {
      position: relative;
      z-index: 999;
      background-color: lighten(#999, 20%) !important;
      color: #222;
      box-shadow: 2px 2px 6px;
      transition: linear;
      transition-duration: 150ms;
      transition-property: all;
    }
  }
}

@media all and (max-width: $breakpoint) {
  table {
    border: 0;

    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
      border-bottom: 1em solid darken(gray, 15%);
    }

    td {
      display: block;
      text-align: right;

      &::before {
        content: attr(data-label);
        float: left;
        text-transform: uppercase;
        font-weight: 700;

        &:hover {
          color: lightgray;
        }
      }
    }
  }
}
</style>
