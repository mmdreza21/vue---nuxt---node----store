<template>
  <v-hover v-slot="{ hover }">
    <v-card class="mx-auto" color="grey lighten-4" max-width="370">
      <v-img
        height="255"
        width="370"
        :aspect-ratio="16 / 9"
        :src="require(`@/assets/image/${image}.jpg`)"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out light-green accent-3 v-card--reveal display-3 white--text ss"
            style="height: 100%;"
          >
            {{ price }}
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-6" style="position: relative;">
        <v-btn
          absolute
          color="red accent-4"
          class="white--text"
          fab
          large
          right
          top
          :to="`admin/${id}`"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">
          قیمت: {{ price }}
        </div>
        <h3 class="display-1 font-weight-light orange--text mb-2">
          {{ name }}
        </h3>
        <div class="font-weight-light title mb-2">
          {{ about.substring(0, 30) }}.<br />
          category:
          <nuxt-link to="/">
            {{ category }}
          </nuxt-link>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    about: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    products() {
      return this.$store.getters["product/getP"];
    }
  }
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
