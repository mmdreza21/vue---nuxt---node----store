<template>
  <v-row justify="center">
    <VCol md="12" sm="12">
      <v-tabs background-color="transparent" color="red" justify="center">
        <v-tab :to="{ name: 'product' }" exact>all</v-tab>
        <v-tab text :to="{ name: 'product-categorys', query: { cat: 'sport' } }"
          >categorys</v-tab
        >
      </v-tabs>
    </VCol>
    <v-col class="mb-3 pro" v-for="pro in products.result" :key="pro._id">
      <transition appear enter-active-class="animate__animated animate__fadeIn">
        <v-hover v-slot="{ hover }">
          <v-card
            align="right"
            :elevation="hover ? '24' : '10'"
            class="mx-auto"
            width="265"
          >
            <v-img
              max-width="370"
              :aspect-ratio="16 / 9"
              :src="require(`@/assets/image/${pro.image}.jpg`)"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out light-green accent-3 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  {{ pro.price }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-6" style="position: relative;">
              <v-btn
                absolute
                color="red accent-4"
                class="white--text"
                fab
                medium
                left
                top
                :to="`product/${pro._id}`"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
              <p class="display-1  orange--text mb-2">
                {{ pro.name.substring(0, 20) }}
              </p>
              <div class=" title mb-2">قیمت: {{ pro.price }}</div>
              <div class="font-weight-dark title mb-2">
                ...{{ pro.about.substring(0, 25) }}<br />

                {{ pro.numberInStok }} : تعداد
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </transition>
    </v-col>
    <VCol cols="12" md="12" sm="12">
      <div class="text-center">
        <nuxt-link :to="{ query: { page: products.page } }">
          <v-pagination
            v-model="products.page"
            circle
            :length="products.lent"
            :total-visible="5"
          >
          </v-pagination>
        </nuxt-link>
      </div>
    </VCol>
  </v-row>
</template>

<script>
export default {
  watchQuery: true,

  async asyncData(context) {
    const { data } = await context.app.$axios.get(
      `/item/paging?limit=8&page=${context.query.page}`
    );

    return { products: data };
  },

  computed: {
    //   products() {
    //     return this.$store.getters["product/getProduct"];
    //   }
  }
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
a {
  text-decoration: none;
}
</style>
