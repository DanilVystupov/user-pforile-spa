<template>
  <div>
    <div v-if="isLoading"><Loader /></div>
    <div v-else class="user">
      <h1 class="user__title">
        Страница: <span>{{ user.name }}</span>
      </h1>

      <div class="user-links">
        <router-link
          class="user-links__item"
          :to="{ name: 'userPosts', params: { id: user.id } }"
        >
          <Button class="user-links__item-btn">
            Открыть посты пользователя
          </Button>
        </router-link>

        <router-link
          class="user-links__item"
          :to="{ name: 'userAlbums', params: { id: user.id } }"
        >
          <Button class="user-links__item-btn">
            Открыть альбомы пользователя
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "../UI/Loader.vue";
import Button from "../UI/Button.vue";

export default {
  name: "UserDetails",

  components: {
    Loader,
    Button,
  },

  computed: {
    ...mapGetters(["GET_USERS", "GET_POSTS", "GET_LOADING"]),

    users() {
      return this.GET_USERS;
    },

    user() {
      return this.users.find(
        (user) => user.id === parseInt(this.$route.params.id)
      );
    },

    posts() {
      return this.GET_POSTS;
    },

    isLoading() {
      return this.GET_LOADING;
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;

  &__title {
    text-align: center;
    font-size: 25px;

    @media screen and (max-width: 768px) {
      & span {
        display: block;
      }
    }

    @media screen and (min-width: 1268px) {
      font-size: 30px;
    }

    @media screen and (min-width: 1600px) {
      font-size: 35px;
    }
  }
}

.user-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &__item {
    display: flex;
    justify-content: center;

    &-btn {
      @media screen and (min-width: 1268px) {
        font-size: 18px;
      }

      @media screen and (min-width: 1600px) {
        font-size: 25px;
      }
    }
  }
}
</style>
