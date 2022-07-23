<template>
  <form class="form-login" @submit.prevent="authenticate">
    <div>
      <input class="form-input" type="text" placeholder="Email" v-model="formLogin.email"/>
    </div>
    <br />
    <div>
      <input class="form-input" type="password" placeholder="Password" v-model="formLogin.password"/>
    </div>
    <br />
    <div>
      <button class="form-button" type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
import {login} from '@/helpers/auth'
import VueSweetalert2 from 'vue-sweetalert2';
export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      type: "login",
      error: null,
    };
  },
  methods: {
    authenticate() {
      this.$store.dispatch("LOGIN");

      login(this.$data.formLogin)
        .then((res) => {
          this.$router.push({ path: "/success" });
          this.$swal('Success')
          
        })
        .catch((err) => {
          // this.$store.commit("LOGIN_FAILED", { err });
          this.$swal('Error')
        });
    },
  },
  computed: {
    authError() {
      return this.$store.getters.AUTH_ERROR;
    },
  },
};
</script>

<style>
.form-login {
  text-align: center;
}
.form-input {
  padding-bottom: 5px;
}
.form-button {
  margin-left: -112px;
}
</style>