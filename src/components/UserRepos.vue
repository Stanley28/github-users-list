<template>
  <div>
    <el-container class="user-repos" direction="vertical" v-loading="loading">
      <el-row align="middle" type="flex">
        <el-col :span="2"><SortDirectionHandler v-model="direction" /></el-col>
        <el-col :span="5"
          ><el-select v-model="sort" placeholder="Select">
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-col>
      </el-row>
      <el-row v-for="repo in reposList" :key="repo.id">
        <el-col>
          <el-link target="_blank" :href="repo.htmlUrl" type="info">
            {{ repo.name }}
          </el-link>
        </el-col>
      </el-row>
      <el-row v-if="0 === reposList.length">
        <el-col>
          <el-tag type="info">Repos not exist</el-tag>
        </el-col>
      </el-row>
    </el-container>
    <el-row v-if="showLoadMore">
      <el-button
        @click="() => fetchUserRepos(false)"
        type="primary"
        :disabled="loading"
        :loading="loading"
        size="small"
        round
      >
        Load more repos
      </el-button>
    </el-row>
  </div>
</template>

<script>
import SortDirectionHandler from "@/components/SortDirectionHandler.vue";
import directions from "@/constants/sortDirections.js";

const options = [
  {
    value: "full_name",
    label: "Full name",
  },
  {
    value: "pushed",
    label: "Pushed",
  },
  {
    value: "updated",
    label: "Updated",
  },
  {
    value: "created",
    label: "Created",
  },
];

const DEFAULT_COUNT = 30;

export default {
  components: {
    SortDirectionHandler,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data: () => ({
    loading: false,
    reposList: [],
    showLoadMore: false,
    direction: directions.ASC,
    sort: options[0].value,
    sortOptions: options,
    page: 0,
  }),

  created() {
    this.fetchUserRepos(false);
  },

  methods: {
    async fetchUserRepos(sortChanged) {
      this.loading = true;
      this.page++;

      if (sortChanged) {
        this.page = 1;
      }

      const repos = await this.$store.dispatch("users/fetchReposByUser", {
        login: this.user.login,
        direction: this.direction,
        sort: this.sort,
        page: this.page,
      });

      this.showLoadMore = repos.items.length === DEFAULT_COUNT;

      if (sortChanged) {
        this.reposList = repos.items;
      } else {
        this.reposList = [...this.reposList, ...repos.items];
      }

      this.loading = false;
    },
  },

  watch: {
    direction() {
      this.fetchUserRepos(true);
    },

    sort() {
      this.fetchUserRepos(true);
    },
  },
};
</script>

<style>
.user-repos {
  margin: 35px 0;
}
</style>
