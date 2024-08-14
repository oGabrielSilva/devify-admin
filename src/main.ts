import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { createPinia } from "pinia"
import { createApp } from "vue"
import AppStartup from "./AppStartup.vue"

import "@public/sass/master.sass"
import "bulma/css/bulma.min.css"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { configureKassiopeiaTools } from "@lib/kassiopeia-tools"
import { closeAllModals } from "@lib/modals"

Array.prototype.pickRandom = function <T>(): T | null {
  if (this.length === 0) return null
  const item = this[Math.floor(Math.random() * this.length)]
  return item ? item : null
}

$(document).on("keydown", (event) => {
  if (event && event.key && event.key.toLocaleLowerCase() === "escape") {
    closeAllModals()
  }
})

library.add(fas, far, fab)

configureKassiopeiaTools()

const pinia = createPinia()
createApp(AppStartup).use(pinia).component("font-awesome-icon", FontAwesomeIcon).mount("#app")
