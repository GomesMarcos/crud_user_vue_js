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
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="usuario of usuarios" :key="usuario.id">
            <td data-label="ID">{{ usuario.id }}</td>
            <td data-label="Nome">{{ usuario.nome }}</td>
            <td data-label="E-mail">{{ usuario.email }}</td>
            <td data-label="Ações">
              ...
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

    <FormUser :parentUsuarios="this.usuarios" @updatedUsuarios="usuarios = $event" />
  </div>
</template>

<script>
import Usuarios from '../services/usuarios'
import FormUser from './FormUser'

export default {
  name: 'CrudUsers',
  components: { FormUser },

  data() {
    return {
      usuarios: [],
    }
  },

  mounted() {
    Usuarios.listar().then((response) => {
      this.usuarios = response.data
    })
  },
}
</script>

<style lang="scss">

$breakpoint: 768px;

.table {
  margin-bottom: 0 !important;

  thead {
    tr > th {
      color: gray;
    }
  }

  tbody {
    tr {
      color: darkgray;
      border-bottom: lightgray;

      &:nth-of-type(odd) {
        background-color: #3d4244;
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
      background-color: lighten(#343a40, 20%) !important;
      color: lightgray !important;
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
