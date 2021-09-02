<template>
  <div class="container">
    <hr>
    <h5>Listado de Usuarios activos</h5>
    <hr>
    <!-- <el-button type="primary" @click="add">Agregar</el-button> -->
    <el-table v-loading="loading" :data="usuariosList" style="width: 100%">
      <el-table-column prop="nombre" label="Nombre" width="180">
      </el-table-column>

      <el-table-column prop="apellido" label="Apellido" width="180">
      </el-table-column>

      <el-table-column prop="correo" label="Correo"> </el-table-column>

      <el-table-column fixed="right" label="Operaciones" width="120">
        <span slot-scope="scope">
          <el-button @click="toDelete(scope.row['id'])" type="text" size="small"
            >Eliminar</el-button
          >
          <el-button @click="edit(scope.row)" type="text" size="small"
            >Editar</el-button
          >
        </span>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Firebase from "firebase";
import { mapState } from "vuex";
import { Message } from "element-ui";
import axios from "axios";
export default {
  mounted() {
    this.cargaTabla();
  },
  methods: {
    cargaTabla() {
      this.$store.dispatch("getUsuarios");
    },

    toDelete(id) {
      this.$confirm('Esta seguro de borrar registro?', 'Borrado de Usuario', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios.delete(`https://prueba-bcdf9-default-rtdb.firebaseio.com/tareas/${id}.json`)
            .then((accept) => {
              let datos = accept.data
              this.cargaTabla();
            });
            this.$message({
            type: 'success',
            message: 'Borrado Exitoso'
          });  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Borrado cancelado'
          });          
        });  
    },

    edit(row) {
      this.$store.state.edit = true;
      this.$store.state.persona = row;
    },

    add() {
      this.$store.state.edit = false;
      this.$store.state.persona = {};
    },
  },
  computed: {
    ...mapState(["personas", "loading"]),

    usuariosList() {
        return Object.values(this.personas)
        this.personas.forEach(element => console.log(element));
        return this.personas.for((persona) => {
          persona.data.id === persona.id;
          return persona.data;
        });
    },
    
  },
};
</script>
