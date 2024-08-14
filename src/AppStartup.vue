<template>
  <AppVersion />
  <RouterView v-if="!auth.isAnonymous" />
  <div v-else>
    <SessionPage />
  </div>
</template>

<script setup lang="ts">
import AppVersion from "@app/components/shared/AppVersion.vue"
import { onMounted } from "vue"
import { RouterView } from "vue-router"
import SessionPage from "./pages/SessionPage.vue"
import { useAuth } from "./stores/useAuth"
import { useColorSchema } from "./stores/useColorSchema"

const auth = useAuth()
const colors = useColorSchema()

onMounted(() => {
  document.documentElement.dataset.theme = colors.schema.toLocaleLowerCase()
})
</script>

<style scoped></style>
