<template>
  <v-app dark>
    <v-app-bar dir="rtl" absolute fixed hide-on-scroll app>
      <v-btn icon color="red accent-3" exact :to="{ name: 'index' }">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon color="red accent-3" @click="getout" exact>
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-toolbar-title v-if="$auth.loggedIn" v-text="title2" />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,

      title: "Admin Area",
      title2: `welcome Admin ${
        this.$auth.user ? this.$auth.user.fullname : "unkown"
      }`
    };
  },
  methods: {
    async getout() {
      try {
        await this.$auth.logout("locale");
        alert(" logoth");
      } catch (e) {
        throw e;
      }
    }
  }
};
</script>
