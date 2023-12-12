<template>
  <div class="container">
    <router-view :users="users" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters(["GET_USERS"]),
    users() {
      return this.GET_USERS;
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style>
@import "@/app/global.scss";
</style>
