import * as Yup from 'yup'

export const getSignupSchema = t => Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(3, t('errors.shouldHaveLength'))
    .max(20, t('errors.shouldHaveLength'))
    .required(t('errors.required')),
  password: Yup.string()
    .min(6, t('errors.shouldHaveMinLength'))
    .required(t('errors.required')),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], t('errors.passwordsShouldBeEqual'))
    .required(t('errors.required')),
})

export const getMessageSchema = () => Yup.object().shape({
  body: Yup.string().trim().required(''),
})
