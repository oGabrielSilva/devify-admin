import { properties } from "@public/properties"
import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"

type ColorSchema = "SYSTEM" | "DARK" | "LIGHT"
interface IObserver {
  id: string
  cb: (schema: ColorSchema, isDark: boolean, textColor: string) => void
}

const requireFromStorage = () => {
  const st = localStorage.getItem(properties.colors.storageKey) as ColorSchema
  return (["DARK", "LIGHT", "SYSTEM"] as ColorSchema[]).includes(st) ? st : "SYSTEM"
}

const isSchemaDark = (schema: ColorSchema) => {
  return (
    schema === "DARK" ||
    (schema === "SYSTEM" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  )
}

export const useColorSchema = defineStore("ColorSchema", () => {
  const textDarkMode = "#abb1bf"
  const textLightMode = "#404654"
  const observers = ref<IObserver[]>([])

  const schema = ref<ColorSchema>(requireFromStorage())

  const schemaComputed = computed(() => schema.value)
  const isDark = computed(() => isSchemaDark(schema.value))

  const observe = (id: string, observer: IObserver["cb"]) => {
    const index = observers.value.findIndex((ob) => ob.id === id)
    if (index > -1) {
      observers[index].cb = observer
      return id
    }
    observers.value = [...observers.value, { id, cb: observer }]
    return id
  }

  const removeObserver = (id: string) => {
    observers.value = observers.value.filter((ob) => ob.id !== id)
  }

  const update = (newSchema: ColorSchema) => {
    if (newSchema === schema.value) return
    schema.value = newSchema
  }

  watch(schema, (newSchema) => {
    localStorage.setItem(properties.colors.storageKey, newSchema)
    document.documentElement.dataset.theme = newSchema.toLocaleLowerCase()
    observers.value.forEach((ob) => {
      const dark = isSchemaDark(newSchema)
      ob.cb(newSchema, dark, dark ? textDarkMode : textLightMode)
    })
  })

  return {
    textDarkMode,
    textLightMode,
    schema: schemaComputed,
    isDark,
    removeObserver,
    observe,
    update,
  }
})
