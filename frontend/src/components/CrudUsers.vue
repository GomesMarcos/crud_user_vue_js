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
            <td data-label="ID">
              <div class="d-flex py-2 align-items-center">
                {{ usuario.id }}
              </div>
            </td>
            <td data-label="Nome">
              <div class="d-flex py-2 align-items-center">
                {{ usuario.nome }}
              </div>
            </td>
            <td data-label="E-mail">
              <div class="d-flex py-2 align-items-center">
                {{ usuario.email }}
              </div>
            </td>
            <td data-label="Ações">
              <div class="d-flex justify-content-end">
                <button
                  class="btn btn-secondary btn-actions text-uppercase mr-3"
                  @click="setUsuarioClicado(usuario)"
                  data-toggle="modal"
                  data-target="#modalFormEdit"
                >
                  <i class="material-icons left">update</i>
                  <div class="btn-actions-tooltip">Atualizar<br />{{ usuario.nome }}</div>
                </button>
                <button
                  class="btn btn-danger btn-actions text-uppercase"
                  @click="setUsuarioClicado(usuario)"
                  data-toggle="modal"
                  data-target="#confirmDelete"
                >
                  <i class="material-icons left">delete</i>
                  <div class="btn-actions-tooltip">Deletar<br />{{ usuario.nome }}</div>
                </button>
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
      color: #343a40;
      border-bottom: lightgray;
      transition: linear;
      transition-duration: 150ms;
      transition-property: all;

      &:nth-of-type(odd) {
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

      .btn-actions {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}

.btn-actions {
  visibility: hidden;
  opacity: 0;
  padding: 0.5rem;
  transition: linear;
  transition-duration: 0.3s;
  transition-property: all;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  display: flex;

  &-tooltip {
    position: absolute;
    bottom: -3.5rem;
    z-index: 999;
    visibility: hidden;
    opacity: 0;
    transition: ease all 0.2s;
    transition-delay: 0.3s;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0.1rem 0.5rem;
    border-radius: 5px;
  }

  &:hover {
    .btn-actions-tooltip {
      opacity: 1;
      visibility: visible;
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

    .btn-actions {
      visibility: visible;
      opacity: 1;
      position: relative;
    }
  }
}
</style>
