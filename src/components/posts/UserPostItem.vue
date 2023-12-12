<template>
  <div class="user-wrap">
    <div class="user-post" v-if="!!post && !isEdit">
      <div class="user-post__title">{{ post.id }}. {{ post.title }}</div>
      <div class="user-post__body">{{ post.body }}</div>
      <div class="user-post__btn">
        <Button class="user-post__btn-item" @click="handleEdit">
          Редактировать
        </Button>
      </div>
    </div>

    <UserPostEditor
      v-if="isEdit"
      :post="post"
      @savePost="savePost"
      @onCancel="onCancel"
    />
  </div>
</template>

<script>
import UserPostEditor from "./UserPostEditor.vue";
import Button from "../UI/Button.vue";

export default {
  name: "UserPostItem",

  components: {
    UserPostEditor,
    Button,
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isEdit: false,
    };
  },

  methods: {
    savePost(updatedPost) {
      this.$store.dispatch("savePost", updatedPost);
      this.isEdit = false;
    },

    handleEdit() {
      this.isEdit = true;
    },

    onCancel() {
      this.isEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-wrap {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.user-post {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;

  &__title,
  &__body {
    @media screen and (min-width: 1268px) {
      font-size: 18px;
    }

    @media screen and (min-width: 1600px) {
      font-size: 25px;
    }
  }

  &__btn {
    display: flex;
    margin-top: auto;
  }
}
</style>
