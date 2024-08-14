<template>
  <span class="icon is-small">
    <font-awesome-icon
      :icon="props.name"
      :aria-hidden="typeof props.ariaHidden !== 'boolean' || props.ariaHidden == true"
    />
  </span>
</template>

<script setup lang="ts">
import { IconProp } from "@fortawesome/fontawesome-svg-core"

interface IProps {
  name: IconProp
  ariaHidden?: boolean
}

const props = defineProps<IProps>()
</script>

<style scoped></style>
