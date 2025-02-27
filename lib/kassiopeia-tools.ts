import {
  AnimationKassiopeiaTool,
  ScreenLockerKassiopeiaTool,
  ToasterKassiopeiaTool,
  Vec2D,
} from "kassiopeia-tools"

export function configureKassiopeiaTools() {
  ;(self as any).locker = ScreenLockerKassiopeiaTool.fast.configureTo({
    background: "#000000",
    opacity: 0.8,
    bars: [
      { width: "35%", color: "hsl(171, 100%, 41%)", height: 2, speed: 1500 },
      { width: "35%", color: "hsl(171, 100%, 41%)", height: 2, speed: 1000 },
    ],
  })
  ;(self as any).anim = AnimationKassiopeiaTool.fast
  ;(self as any).toaster = ToasterKassiopeiaTool.getConfigured({
    ...ToasterKassiopeiaTool.defaultConfiguration(),
    icon: void 0,
    background: {
      danger: {
        color: "#ffb4ab",
        padding: Vec2D.of(1.75, 0.75),
        useVectorWithRem: true,
        opacity: 1,
      },
      info: {
        color: "#004e59",
        padding: Vec2D.of(1.75, 0.75),
        useVectorWithRem: true,
        opacity: 1,
      },
      success: {
        color: "#78dc77",
        padding: Vec2D.of(1.75, 0.75),
        useVectorWithRem: true,
        opacity: 1,
      },
      warn: {
        color: "#dbc90a",
        padding: Vec2D.of(1.75, 0.75),
        useVectorWithRem: true,
        opacity: 1,
      },
    },
    text: {
      danger: {
        color: "#690005",
        font: '"JetBrains Mono", monospace',
        weight: "500",
        size: 14,
      },
      info: {
        color: "#a1efff",
        font: '"JetBrains Mono", monospace',
        weight: "500",
        size: 14,
      },
      warn: {
        color: "#363100",
        font: '"JetBrains Mono", monospace',
        weight: "500",
        size: 14,
      },
      success: {
        color: "#00390a",
        font: '"JetBrains Mono", monospace',
        weight: "500",
        size: 14,
      },
    },
    progressBar: {
      danger: {
        color: "hsl(0, 0%, 100%)",
        height: 4,
        time: 5000,
      },
      info: {
        color: "hsl(0, 0%, 100%)",
        height: 4,
        time: 5000,
      },
      success: {
        color: "hsl(0, 0%, 100%)",
        height: 4,
        time: 5000,
      },
      warn: {
        color: "hsl(0, 0%, 100%)",
        height: 4,
        time: 5000,
      },
    },
    container: {
      position3D: {
        x: 10,
        y: 10,
        z: 99999,
      },
      boundary: { x: "end", y: "top" },
      maxWidth: "70vw",
      outSide: "end",
      useVectorWithPercentage: true,
      cursor: "pointer",
      borderRadius: "4px",
    },
  })
}
