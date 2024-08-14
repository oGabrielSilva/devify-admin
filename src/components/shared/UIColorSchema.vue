<template>
  <div>
    <div :class="'dropdown is-right' + (isActive ? ' is-active' : '')">
      <div class="dropdown-trigger">
        <button
          ref="button"
          type="button"
          @click="isActive = !isActive"
          aria-haspopup="true"
          aria-controls="dropdown-menu-color-schema"
          class="button is-text px-3 py-1"
        >
          <span
            :class="
              'icon is-small '.concat(
                (colors.schema === 'SYSTEM' && 'has-text-primary') ||
                  (colors.schema === 'DARK' && 'has-text-link') ||
                  'has-text-warning'
              )
            "
          >
            <UIIcon
              :name="
                colors.schema === 'SYSTEM' ? 'computer' : colors.schema === 'DARK' ? 'moon' : 'sun'
              "
            />
          </span>

          <span class="icon is-small">
            <UIIcon style="font-size: 0.7em" name="angle-down" />
          </span>
        </button>
      </div>
      <div
        style="min-width: fit-content"
        class="dropdown-menu"
        id="dropdown-menu-color-schema"
        role="menu"
      >
        <div class="dropdown-content p-2">
          <button
            type="button"
            @click="colors.update('SYSTEM')"
            class="is-flex is-align-items-center gap-3 mb-1 has-text-primary dropdown-item"
            style="border-radius: 4px"
          >
            <span class="icon is-small">
              <UIIcon name="computer" />
            </span>
            <span>Sistema</span>
          </button>
          <button
            type="button"
            @click="colors.update('LIGHT')"
            class="is-flex is-align-items-center gap-3 mb-1 has-text-warning dropdown-item"
            style="border-radius: 4px"
          >
            <span class="icon is-small">
              <UIIcon name="sun" />
            </span>
            <span>Claro</span>
          </button>
          <button
            type="button"
            @click="colors.update('DARK')"
            class="is-flex is-align-items-center gap-3 dropdown-item has-text-link"
            style="border-radius: 4px"
          >
            <span class="icon is-small">
              <UIIcon size="1x" name="moon" />
            </span>
            <span>Escuro</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorSchema } from "@app/stores/useColorSchema"
import { onMounted, onUnmounted, ref } from "vue"
import UIIcon from "./UIIcon.vue"

const button = ref<HTMLButtonElement>()
const isActive = ref(false)
const colors = useColorSchema()

const func = (e: MouseEvent) => {
  if (button.value && !button.value.contains(e.target as Node)) {
    isActive.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", func)
})

onUnmounted(() => {
  document.removeEventListener("click", func)
})
</script>

<style scoped></style>
