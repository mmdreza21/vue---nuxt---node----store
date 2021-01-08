<template>
  <div>
    <v-row justify="center" align="center">
      <v-col col="12">
        <v-carousel
          cycle
          height="500"
          hide-delimiter-background
          show-arrows-on-hover
          light
        >
          <v-carousel-item v-for="slide in getslide" :key="slide._id">
            <v-card elevation="24" width="1200" height="100٪">
              <v-parallax :src="require(`@/assets/image/6986828_preview.png`)">
                <nuxt-link width="200" :to="`/product/${slide._id}`">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4" dir="rtl">
                        <h1>
                          {{ slide.name }}
                        </h1>
                      </div>

                      <v-list-item-subtitle dir="rtl"
                        ><h2>قیمت : {{ slide.price }}</h2></v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-img
                      class="img"
                      :src="require(`@/assets/image/${slide.image}.jpg`)"
                      max-width="400"
                      max-height="350"
                    >
                    </v-img>
                  </v-list-item>
                </nuxt-link>
              </v-parallax>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <newst />
    </v-row>
    <v-row>
      <mos />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mos from "../components/product/mos.vue";
import newst from "../components/product/newest";
export default {
  components: { mos, newst },
  data() {
    return {
      // model: null
    };
  },
  computed: {
    ...mapGetters({
      getslide: "tags/getSlider"
    })
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.text {
  text-align: center;
}
.img {
  margin: 25px;
}
</style>
