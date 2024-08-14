<template>
  <div>
    <div data-container>
      <small :title="`Versão do sistema: ${version}`" class="is-unselectable">{{ version }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { version } from "@app/../package.json"
</script>

<style scoped>
[data-container] {
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
}

small {
  font-size: 0.65em;
}
</style>
