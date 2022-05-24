<template>
  <div>
    <el-link @click="onClick" type="primary">{{ internalValue }}</el-link>
  </div>
</template>

<script>
import directions from "@/constants/sortDirections.js";

export default {
  props: {
    value: {
      type: String,
    },
  },

  data: () => ({
    internalValue: null,
  }),

  created() {
    this.internalValue = this.value;
    this.$emit("input", this.internalValue);
  },

  methods: {
    onClick() {
      this.internalValue = this.internalValue === directions.ASC ? directions.DESC : directions.ASC;

      this.$emit("input", this.internalValue);
    },
  },
};
</script>
