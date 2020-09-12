import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps } from "semantic-ui-react/dist/commonjs/collections/Form/FormField";
import { Form, Label, Select } from "semantic-ui-react";

interface ISelectInput
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}
export const SelectInput: React.FC<ISelectInput> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => {
  console.log(input);
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={input.value}
        onChange={(e, data) => {
          input.onChange(data.value);
        }}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
