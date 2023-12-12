<template>
  <UserList :users="users" />
</template>

<script>
import UserList from "@/components/users/UsersList.vue";

export default {
  name: "MainPage",
  components: {
    UserList,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>
