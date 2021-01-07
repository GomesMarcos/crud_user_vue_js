<template>
<div>
  <Nav />
  <div class="container">
    <table class="table table-stripped table-hover nt-5">
      <thead class="table-head">
        <tr>
          <th scope="col">Student Code </th>
          <th scope="col">Percentage of marks</th>
          <th scope="col">Grade</th>
          <th scope="col">Remarks</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr>
          <td data-label="Student Code">S001</td>
          <td data-label="percent">92</td>
          <td data-label="grade">A+</td>
          <td data-label="remakr">Excellent</td>
        </tr>
        <tr>
          <td data-label="Student Code">S002</td>
          <td data-label="percent">76</td>
          <td data-label="grade">B+</td>
          <td data-label="remakr">Good</td>
        </tr>
        <tr>
          <td data-label="Student Code">S003</td>
          <td data-label="percent">60</td>
          <td data-label="grade">C+</td>
          <td data-label="remakr">Regular</td>
        </tr>
        <tr>
          <td data-label="Student Code">S004</td>
          <td data-label="percent">45</td>
          <td data-label="grade">E+</td>
          <td data-label="remakr">Bad</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import Nav from "./Nav";
import Usuarios from "../services/usuarios";

export default {
  components: { Nav },
  name: "crud_users",

  data() {
    return {
      usuarios: []
    }
  },

  mounted() {
    Usuarios.listar().then((response) => {
      this.usuarios = response.data;
    })
    .then( () => {
      console.log('this.usuarios', this.usuarios);
    })
  },
};
</script>

<style lang="scss">

$breakpoint: 768px;

.table {
  margin-bottom: 0 !important;

  thead {
    tr > th {
      color: gray;
      font-size: 11px;
    }
  }

  tbody {
    tr {
      color: darkgray;
      font-size: 9px;
    
      &:nth-of-type(odd) {
        background-color: #eee;
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
        // color: gray;

        &:hover {
          color: lightgray;
        }
      }
    }
   } 
  }
</style>
