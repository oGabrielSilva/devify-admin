import { User } from "@app/models/User"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAuth = defineStore("Auth", () => {
  const user = ref<User>()
  const pending = ref(true)

  const isAnonymous = computed(() => {
    return pending.value || !user.value
  })

  return { pending, user, isAnonymous }
})
