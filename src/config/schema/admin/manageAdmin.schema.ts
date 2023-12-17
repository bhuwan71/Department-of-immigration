import { PASSWORD, PHONE_NUMBER } from '@regex/index'
import * as Yup from 'yup'
import { getMultiLanguageMessage } from '@functions/yupSchema.extends.utils'
import { LanguageEnum } from '@type/global.types'

export const baseSchema = (lang: LanguageEnum) => {
  const schema = Yup.object({
    details: Yup.object().shape({
      firstName: Yup.string().required(
        getMultiLanguageMessage(lang, {
          en: 'First name is required',
          ne: 'पहिलो नाम आवश्यक छ ।',
        })
      ),
      lastName: Yup.string().required(
        getMultiLanguageMessage(lang, {
          en: 'Last name is required',
          ne: 'थर आवश्यक छ ।',
        })
      ),

      phoneNumber: Yup.string()
        .matches(PHONE_NUMBER, {
          message: getMultiLanguageMessage(lang, {
            en: 'Enter valid phone number',
            ne: 'मान्य फोन नम्बर प्रविष्ट गर्नुहोस्',
          }),
        })
        .required(
          getMultiLanguageMessage(lang, {
            en: 'Phone number is required',
            ne: 'फोन नम्बर आवश्यक छ',
          })
        ),
    }),

    role: Yup.string().required(
      getMultiLanguageMessage(lang, {
        en: 'Please select role',
        ne: 'कृपया भूमिका चयन गर्नुहोस्',
      })
    ),
    ward: Yup.string().when(['role'], (roles, schema) => {
      if (!roles.includes('SUPER_ADMIN')) {
        return schema.required(
          getMultiLanguageMessage(lang, {
            en: 'Please select a ward',
            ne: 'कृपया वार्ड चयन गर्नुहोस्',
          })
        )
      }
      return schema.optional()
    }),
  })

  return schema
}

export const addAdminSchema = (lang: LanguageEnum) => {
  return baseSchema(lang).shape({
    email: Yup.string()
      .email(
        getMultiLanguageMessage(lang, {
          en: 'Enter valid email address',
          ne: 'मान्य इमेल ठेगाना प्रविष्ट गर्नुहोस्',
        })
      )
      .required(
        getMultiLanguageMessage(lang, {
          en: 'Email is required',
          ne: 'इमेल आवश्यक छ',
        })
      ),
    password: Yup.string()
      .matches(
        PASSWORD,
        getMultiLanguageMessage(lang, {
          en: 'Use 8 or more characters with at least one uppercase letter, numbers & symbols',
          ne: 'एक बडी अक्षर, अंक र चिन्हहरूको साथ 8 वा अधिक अक्षर प्रयोग गर्नुहोस्',
        })
      )
      .required({ en: 'Password is required', ne: 'पासवर्ड आवश्यक छ' }),
  })
}

export const updateAdminSchema = (lang: LanguageEnum) => {
  return baseSchema(lang).shape({})
}
