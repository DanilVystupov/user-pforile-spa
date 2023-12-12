<template>
  <button v-on="$listeners" class="myBtn">
    <slot></slot>
  </button>
</template>

<script>
/* eslint-disable */
export default {
  name: "Button",
};
</script>

<style lang="scss" scoped>
.myBtn {
  padding: 10px 15px;
  color: hsl(230, 75%, 75%);
  background: transparent;
  border: 2px solid hsl(230, 75%, 75%);
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;

  @media (hover: hover) {
    &:hover {
      color: white;
      background-color: rgba(64, 64, 145, 0.9);
      transition: background-color 0.3s ease;
    }
  }
}
</style>
