import * as Yup from 'yup'
import { LanguageEnum } from '@type/global.types'
import { getMultiLanguageMessage } from '@functions/yupSchema.extends.utils'

export const officeSetupSchema = (lang: LanguageEnum) => {
  const schema = Yup.object({
    officeName: Yup.string().required(
      getMultiLanguageMessage(lang, {
        en: 'Office Name is required',
        ne: 'कार्यालयको नाम आवश्यक छ',
      })
    ),
    email: Yup.string()
      .email(
        getMultiLanguageMessage(lang, {
          en: 'Please enter valid email',
          ne: 'कृपया मान्य इमेल लेख्नुहोस्',
        })
      )
      .required(
        getMultiLanguageMessage(lang, {
          en: 'Email is required',
          ne: 'इमेल आवश्यक छ',
        })
      ),
    phoneNumber: Yup.string().required(
      getMultiLanguageMessage(lang, {
        en: 'Enter Valid Phone Number',
        ne: 'मान्य फोन नम्बर प्रविष्ट गर्नुहोस्',
      })
    ),
    officeCode: Yup.string().required(
      getMultiLanguageMessage(lang, {
        en: 'Office code is required',
        ne: 'कार्यलयको कोड आवश्यक छ',
      })
    ),
    fax: Yup.string().required(
      getMultiLanguageMessage(lang, {
        en: 'Fax is required',
        ne: 'फ्याक्स आवश्यक छ',
      })
    ),
  })

  return schema
}
