export const successFeedback = (message: string, title: string | null = null) => {
  const { $notify } = useNuxtApp() as any
  $notify({
    type: 'success',
    title: title || undefined,
    text: message
  });
}
