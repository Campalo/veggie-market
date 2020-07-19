import React, { Children, FunctionComponent, cloneElement } from 'react';
import { TextInput, Button, TextInputProps } from "react-native";
import { useForm, Controller, UseFormMethods } from "react-hook-form";
import { useButton } from './theme/button';
import { useInput } from './theme/input';

//////////
// FORM //
//////////

interface FormProps {
  defaultValues?: any;
  onSubmit: (value: any) => void
}

export const Form: FunctionComponent<FormProps> = ({ defaultValues, children, onSubmit }) => {
  const { control, handleSubmit, errors } = useForm({ defaultValues });
  const submit = handleSubmit(onSubmit);
  const controls = Children.map(children, (child: any, key: number) => {
    if (![Input, Submit].includes(child.type)) {
      throw new Error('Form does not support type ' + child.type.name);
    }

    const defaultValue = child.props?.name && defaultValues && defaultValues[child.props.name];
    switch (child.type) {
      case Input: return cloneElement(child, { ...child.props, control, errors, defaultValue, key });
      case Submit: return cloneElement(child, { ...child.props, submit, key });
    }
  });
  return <>{controls}</>;
};

///////////
// INPUT //
///////////

interface InputProps {
  name: string;
  placeholder: TextInputProps['placeholder']
  type?: TextInputProps['keyboardType']
  control?: UseFormMethods['control'];
  errors?: UseFormMethods['errors'];
  defaultValue?: string;
}

export const Input: FunctionComponent<InputProps> = ({ name, placeholder, type, control, defaultValue }) => {
  const { textInput } = useInput();
  const textInputProps = (params: any): TextInputProps => ({
    ...params,
    onChangeText: params.onChange,
    style: textInput,
    textContentType: type,
    placeholder
  });
  return (
    <>
      <Controller
        control={control}
        render={(params) => <TextInput {...textInputProps(params)} />}
        name={name}
        defaultValue={defaultValue}
      />
    </>
  )
}


////////////
// SUBMIT //
////////////

export const Submit: FunctionComponent<any> = ({ children, submit, ariaLabel }) => {
  const title = typeof children === 'string' ? children : 'Submit';
  return <Button title={title} onPress={submit} accessibilityLabel={ariaLabel} />
}