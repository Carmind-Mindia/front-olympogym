/// <reference types="vite/client" />
import 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $ask: (text?: string) => Promise<boolean>
  }
}
