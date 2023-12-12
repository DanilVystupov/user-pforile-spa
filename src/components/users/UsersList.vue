<template>
  <div class="users">
    <div v-if="isLoading"><Loader /></div>

    <h1 v-else class="users__title">Пользователи</h1>
    <div class="users-content">
      <div class="user-wrap" v-for="user in users" :key="user.id">
        <router-link :to="{ name: 'userDetails', params: { id: user.id } }">
          <UserItem :user="user" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue";
import Loader from "../UI/Loader.vue";
import { mapGetters } from "vuex";

export default {
  name: "UsersList",
  components: {
    UserItem,
    Loader,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["GET_LOADING"]),

    isLoading() {
      return this.GET_LOADING;
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__title {
    text-align: center;
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem;
    gap: 1rem;

    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
}

.user-wrap {
  width: 23%;
  border: 3px solid hsl(230, 75%, 75%);
  border-radius: 5px;
  padding: 0.5rem;

  @media screen and (max-width: 1024px) {
    width: 30%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    text-align: center;
  }

  @media (hover: hover) {
    &:hover {
      border-color: transparent;
      background-color: rgb(64, 64, 145);
      transition: background-color 0.3s ease;
      & > a {
        color: white;
      }
    }
  }
}
</style>
