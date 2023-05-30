<template>
  <div class="app">
    <div class="app__view">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  &__view {
    width: 100%;
    max-width: $appMaxWidth;
    flex-grow: 1;
    margin: 0 auto;
    padding-top: 30px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
