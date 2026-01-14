export const errorFeedback = (message: string, title: string | null = null) => {
  const { $notify } = useNuxtApp() as any
  $notify({
    type: 'error',
    title: title || undefined,
    text: message,
    duration: 600000
  });
}
