<template>
  <div class="main-container">
    <div class="content">
      <template v-if="isAuth">
        <AppForm @submit="onSubmit" @clear="onClear" :loading="loading" />
        <h2>{{ isSearch ? `Finded (query: ${query})` : "List" }}:</h2>
        <el-tag type="info" v-if="!loading && isSearch && findedUsers.length === 0">Nothing found</el-tag>
        <UsersList
          @loadClick="loadMore"
          :users="usersList"
          :showLoadMore="!allLoaded"
          :loading="loading"
        />
      </template>
      <el-tag v-else type="warning">Authorization is required to view the list</el-tag>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppForm from "@/components/AppForm.vue";
import UsersList from "@/components/UsersList.vue";

export default {
  components: { AppForm, UsersList },
  computed: {
    ...mapGetters("auth", ["isAuth"]),
    ...mapGetters("users", ["users", "findedUsers", "allLoaded"]),
    usersList() {
      if (this.isSearch) {
        return this.findedUsers;
      }

      return this.users;
    },
  },
  data: () => ({
    loading: false,
    isSearch: false,
    currentPage: 1,
    query: "",
  }),
  created() {
    this.loadMore();
  },
  methods: {
    async loadMore() {
      this.loading = true;
      
      if (this.isSearch) {
        this.currentPage++;

        await this.$store.dispatch("users/searchUsers", {
          query: this.query,
          page: this.currentPage,
        });
      } else {
        const id =
          this.users && !!this.users.length
            ? this.users[this.users.length - 1].id
            : 0;

        await this.$store.dispatch("users/fetchUsers", { id });
      }

      this.loading = false;
    },

    async onSubmit(form) {
      this.loading = true;

      this.isSearch = true;
      this.currentPage = 1;
      this.query = form.login;

      this.$store.commit("users/setUsers", []);

      await this.$store.dispatch("users/searchUsers", {
        query: this.query,
        page: this.currentPage,
        needReset: true,
      });
      
      this.loading = false;
    },

    onClear() {
      const itWasSearch = this.isSearch;

      this.isSearch = false;
      this.query = "";

      this.$store.commit("users/setFindedUsers", []);
      this.$store.commit("users/setAllLoaded", false);

      if (itWasSearch) {
        this.loadMore();
      }
    },
  },
};
</script>

<style>
.content {
  padding: 30px 0;
}
</style>
