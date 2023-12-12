<template>
  <div class="user-post">
    <div class="user-post__title">
      <input
        type="text"
        v-model="editedPost.title"
        placeholder="Заголовок"
        @input="handleChange('title')"
      />
    </div>
    <div class="user-post__body">
      <input
        type="text"
        v-model="editedPost.body"
        placeholder="Описание"
        @input="handleChange('body')"
      />
    </div>
    <div>
      <Button @click="handleSave">Сохранить</Button>
      <Button @click="onCancel">Отмена</Button>
    </div>
  </div>
</template>

<script>
import Button from "../UI/Button.vue";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  components: {
    Button,
  },

  data() {
    return {
      editedPost: { ...this.post },
    };
  },
  methods: {
    handleChange(field) {
      return (event) => {
        const { value } = event.target;
        this.editedPost = {
          ...this.editedPost,
          [field]: value,
        };
      };
    },
    handleSave() {
      this.$emit("savePost", this.editedPost);
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-post {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  &__title > input,
  &__body > input {
    width: 100%;
    padding: 10px;
    outline: none;
    border-radius: 5px;

    @media screen and (min-width: 1268px) {
      font-size: 18px;
    }

    @media screen and (min-width: 1600px) {
      font-size: 25px;
    }
  }
}
</style>
