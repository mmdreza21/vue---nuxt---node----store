<template>
  <v-sheet class="mx-auto shet" max-width="1200">
    <v-parallax :src="require(`@/assets/image/6986828_preview.png`)">
      <div class="text" dir="rtl"><h1>پرفروش ترین محصولات</h1></div>

      <v-slide-group class="pa-4" center-active show-arrows>
        <v-slide-item v-for="most in getmost" :key="most._id">
          <v-hover v-slot="{ hover }">
            <v-col>
              <v-card
                :elevation="hover ? 20 : 2"
                color="white"
                class="ma-4"
                height="340"
                width="300"
              >
                <v-row class="fill-height" align="center" justify="center">
                  <v-img
                    max-width="290"
                    :src="require(`@/assets/image/${most.image}.jpg`)"
                    height="150"
                  ></v-img>

                  <v-card-text class="text" dir="rtl">
                    <v-sheet class="mx-auto" elevation="0" max-width="250">
                      <h3>{{ most.name }}</h3>
                    </v-sheet>

                    <br />
                    <v-sheet class="mx-auto" elevation="0" max-width="250">
                      <h4>قیمت: {{ most.price }}</h4>
                    </v-sheet>
                  </v-card-text>

                  <v-spacer></v-spacer>

                  <v-hover v-slot="{ hover }">
                    <v-btn
                      rounded
                      :outlined="!hover"
                      elevation="20"
                      :color="!hover ? 'black' : 'green'"
                      :to="`/product/${most._id}`"
                    >
                      <v-icon>mdi-basket</v-icon> مشاهده و خرید
                    </v-btn>
                  </v-hover>
                  <br />
                </v-row>
              </v-card>
            </v-col>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-parallax>
  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getmost: "tags/getMost"
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
.shet {
  background-size: contain;
}
</style>
