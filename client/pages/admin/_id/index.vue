<template>
  <div>
    <Form :product="pro" @submit="edit" @del="delet" />
  </div>
</template>

<script>
import Form from "@/components/admin/Form.vue";
export default {
  components: { Form },

  asyncData(context) {
    return context.app.$axios
      .$get(`/item/one/${context.params.id}`)
      .then(data => {
        return {
          pro: { ...data }
        };
      })
      .catch(e => {
        console.log(e);
      });
  },

  methods: {
    async delet(product) {
      try {
        await this.$store.dispatch("product/deletProduct", product);
        this.$router.push("/admin");
      } catch (e) {
        console.log(e);
      }
    },
    async edit(product) {
      try {
        await this.$store.dispatch("product/editProduct", product).then(() => {
          this.$router.push("/admin");
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.$store.dispatch("admin/getcat");
  }
};
</script>
