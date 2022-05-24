<template>
  <div class="list">
    <UserItem
      v-for="(user, index) in users"
      :key="user.id"
      :user="user"
      :index="index"
    />
    <div class="list__footer">
      <el-button
        v-if="showLoadMore"
        @click="loadClick"
        type="primary"
        :disabled="loading"
        :loading="loading"
        round>
        Load more users
      </el-button>
    </div>
  </div>
</template>

<script>
import UserItem from "@/components/UserItem.vue";

export default {
  props: {
    users: {
      type: Array,
    },
    showLoadMore: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
  },

  components: {
    UserItem,
  },

  methods: {
    loadClick() {
      this.$emit("loadClick");
    },
  },
};
</script>

<style>
.list__footer {
  margin: 15px 0 0;
}
</style>
