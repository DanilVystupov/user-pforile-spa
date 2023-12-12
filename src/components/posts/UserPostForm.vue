<template>
  <div class="post-form">
    <h2 class="post-form__title">Добавить новый пост</h2>
    <form class="form" @submit.prevent="createPost">
      <div class="form__header">
        <label class="form__header-title" for="title">Заголовок:</label>
        <input
          class="form__header-title__text"
          v-model="newPost.title"
          type="text"
          id="title"
          required
        />
      </div>

      <div class="form__body">
        <label class="form__body-description" for="description"
          >Описание:</label
        >
        <input
          class="form__body-description__text"
          v-model="newPost.body"
          type="text"
          id="description"
          required
        />
      </div>
    </form>

    <div class="post-form-button">
      <Button class="post-form__button__item" type="submit" @click="createPost">
        Создать
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../UI/Button.vue";

export default {
  name: "UserPostForm",

  components: {
    Button,
  },

  data() {
    return {
      newPost: {
        title: "",
        body: "",
      },
    };
  },

  computed: {
    ...mapGetters(["GET_POSTS"]),

    posts() {
      return this.GET_POSTS;
    },
  },

  methods: {
    createPost() {
      this.$store.dispatch("createPost", {
        userId: this.$route.params.id,
        id: this.posts.length + 1,
        title: this.newPost.title,
        body: this.newPost.body,
      });

      this.newPost = { title: "", body: "" };
    },
  },
};
</script>

<style lang="scss" scoped>
.post-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &__title {
    text-align: center;
    font-size: 20px;
    font-weight: 400;

    @media screen and (min-width: 1268px) {
      font-size: 25px;
    }

    @media screen and (min-width: 1600px) {
      font-size: 30px;
    }
  }

  &-button {
    display: flex;
    margin-left: auto;

    &__item {
      margin: 0;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    &-title {
      &__text {
        padding: 10px;
        border: 2px solid hsl(230, 66%, 9%);
        border-radius: 5px;

        &:focus {
          border-color: hsl(230, 75%, 75%);
        }
      }
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &-description {
      &__text {
        padding: 10px;
        border: 2px solid hsl(230, 66%, 9%);
        border-radius: 5px;

        &:focus {
          border-color: hsl(230, 75%, 75%);
        }
      }
    }
  }
}
</style>
