import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    persona:{
      nombre:'',
      apellido:'',
      correo:'',
      id:'',
    },
    edit: false,
    personas:[],
    loading: false
  },
  mutations: {
    getUsuarios(state,datos){
      state.personas = datos;
      state.loading = false;
    },

    loadingTable(state){
      state.loading = true
    },
    editbton(state){
      state.edit=false;
    }
  },
  actions: {
    getUsuarios(context){
      context.commit('loadingTable')
      axios.get('https://prueba-bcdf9-default-rtdb.firebaseio.com/tareas.json')
      .then((accept) =>{
        let data = accept.data
        let datos = []
        Object.values(data).forEach((persona,index)=>{
          persona.id = Object.keys(data)[index]
          datos.push(persona)
        })
        context.commit('getUsuarios',datos)
        this.nombre='';
        this.apellid='';
        this.correo='';
        this.id='';
      })
    },
    editbton(context){
      context.commit('editbton')
    }
  },

})
