export const required = value => (value ? undefined : 'Requis')

// export const minLength = min => value => value && value.length < min ? `Doit faire ${min} caractères ou plus` : undefined
// export const maxLength = max => value => value && value.length > max ? `Doit faire ${max} caractères ou moins` : undefined
export const minLength = min => value => value && value.length < min ? `Doit faire ${min} caractères ou plus` : undefined
export const maxLength = max => value => value && value.length > max ? `Doit faire ${max} caractères ou moins` : undefined

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Adresse email invalide' : undefined
export const noSpace = value => value && (/\s/.test(value)) ? 'Espace interdit' : undefined

export const mustBeNumber = value => (isNaN(value) ? 'Doit être un chiffre' : undefined)
export const minValue = min => value => isNaN(value) || value >= min ? undefined : `Doit être plus grand que ${min}`
export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)