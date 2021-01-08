<template>
  <v-card dir="rtl" class="mx-auto" max-width="800">
    <v-card-text>
      <v-row>
        <v-col md="6" sm="12">
          <h2 display-1 class=" text--primary">
            نام ونام خانوادگی:{{ getuser.fname + " " + getuser.lname }}
          </h2>
        </v-col>
        <br />
        <v-col md="6" sm="12">
          <h3 display-1 class=" text--primary">
            شماره تماس:{{ getuser.phone }}
          </h3>
        </v-col>

        <br />
        <v-col md="6" sm="12">
          <h3 display-1 class=" text--primary">
            آدرس الکتریکی:{{ getuser.email }}
          </h3>
        </v-col>
        <v-col md="6" sm="12">
          <h3 display-1 class=" text--primary">آدرس:{{ getuser.address }}</h3>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" text v-bind="attrs" v-on="on">
                ویرایش اطلاعات
              </v-btn>
            </template>
            <v-card>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                dir="rtl"
                @submit.prevent="edit"
              >
                <v-card-title>
                  <span class="headline">ویرایش اطلاعات</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="user.fname"
                          :rules="fnameRules"
                          label="نام"
                          required
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="user.lname"
                          :rules="lnameRules"
                          label="نام خانوادگی"
                          required
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12">
                        <v-text-field
                          type="phone"
                          v-model="user.phone"
                          :rules="phoneRules"
                          label="شماره تماس"
                          required
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12">
                        <v-textarea
                          v-model="user.address"
                          :rules="addressRules"
                          label="ادرس"
                          required
                          outlined
                          dense
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <div class="act">
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    type="submit"
                    text
                    :disabled="!valid"
                    @click="validate"
                  >
                    Save
                  </v-btn>
                </div>
              </v-form>
              <br />
              <v-spacer></v-spacer>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: this.getuser
        ? { ...this.getuser }
        : {
            fname: "",
            phone: "",
            lname: "",
            address: ""
          },
      dialog: false,
      valid: false,
      fnameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be grater than 3 characters"
      ],
      lnameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be grater than 3 characters"
      ],
      phoneRules: [
        v => !!v || "phone is required",
        v => /^09/.test(v) || "phone number must start whit 09",
        v => (v && v.length >= 11) || "phone must be valid nubmer "
      ],

      addressRules: [
        v => !!v || "addres is required",
        v => (v && v.length >= 11) || "address must be valid adress "
      ],
      editedIndex: -1
    };
  },

  computed: {
    ...mapGetters({
      getuser: "submit/getUser"
    })
  },
  methods: {
    edit() {
      this.$store.dispatch("submit/getuserserver", this.$auth.user);
      this.$store
        .dispatch("submit/editUserAct", {
          _id: this.$auth.user._id,
          user: this.user
        })
        .then(() => {
          this.dialog = false;
        });
    },
    validate() {
      this.$refs.form.validate();
    }
  },

  created() {
    this.$store.dispatch("submit/getuserserver", this.$auth.user);
  }
};
</script>
<style scoped>
.act {
  text-align: center;
  justify-items: center;
  justify-content: center;
}
</style>
