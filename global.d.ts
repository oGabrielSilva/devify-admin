/* eslint-disable no-var */
import { ScreenLockerKassiopeiaTool, ToasterKassiopeiaTool } from "kassiopeia-tools"

export {}

declare global {
  interface Array<T> {
    pickRandom(): T | null
  }

  type FontName =
    | "Inter"
    | "Lato"
    | "Roboto"
    | "PT Serif"
    | "JetBrains Mono"
    | "Tinos"
    | "Reddit Mono"
    | "Reddit Sans"
    | "IBM Plex Serif"
    | "IBM Plex Mono"

  const locker: ScreenLockerKassiopeiaTool
  const toaster: ToasterKassiopeiaTool
  const anim: ToasterKassiopeiaTool["animationTool"]

  interface IButton {
    design?: "success" | "danger" | "warning" | "link" | "ghost" | "none" | "primary" | "info"
    label: string
    type?: "button" | "submit" | "reset" | undefined | null
    isOutlined?: boolean
    icon?: IconProp
  }
}
