<template>
  <header class="header">
    <div class="main-container">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <div class="header__title">Github users list</div>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="end">
            <el-button v-if="!isAuth" @click="onAuthorizeClick" type="primary">Authorize</el-button>
            <span v-else>You`re authorized</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
import config from "@/config";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isAuth"])
  },

  methods: {
    onAuthorizeClick() {
      window.location = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&redirect_uri=http://localhost:8080/handle-code`;
    },
  },
};
</script>

<style>
.header {
  border-bottom: 1px solid gray;
  padding: 10px 0;
}

.header__title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
}
</style>
