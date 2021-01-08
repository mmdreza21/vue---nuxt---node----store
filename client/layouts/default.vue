<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
#mmmd {
  background-image: url("../assets/image/99.jpg");
}
</style>
