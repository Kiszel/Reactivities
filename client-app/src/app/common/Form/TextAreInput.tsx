import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps } from "semantic-ui-react/dist/commonjs/collections/Form/FormField";
import { Form, Label } from "semantic-ui-react";

interface ITextAreaInput
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

export const TextAreInput: React.FC<ITextAreaInput> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error}  width={width}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
