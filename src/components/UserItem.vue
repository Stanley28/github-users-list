<template>
  <el-row>
    <el-col v-loading="loading">
      <div class="user" :class="{ 'user--gray': 0 === index % 2 }">
        <div class="user__avatar-wrapper">
          <img :src="user.avatarUrl" class="user__avatar" />
        </div>
        <div @click="onLoginClick" class="user__login">
          {{ user.login }}
        </div>
        <div class="user__link-wrapper">
          <el-link
            target="_blank"
            :href="`https://github.com/${user.login}`"
            type="info"
          >
            Profile link
          </el-link>
        </div>
      </div>
    </el-col>
    <UserModal
      v-if="userObject"
      :user="userObject"
      :dialogVisible="dialogVisible"
      @close="dialogVisible = false"
    />
  </el-row>
</template>

<script>
import UserModal from "@/components/UserModal.vue";

export default {
  components: {
    UserModal,
  },
  props: {
    user: {
      type: Object,
    },

    index: {
      type: Number,
    },
  },

  data: () => ({
    dialogVisible: false,
    loading: false,
    userObject: null,
  }),

  methods: {
    async onLoginClick() {
      this.loading = true;

      this.userObject = await this.$store.dispatch("users/fetchUser", {
        login: this.user.login,
      });

      this.loading = false;
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
.user {
  display: grid;
  grid-gap: 5px;
  align-items: center;
  grid-template-columns: 75px 2fr 1fr;
  padding: 20px 15px;
  border-radius: 10px;
}

.user--gray {
  background-color: #d7d7d7;
}

.user__login {
  cursor: pointer;
  text-align: left;
  font-size: 1.5rem;
}

.user__login:hover {
  text-decoration: underline;
}

.user__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user__avatar--big {
  width: 100px;
  height: 100px;
}

.user__link-wrapper {
  font-size: 1.2rem;
}
</style>
