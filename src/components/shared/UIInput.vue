<template>
  <div class="field">
    <label class="label" htmlFor="{id}">
      {{ props.label }}
    </label>
    <div
      :class="`control ${props.iconLeft ? 'has-icons-left' : ''} ${
        props.iconRight ? 'has-icons-right' : ''
      }`"
    >
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <input
        :id="props.id"
        :class="[
          'input',
          {
            'is-danger': props.isDanger && !!input?.value.length,
          },
          props.size ? ` is-${props.size}` : 'is-normal',
        ]"
        :type="props.type ?? 'text'"
        :placeholder="props.placeholder"
        ref="input"
        :readonly="props.readonly"
        :disabled="props.disabled"
        @input="() => emits('imputed', input?.value ?? '')"
      />
      <span v-if="props.iconLeft" class="icon is-small is-left">
        <UIIcon :class="props.isDanger ? 'has-text-danger' : ''" :name="props.iconLeft" />
      </span>
      <span v-if="props.iconRight" class="icon is-small is-right">
        <UIIcon :class="props.isDanger ? 'has-text-danger' : ''" :name="props.iconRight" />
      </span>
    </div>
    <p
      v-if="props.helper && props.helper.isVisible && !!input?.value.length"
      :class="`help ${
        props.helper.design && props.helper.design !== 'normal' ? 'is-' + props.helper.design : ''
      }`"
    >
      {{ props.helper.label }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { InputHTMLAttributes, onMounted, ref } from "vue"
import UIIcon from "./UIIcon.vue"

interface IProps {
  label: string
  id: string
  initialValue?: string
  placeholder?: string
  type?: InputHTMLAttributes["type"]
  iconLeft?: IconProp
  iconRight?: IconProp
  isDanger?: boolean
  helper?: {
    label: string
    design?: "danger" | "success" | "info" | "warning" | "normal"
    isVisible: boolean
  }
  size?: "small" | "normal" | "medium" | "large"
  readonly?: boolean
  disabled?: boolean
}

const props = defineProps<IProps>()
const emits = defineEmits<{ imputed: [value: string] }>()

const input = ref<HTMLInputElement>()

onMounted(() => {
  if (input.value && props.initialValue) {
    input.value.value = props.initialValue ?? ""
    emits("imputed", input?.value.value ?? "")
  }
})
</script>

<style scoped></style>
