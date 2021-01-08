<template>
  <v-row justify="center">
    <v-col class="mb-3 " v-for="pro in pros" :key="pro._id">
      <product
        :name="pro.name"
        :about="pro.about"
        :price="pro.price"
        :image="pro.image"
        :id="pro._id"
        :category="pro.categoryId.name"
      />
    </v-col>
  </v-row>
</template>

<script>
import Product from "./Product";

export default {
  props: {
    pros: {
      type: Array,
      required: true
    }
  },

  components: {
    Product
  }
};
</script>
