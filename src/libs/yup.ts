import * as yup from 'yup';

export interface CreateMessageValidatorTypes  {
  message: string;
  targetEmail: string;
  targetDate: Date;
}

export const CreateMessageValidator: yup.SchemaOf<CreateMessageValidatorTypes> = yup.object().shape({
  message: yup.string().required().min(4).max(256),
  targetEmail: yup.string().email().required(),
  targetDate: yup.date().required().min(new Date())
})
