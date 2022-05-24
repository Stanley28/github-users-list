<template>
  <el-dialog
    :title="user.login"
    :show-close="false"
    :visible="dialogVisible"
    custom-class="user-modal"
    width="50%"
  >
    <span slot="title">
      <i class="el-icon-close" @click="$emit('close')"></i>
    </span>
    <UserCard :user="user" />
    <h3>User repos:</h3>
    <UserRepos :user="user" />
    <span slot="footer" class="user__dialog-footer">
      <el-button @click="$emit('close')">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import UserRepos from "@/components/UserRepos.vue";
import UserCard from "@/components/UserCard.vue";

export default {
  props: {
    user: {
      type: Object,
    },

    dialogVisible: {
      type: Boolean,
    },
  },

  components: {
    UserRepos,
    UserCard,
  },
};
</script>

<style>
.user-modal {
  max-height: 75vh;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.user-modal::-webkit-scrollbar {
  display: none;
}

.user-modal .el-dialog__header {
  text-align: right;
}

.user-modal__avatar-wrapper {
  margin: 0 0 15px;
}
</style>
