<template>
  <div ref="modal">
    <div :id="props.id" class="modal">
      <div class="modal-background" />
      <div class="modal-card p-5" style="max-width: 620px">
        <header
          :style="{
            boxShadow: 'unset',
            ...($slots.default
              ? { backgroundColor: 'var(--bulma-modal-card-foot-background-color)' }
              : {}),
            ...(!props.primaryButton && !props.secondaryButton && !$slots.default
              ? { borderRadius: '1rem' }
              : {}),
          }"
          class="modal-card-head gap-1"
        >
          <h1 class="modal-card-title" style="max-width: calc(100% - 20px)">
            {{ props.title }}
          </h1>
          <button type="button" @click="closeModal(props.id)" class="delete" aria-label="close" />
        </header>
        <section
          :style="{
            ...(!props.primaryButton && !props.secondaryButton
              ? { borderRadius: '0 0 1rem 1rem' }
              : {}),
          }"
          class="modal-card-body"
        >
          <slot />
        </section>
        <footer
          v-if="props.primaryButton || props.secondaryButton"
          class="modal-card-foot is-justify-content-end"
        >
          <div class="buttons">
            <button
              v-if="props.secondaryButton"
              data-secondary-button
              :type="props.secondaryButton.type ?? 'button'"
              :class="[
                'button',
                'is-' +
                  (props.secondaryButton?.design ?? '') +
                  (props.secondaryButton?.isOutlined ? ' is-outlined' : ''),
              ]"
              @click="(e) => {
                emits('click@secondary',e.currentTarget as HTMLButtonElement)
                if (
                  typeof props.secondaryButton?.closeModalOnClick !== 'boolean' ||
                  props.secondaryButton.closeModalOnClick == true
                ) {
                  closeModal(props.id)
                }
              }"
            >
              <UIIcon v-if="props.secondaryButton.icon" :name="props.secondaryButton.icon" />

              <span>{{ props.secondaryButton.label }}</span>
            </button>

            <button
              v-if="props.primaryButton"
              data-primary-button
              :type="props.primaryButton.type ?? 'button'"
              :class="[
                'button',
                'is-' +
                  (props.primaryButton?.design ?? 'primary') +
                  (props.primaryButton?.isOutlined ? ' is-outlined' : ''),
              ]"
              @click="(e) => {
                emits('click@primary', e.currentTarget as HTMLButtonElement)

                if (props.primaryButton?.closeModalOnClick) closeModal(props.id)
              }"
            >
              <UIIcon v-if="props.primaryButton.icon" :name="props.primaryButton.icon" />
              <span>{{ props.primaryButton.label }}</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { closeModal } from "@lib/modals"
import { ref } from "vue"
import UIIcon from "./UIIcon.vue"

// eslint-disable-next-line no-undef
interface IModalButton extends IButton {
  closeModalOnClick?: boolean
}

interface IProps {
  id: string
  title: string
  primaryButton?: IModalButton
  secondaryButton?: IModalButton
}

const modal = ref<HTMLDivElement>()

const props = defineProps<IProps>()
const emits = defineEmits<{
  "click@secondary": [button: HTMLButtonElement]
  "click@primary": [button: HTMLButtonElement]
}>()

// onMounted(() => {
//   const inp = modal.value?.querySelectorAll("input")

//   if (inp) {
//     const func = (e: KeyboardEvent) => {
//       if (e.key.toLocaleLowerCase() === "enter" && props.primaryButton?.onClick) {
//         e.preventDefault()
//         props.primaryButton.onClick(modal.value!.querySelector("[data-primary-button]")!)
//       }
//     }
//     inp.forEach((input) => input.addEventListener("keydown", func))

//     return () => inp.forEach((input) => input.removeEventListener("keydown", func))
//   }
// })
</script>

<style scoped></style>
