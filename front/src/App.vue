<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          :src="require('../src/assets/logo_small.png')"
          alt="Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="100"
        />
      </div>

      <!--      <v-spacer></v-spacer>-->

      <!--      <v-btn-->
      <!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
      <!--        target="_blank"-->
      <!--        text-->
      <!--      >-->
      <!--        <span class="mr-2">Latest Release</span>-->
      <!--        <v-icon>mdi-open-in-new</v-icon>-->
      <!--      </v-btn>-->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  mounted() {
    // const token = localStorage.token;
    // if (token) {
    //   this.$store.dispatch("fetchUser", token);
    // }
  },
};
</script>
