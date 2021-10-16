export const storyRules = [
  (input) => Boolean(input) || 'Text for the comment in required',
  (input) =>
    /^([A-Za-z0-9?><;,{}[\]\-_+=!@#$.%^&*|']|\s|(-|_))+$/.test(input || '') ||
    'only English, number, dash, underscore'
]
