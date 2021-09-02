<template>
  <el-container>
    <el-menu mode="horizontal" 
    background-color="#545c64"
    active-text-color="#ffd04b"
    text-color="#fff"
    >
      <el-menu-item index="1">Desafio CRUD</el-menu-item>
      
      <el-menu-item index="2" class="derecha" style="float:right">
       <el-button
        icon="el-icon-circle-close"
        square
        @click="logout"
        title="logout">
        Salir
      </el-button>
      </el-menu-item>
    </el-menu>
    <el-header>
      <h3>Desafío - Creación de CRUD mediante Vuex</h3>
      
    </el-header>
    <el-container>
      <el-main>
        <Addusuario />
        <Listado />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Firebase from "firebase";
import Addusuario from '@/components/Addusuario'
import Listado from '@/components/Listado'
export default {
  components:{
    Addusuario,
    Listado
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then((accept) => {
          this.$router.push("login");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.derecha{
  text-align: right;
}
</style>
