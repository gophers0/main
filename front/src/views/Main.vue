<template>
  <v-container class="login-page d-flex align-center justify-center">
    <v-card max-width="360" width="100%">
      <v-container>
        <v-form @submit.prevent="onSubmit">
          <v-text-field v-model="login" label="Login" required outlined />
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
            outlined
          />
          <v-btn block type="submit"> Login </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  components: {},
  methods: {
    async onSubmit() {
      await this.$store.dispatch("login", {
        login: this.login,
        password: this.password,
      });
      if (this.$store.state.user) {
        await this.$router.push("/profile");
      }
    },
  },
};
</script>

<style lang="scss">
.login-page {
  min-height: 100%;
}
</style>
