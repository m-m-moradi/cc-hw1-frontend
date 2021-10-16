export const nameRules = [
  (input) => Boolean(input) || 'Name is required',
  (input) => (input || '').length <= 50 || `A maximum of 100 characters is allowed`,
  (input) =>
    /^([A-Za-z0-9]|\s|(-|_))+$/.test(input || '') ||
    'only English, number, dash, underscore'
]
