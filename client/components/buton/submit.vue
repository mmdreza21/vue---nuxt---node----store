<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          large
          elevation="24"
          icon
          color="red"
          dark
          fab
          bottom
          right
          fixed
        >
          <v-icon x-large>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="sub"
          lazy-validation
        >
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-row>
                  <v-col cols="12" sm="3" md="6">
                    <v-text-field
                      label="name*"
                      v-model="name"
                      :rules="nameRules"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3" md="6">
                    <v-text-field
                      label="price*"
                      :disabled="isfree"
                      v-model="price"
                      :rules="priceRules"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="6">
                    <v-text-field
                      label="number*"
                      v-model="numberInStok"
                      type="number"
                      :rules="numberInStokRules"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3" md="6">
                    <v-text-field
                      label="image name*"
                      :rules="imageRules"
                      v-model="image"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="3">
                    <v-select
                      v-model="categoryId"
                      :items="getcats.result"
                      label="category*"
                      item-value="_id"
                      item-text="name"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="3" md="6">
                    <v-select
                      v-model="tag"
                      :items="tags"
                      item-value="tags[]"
                      attach
                      dense
                      outlined
                      chips
                      label="tags*"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="6" sm="3" md="6">
                    <v-textarea
                      label="about*"
                      v-model="about"
                      :rules="aboutRules"
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-col cols="12" sm="3" md="6">
                  <v-checkbox
                    label="free"
                    v-model="isfree"
                    color="red"
                  ></v-checkbox>
                </v-col>
                <v-divider inset></v-divider>
                <br />
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              type="submit"
              text
              :disabled="!valid"
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      dialog: false,

      categoryId: undefined,
      isfree: false,
      name: "",
      valid: false,
      tags: ["slider", "sugest", "null"],
      tag: ["slider", "sugest", "null"],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be atlest than 3 characters"
      ],
      price: "free",

      priceRules: [
        v => !!v || "Name is required",
        v => (v && v.length > 2) || "price must be lest than 2 characters"
      ],

      numberInStok: 0,
      numberInStokRules: [
        v => !!v || "number is required",
        v => (v && v.length > 0) || "number must be atlest than 1 characters"
      ],
      about: "",
      valid: true,
      aboutRules: [
        v => !!v || "about is required",
        v => (v && v.length > 5) || "about must be atllest than 5 characters"
      ],
      tag: [],

      image: "",
      valid: true,
      imageRules: [v => !!v || "image name is required"]
    };
  },

  methods: {
    sub() {
      const pro = {
        categoryId: this.categoryId,
        name: this.name,
        price: this.price,
        isfree: this.isfree,
        numberInStok: this.numberInStok,
        tag: this.tag,
        about: this.about,
        image: this.image
      };
      this.$store.dispatch("product/sendProduct", pro);
    }
  },
  computed: {
    getcats() {
      return this.$store.getters["admin/getcat"];
    }
  },
  created() {
    this.$store.dispatch("admin/getcat");
  }
};
</script>
