<template>
  <el-form inline :model="persona" class="demo-form-inline">
    <el-input v-model="persona.id" placeholder="Id" type="hidden"></el-input>
    <el-form-item label="Nombre">
      <el-input v-model="persona.nombre" placeholder="Nombre"></el-input>
    </el-form-item>

    <el-form-item label="Apellido">
      <el-input v-model="persona.apellido" placeholder="Apellido"></el-input>
    </el-form-item>

    <el-form-item label="Correo">
          <el-input v-model="persona.correo" placeholder="Correo" type="email">
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        v-if="edit"
        :loading="loading"
        @click="editPatient"
        >Editar</el-button
      >
      <el-button type="primary" v-else :loading="loading" @click="addPatient"
        >Agregar</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Firebase from "firebase";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { Message } from "element-ui";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // creacion
    addPatient() {
      // validacion para no guardar registro en blanco
      if(this.persona.nombre!= '' && this.persona.apellido!='' && this.persona.correo!=''){
      
      // lleno mi objeto para ser cargado en la petición
      let patient = {
        apellido: this.persona.apellido,
        edad: this.persona.edad,
        correo: this.persona.correo        
      };
      this.loading = true;
      axios.post("https://prueba-bcdf9-default-rtdb.firebaseio.com/tareas.json",this.persona)
        .then((accept) => {
          this.loading = false;
          this.$store.dispatch("getUsuarios");
          this.persona.nombre = '';
          this.persona.apellido = '';
          this.persona.correo = '';
          }
        )
        this.$message({
            showClose: true,
            message: 'Usuario Agregado correctamente',
            type: "success",
          });
      }else{
        this.$message({
            showClose: true,
            message: 'Debe llenar todos los campos',
            type: "error",
          });
      }
    },

    //edicion
    editPatient() {
      if(this.persona.nombre!= '' && this.persona.apellido!='' && this.persona.correo!=''){
        this.$confirm('Esta seguro de editar el Usuario?', 'Edicion de usuario', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let persona = {
            nombre: this.persona.nombre,
            apellido: this.persona.apellido,
            correo: this.persona.correo,
            id: this.persona.id,
          };

          this.loading = true;
          axios.put(`https://prueba-bcdf9-default-rtdb.firebaseio.com/tareas/${this.persona.id}.json`,persona)
            .then((accept) => {
              this.loading = false;
              this.$store.dispatch("getUsuarios");
              // limpiar campos
              this.persona.nombre = '',
              this.persona.apellido = '',
              this.persona.correo = ''
          });
          this.$store.dispatch("editbton");
          this.loading = false;

          this.$message({
            type: 'success',
            message: 'Usuario actualizado correctamente'
          });

        }).catch(() => {
          this.$store.dispatch("editbton");
          this.persona.nombre = '',
          this.persona.apellido = '',
          this.persona.correo = ''
          this.$store.dispatch("getUsuarios");
        });
      }else{
        this.$message({
          showClose: true,
          message: 'Debe llenar todos los campos',
          type: "error",
        });
      }
    },
  },
  computed: {
    ...mapState(["persona", "edit"]),
  },
};
</script>
