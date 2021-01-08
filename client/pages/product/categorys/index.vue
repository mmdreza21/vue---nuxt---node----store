<template>
  <v-row justify="end">
    <VCol md="12" sm="12">
      <transition appear enter-active-class="animate__animated animate__fadeIn">
        <v-tabs background-color="transparent" color="red" justify="center">
          <nuxt-link
            color="primary"
            tag="v-tab"
            :to="{ query: { cat: 'sport' } }"
          >
            sport
          </nuxt-link>
          <nuxt-link tag="v-tab" :to="{ query: { cat: 'foods' } }">
            foods
          </nuxt-link>
          <nuxt-link tag="v-tab" :to="{ query: { cat: 'drink' } }">
            drink
          </nuxt-link>
          <v-spacer></v-spacer>
          <nuxt-link tag="v-tab" :to="{ name: 'product' }" exact
            >all
          </nuxt-link>
        </v-tabs>
      </transition>
    </VCol>

    <VCol sm="12" md="12">
      <h1>{{ products.cat }}</h1></VCol
    >
    <v-col class="mb-3 pro" v-for="pro in products.item" :key="pro._id">
      <transition appear enter-active-class="animate__animated animate__zoomIn">
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
              <h3 class="display-1 font-weight-light orange--text mb-2">
                {{ pro.name }}
              </h3>
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
        <nuxt-link :to="{ query: { page: products.page, cat: products.cat } }">
          <v-pagination
            v-model="products.page"
            circle
            :length="products.lent"
            :total-visible="7"
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
      `/item/cat?limit=8&page=${context.query.page}&cat=${context.query.cat}`
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
