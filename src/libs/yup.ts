import * as yup from 'yup';

export const CreateMessageValidator: yup.SchemaOf<CreateMessageValidatorTypes> = yup.object().shape({
  message: yup.string().required().min(4).max(2000),
  targetEmail: yup.string().email().required(),
  targetDate: yup.date().required()
})

export interface CreateMessageValidatorTypes  {
  message: string;
  targetEmail: string;
  targetDate: Date;
}
