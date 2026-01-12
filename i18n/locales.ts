export type AppLocale = 'en-GB' | 'es-ES' | 'ca-ES' | 'eu-ES' | 'gl-ES'

export const appLocales: AppLocale[] = ['en-GB', 'es-ES', 'ca-ES', 'eu-ES', 'gl-ES']

// Mapeo de AppLocale a nombre del idioma
export const localeNameMap: Record<AppLocale, string> = {
  'es-ES': 'Español',
  'en-GB': 'English',
  'ca-ES': 'Català',
  'eu-ES': 'Euskera',
  'gl-ES': 'Galego'
}

