<template>
  <div>
    <v-data-table
      dir="rtl"
      :disable-pagination="true"
      hide-default-footer
      :headers="headers"
      :items="getorders"
      class="elevation-0"
      dense
    >
      <template v-slot:top>
        <v-toolbar dir="rtl">
          <v-toolbar-title>سبد خرید</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card dir="rtl">
              <v-card-title>
                <span class="headline"> تغییر تعداد </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.num"
                        label="تعداد جدید"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  انصراف
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  ‌ذخیره
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="headline"
                >ایا مطمعا هستید میخاهید ایم محصول را از سبد خرید خود پاک
                کنید؟</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >انصراف</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >بله</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="error" small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-btn color="success" to="/end">تایید و ادامه</v-btn>
    <v-btn color="success" to="/">افزودن محصول بیشتر</v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: "auth",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "نام محصول",
        align: "center",
        sortable: false,
        value: "itemId.name"
      },
      { text: "قیمت", align: "center", value: "itemId.price" },
      { text: "تعداد", align: "center", value: "num" },

      { text: " ", align: "center", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: { num: 0, itemId: null }
  }),

  computed: {
    ...mapGetters({
      getorders: "order/getOrder"
    })
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.$store.dispatch("order/getOrderserver", this.$auth.user);
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1);
      this.$store.dispatch("order/deleteorder", this.editedItem);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      
     
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.close();
    }
  }
};
</script>
