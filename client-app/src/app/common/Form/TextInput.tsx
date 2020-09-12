import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps } from "semantic-ui-react/dist/commonjs/collections/Form/FormField";
import { Form, Label } from "semantic-ui-react";

interface ITextInput
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}
const TextInput: React.FC<ITextInput> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput