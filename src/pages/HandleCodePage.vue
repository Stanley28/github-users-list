<template>
  <el-row v-loading.fullscreen.lock="loading"></el-row>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
    },
  },

  data: () => ({
    loading: true,
  }),

  created() {
    this.auth();
  },

  methods: {
    async auth() {
      const { code } = this;
      await this.$store.dispatch("auth/login", { code });

      this.$router.push('/');
    },
  },
};
</script>