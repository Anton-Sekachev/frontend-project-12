import * as Yup from 'yup';

export default (channelNames, t) => {
  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .trim()
      .min(3, t('errors.shouldHaveLength'))
      .max(20, t('errors.shouldHaveLength'))
      .notOneOf(channelNames, t('errors.shouldBeUniq'))
      .required(t('errors.required')),
  });

  ChannelNameSchema.ValidationError = Yup.ValidationError;

  return ChannelNameSchema;
};
