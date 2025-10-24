import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

type ToastColor = "success" | "error" | "info" | "warning";

export const useToastStore = defineStore("toast", () => {
  const show: Ref<boolean> = ref(false);
  const message: Ref<string> = ref("");
  const color: Ref<ToastColor> = ref("info");
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function trigger(
    msg: string,
    type: typeof color.value = "info",
    duration = 3000
  ) {
    message.value = msg;
    color.value = type;
    show.value = true;

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      show.value = false;
      timeoutId = null;
    }, duration);
  }

  function close() {
    if (timeoutId) clearTimeout(timeoutId);
    show.value = false;
    timeoutId = null;
  }

  return { show, message, color, trigger, close };
});
