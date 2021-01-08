<template>
  <v-container grid-list-xs>
    <v-row justify="center">
      <list :pros="products" />
    </v-row>
    <NewAdd />
  </v-container>
</template>
<script>
import NewAdd from "../../components/buton/NewAdd.vue";
import List from "../../components/product/list.vue";
export default {
  data() {
    return {};
  },
  layout: "admin",
  components: {
    List,
    NewAdd
  },
  computed: {
    products() {
      return this.$store.getters["product/getProduct"];
    }
  }
};
</script>
