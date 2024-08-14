<template>
  <div>
    <UIAppBar />

    <div>
      <main
        class="container p-5 is-flex is-justify-content-center is-flex-direction-column is-align-items-center"
      >
        <h1 className="title mb-0">Faça login para continuar</h1>
        <p class="has-text-centered">
          Área Restrita da Devify: Entre com as credenciais adequadas e acesse o poder
        </p>

        <form @submit.prevent="isPayloadValid() ? signIn() : void 0" class="py-5">
          <div class="pb-2" ref="emailContainerRef">
            <UIInput
              id="email-input"
              :icon-left="'at'"
              label="E-mail"
              type="email"
              placeholder="nicorobin@kassiopeia.dev"
              :helper="{
                design: 'danger',
                isVisible: payload.email.length > 0 && !payloadValidation.email,
                label: 'Você precisa informar um e-mail válido',
              }"
              :is-danger="payload.email.length > 0 && !payloadValidation.email"
              @imputed="(email) => (payload.email = email)"
            />
          </div>

          <div class="pb">
            <div className="pb-2" ref="passwordContainerRef">
              <UIInput
                label="Senha"
                type="password"
                id="password-input"
                icon-left="key"
                placeholder="Mínimo de 8 caracteres"
                @imputed="(password) => (payload.password = password)"
                :helper="{
                  design: 'danger',
                  isVisible: payload.password.length > 0 && !payloadValidation.password,
                  label: 'Mínimo de 8 caracteres, pelo menos uma letra maiúscula e uma minúscula',
                }"
                :is-danger="payload.password.length > 0 && !payloadValidation.password"
              />
            </div>
          </div>

          <div className="is-flex is-justify-content-flex-end">
            <button @click="openModal('m')" className="button is-ghost p-0" type="button">
              Esqueceu a senha?
            </button>
            <UIModal
              id="m"
              title="Recupere sua senha"
              :primary-button="{ label: 'Solicitar recuperação' }"
              :secondary-button="{ label: 'Cancelar' }"
            >
              <div>
                <p>
                  Por favor, digite seu e-mail para que possamos enviar um link de recuperação de
                  senha.
                </p>
                <div className="pt-5" ref="emailForgotContainerRef">
                  <UIInput
                    id="modal-email"
                    label="E-mail"
                    type="email"
                    icon-left="envelope"
                    placeholder="Recupere sua senha"
                    @imputed="
                      (value) => {
                        payload.modalEmail = value
                      }
                    "
                    :helper="{
                      design: 'danger',
                      isVisible: payload.modalEmail.length > 0 && !payloadValidation.modalEmail,
                      label: 'Digite um e-mail válido primeiro',
                    }"
                    :is-danger="payload.modalEmail.length > 0 && !payloadValidation.modalEmail"
                  />
                </div>
              </div>
            </UIModal>
          </div>

          <div className="is-flex gap-3 my-3">
            <button
              @click="isPayloadValid() ? signUp() : void 0"
              className="is-fullwidth button"
              type="button"
            >
              Cadastrar
            </button>
            <button className="is-fullwidth button is-primary" type="submit">Entrar</button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIAppBar from "@app/components/shared/UIAppBar.vue"
import UIInput from "@app/components/shared/UIInput.vue"
import UIModal from "@app/components/shared/UIModal.vue"
import { openModal } from "@lib/modals"
import { ValidationKassiopeiaTool } from "kassiopeia-tools"
import { computed, reactive, ref } from "vue"

const validation = ValidationKassiopeiaTool.fast

const emailContainerRef = ref<HTMLDivElement>()
const emailForgotContainerRef = ref<HTMLDivElement>()
const passwordContainerRef = ref<HTMLDivElement>()

const payload = reactive({ email: "", password: "", modalEmail: "" })
const payloadValidation = computed(() => {
  return {
    email: validation.isEmailValid(payload.email),
    password: validation.isPasswordValid(payload.password),
    modalEmail: validation.isEmailValid(payload.modalEmail),
  }
})

function isPayloadValid() {
  if (!payloadValidation.value.email) {
    toaster.warn("Informe um e-mail válido")
    if (emailContainerRef.value) toaster.animationTool.shakeX(emailContainerRef.value)
    return false
  }
  if (!payloadValidation.value.password) {
    toaster.warn("Digite uma senha válida")
    if (passwordContainerRef.value) toaster.animationTool.shakeX(passwordContainerRef.value)
    return false
  }
  return true
}

function signIn() {
  console.log({ email: payload.email, password: payload.password })
}

function signUp() {}
</script>

<style scoped lang="sass">
main
  min-height: calc( 100vh - 50px )

  form
    max-width: 520px
    width: 90vw
</style>
