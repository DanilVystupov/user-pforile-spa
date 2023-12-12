<template>
  <div class="user-content" v-if="!!user">
    <div class="user-content__text">
      <div>Name:</div>
      <div>{{ user.name }}</div>
    </div>
    <div class="user-content__text">
      <div>Username:</div>
      <div>{{ user.username }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 1268px) {
    font-size: 20px;
  }

  @media screen and (min-width: 1600px) {
    font-size: 30px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
