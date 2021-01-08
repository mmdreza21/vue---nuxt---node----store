<template>
  <div>
    <v-row>
      <v-col class="mb-3 ">
        <v-hover>
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-img
              height="400"
              width="800"
              :aspect-ratio="16 / 9"
              :src="require(`@/assets/image/${pro.image}.jpg`)"
            >
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
                @click="order"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
              <v-text-field
                v-model="count"
                label="تعداد"
                type="number"
              ></v-text-field>
              <div class="font-weight-light grey--text title mb-2">
                {{ pro.price }}
              </div>
              <h3 class="display-1 font-weight-light orange--text mb-2">
                {{ pro.name }}
              </h3>
              <div class="font-weight-light title mb-2">
                {{ pro.about }}.<br />
                {{ pro.categoryId.name }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <login :dialog="log" />
  </div>
</template>

<script>
import login from "../../../components/buton/login .vue";
export default {
  components: { login },
  data() {
    return {
      count: 1,
      log: false
    };
  },
  asyncData(context) {
    return context.app.$axios
      .$get(`item/one/${context.params.id}`)
      .then(data => {
        return { pro: data };
      })
      .catch(e => {
        throw e;
      });
  },
  methods: {
    order() {
      if (this.$auth.loggedIn) {
        const orders = {
          num: this.count,
          userId: this.$auth.user._id,
          itemId: this.$route.params.id
        };
        this.$store.dispatch("order/sendOrder", orders);
      } else {
        this.log = true;
      }
    }
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
</style>
