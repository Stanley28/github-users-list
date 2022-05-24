<template>
  <el-card shadow="never">
    <div class="user-modal__avatar-wrapper">
      <img :src="user.avatarUrl" class="user__avatar user__avatar--big" />
    </div>
    <el-descriptions v-if="user" :column="1" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Name
        </template>
        {{ user.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          Place
        </template>
        {{ user.location }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-folder"></i>
          E-mail
        </template>
        {{ user.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          Company
        </template>
        {{ user.company }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
};
</script>
