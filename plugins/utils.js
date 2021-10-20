function getProperDate(date) {
  const tempDate = new Date(date)
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }
  return Intl.DateTimeFormat('en-US', options).format(tempDate)
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

function isNothing(thing) {
  return thing === null || typeof thing === 'undefined'
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function emoji(score) {
  if (score > 0.1)
    return ['far', 'smile-beam']
  else if (score <= 0.1 && score >= -0.1)
    return ['far', 'meh']
  else
    return ['far', 'angry']
}

export default ({ app }, inject) => {
  inject('getProperDate', getProperDate)
  inject('isEmpty', isEmpty)
  inject('isNothing', isNothing)
  inject('capitalizeFirstLetter', capitalizeFirstLetter)
  inject('emoji', emoji)
}
