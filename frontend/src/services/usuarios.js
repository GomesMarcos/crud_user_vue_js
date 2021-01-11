import { http } from './config'

export default {
  listar: () => {
    return http.get('usuarios')
  },

  salvar: (usuario) => {
    return http.post('usuarios/criar', usuario)
  },

  editar: (usuario) => {
    return http.put(`usuarios/editar/${usuario.id}`, usuario)
  },

  deletar: (usuario) => {
    return http.delete(`usuarios/deletar/${usuario.id}`, usuario)
  }
}