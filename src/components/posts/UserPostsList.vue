<template>
  <div class="user">
    <div v-if="isLoading"><Loader /></div>

    <div v-else class="user-content">
      <h1 class="user-content__title">
        Посты пользователя: <span>{{ user.name }}</span>
      </h1>

      <UserPostForm />

      <div class="user-posts">
        <div class="user-posts__item" v-for="post in posts" :key="post.id">
          <UserPostItem :post="post" />
        </div>
      </div>

      <div v-if="!posts.length" class="error-msg">
        Посты пользователя не найдены
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import UserPostItem from "./UserPostItem.vue";
import UserPostForm from "./UserPostForm.vue";
import Loader from "../UI/Loader.vue";

export default {
  name: "UserPostsList",

  components: {
    UserPostItem,
    UserPostForm,
    Loader,
    UserPostForm,
  },

  computed: {
    ...mapGetters(["GET_USERS", "GET_POSTS", "GET_LOADING"]),

    user() {
      const userId = parseInt(this.$route.params.id);
      return this.GET_USERS.find((user) => user.id === userId);
    },

    posts() {
      return this.GET_POSTS;
    },

    isLoading() {
      return this.GET_LOADING;
    },
  },

  created() {
    this.$store.dispatch("fetchPostsUser", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.user-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__title {
    text-align: center;
    @media screen and (max-width: 768px) {
      & span {
        display: block;
      }
    }
  }
}

.user-posts {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media screen and (min-width: 1024px) {
    justify-content: space-between;
  }

  &__item {
    display: flex;
    flex-direction: column;
    border: 3px solid hsl(230, 75%, 75%);
    border-radius: 5px;
    padding: 10px;
    gap: 0.5rem;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        transform: translateY(-10px);
        transition: transform 0.3s ease;
      }
    }

    @media screen and (min-width: 1024px) {
      width: 45%;
    }

    @media screen and (min-width: 1268px) {
      width: 30%;
    }
  }
}
</style>
