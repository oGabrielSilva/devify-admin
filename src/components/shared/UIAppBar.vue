<template>
  <div class="px-3 bar-container">
    <header
      class="is-flex is-justify-content-space-between is-align-items-center"
      data-tauri-drag-region
    >
      <div class="is-flex is-align-items-center gap-3">
        <h1 class="is-unselectable is-family-monospace" data-tauri-drag-region>Devify Admin</h1>
      </div>

      <div class="is-flex is-align-items-center gap-3">
        <div>
          <UIColorSchema />
        </div>
        <div>
          <button
            data-minimize
            class="has-background-warning mr-3"
            type="button"
            @click="appWindow.minimize()"
          />
          <button
            class="has-background-danger"
            @click="appWindow.close()"
            type="button"
            data-close
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window"
import UIColorSchema from "./UIColorSchema.vue"
</script>

<style scoped>
.bar-container {
  height: 50px;
  width: 100vw;
  border-bottom: 1px solid var(--bulma-border-weak);
  height: 50px;
}

header {
  height: 100%;
}

[data-minimize],
[data-close] {
  height: 14px;
  width: 14px;
  border-radius: 100%;
}
</style>
