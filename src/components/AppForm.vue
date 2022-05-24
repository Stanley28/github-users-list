<template>
  <el-form :inline="true" :model="form" label-width="120px">
    <el-form-item label="Query">
      <el-input
        placeholder="Please input search query"
        v-model="form.login"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="loading" :loading="loading" type="primary" @click="onSubmit">Search</el-button>
      <el-button type="default" @click="onClear">Clear results</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
    },
  },

  data: () => ({
    form: {
      login: "",
    },
  }),

  methods: {
    onSubmit() {
      this.$emit("submit", this.form);
    },

    onClear() {
      this.form.login = "";
      this.$emit("clear");
    },
  },
};
</script>
