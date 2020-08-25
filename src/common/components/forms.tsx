import React, { Children, FunctionComponent, cloneElement, ReactText } from 'react';
import { TextInput, TextInputProps, Text, View, Image } from "react-native";
import { useForm, Controller, UseFormMethods } from "react-hook-form";
import { Picker } from '@react-native-community/picker';
import { useInput } from '../theme/input';
import { useTypography } from '../theme/typography';
import * as ImagePicker from 'expo-image-picker';
import { Btn } from './btn';
import { ScrollView } from 'react-native-gesture-handler';
import { useImgPicker } from '../theme/imgPicker';

interface ControlData<T = any> {
  onChange: (data: T) => void;
  onBlur: () => void;
  value: T;
}

//////////
// FORM //
//////////

interface FormProps<T = any> {
  defaultValues?: T;
  onSubmit: (value: T) => void
}

export const Form: FunctionComponent<FormProps> = ({ defaultValues, children, onSubmit }) => {
  const { control, handleSubmit, errors } = useForm({ defaultValues });
  const submit = handleSubmit(onSubmit);

  const controls = Children.map(children, (child: any, key: number) => {
    if (![Input, Select, ImgPicker, Submit, Label].includes(child.type)) {
      throw new Error('Form does not support type ' + child.type.name);
    }

    const defaultValue = child.props?.name && defaultValues && defaultValues[child.props.name];
    switch (child.type) {
      case Input:
      case ImgPicker:
      case Select: return cloneElement(child, { ...child.props, control, errors, defaultValue, key });
      case Submit: return cloneElement(child, { ...child.props, submit, key });
      case Label: return child;
    }
  });
  return <ScrollView>{controls}</ScrollView>;
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
  secureTextEntry?: boolean;
}

export const Input: FunctionComponent<InputProps> = ({ name, placeholder, type, control, defaultValue, secureTextEntry }) => {
  const { textInput } = useInput();
  const input = ({ onChange, onBlur, value }: ControlData<string>) => (
    <TextInput
      style={textInput}
      value={value}
      onBlur={onBlur}
      onChangeText={(v) => onChange(v)}
      keyboardType={type}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );

  return <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={input}
  />
}


////////////
// SELECT //
////////////
interface SelectProps {
  name: string;
  options: string[] | Record<string, string>;
  control?: UseFormMethods['control'];
  errors?: UseFormMethods['errors'];
  defaultValue?: string;
}
export const Select: FunctionComponent<SelectProps> = ({ name, options, control, defaultValue }) => {
  const { textInput } = useInput();

  /** transform options into an array of props for Picker.Item */
  const itemProps = Array.isArray(options)
    ? options.map((option, i) => ({ value: option, label: option, key: i }))
    : Object.entries(options).map(([value, label], i) => ({ value, label, key: i }));

  const items = itemProps.map(props => <Picker.Item {...props} />);

  /** The picker component */
  const picker = ({ onChange, value }: ControlData<ReactText>) => (
    <Picker style={textInput} onValueChange={onChange} selectedValue={value}>
      {items}
    </Picker>
  );

  return <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
    render={picker}
  />
}

////////////
// SUBMIT //
////////////

export const Submit: FunctionComponent<any> = ({ children, submit }) => <Btn onPress={submit}>{children}</Btn>;

///////////
// LABEL //
///////////

export const Label: FunctionComponent<any> = ({ children }) => {
  const { label } = useTypography();
  return <Text style={label}>{children}</Text>
}

////////////////
// IMG PICKER //
////////////////

interface ImgPickerProps {
  name: string;
  defaultValue?: string;
  control?: UseFormMethods['control'];
  errors?: UseFormMethods['errors'];
}

export const ImgPicker: FunctionComponent<ImgPickerProps> = ({ name, control, defaultValue }) => {

  /** Assert that the user have given his permission to use the Camera roll */
  const assertPermission = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Sorry, we need camera roll permissions to make this work!');
    }
  }

  /** Pick the image & trigger onChange on success */
  const pickImg = async (onChange: (uri: string) => void) => {
    try {
      await assertPermission();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      // If success, update the form value
      if (!result.cancelled) {
        onChange(result.uri)
      }
    } catch (err) {
      console.error(err);
    }
  }

  /** The image picker component */
  const imgPicker = ({ onChange, value }: ControlData<string>) => {
    const { productAvatar } = useImgPicker();
    return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={{ uri: value }} style={ productAvatar } />
      <Btn onPress={() => pickImg(onChange)}>Pick an image</Btn>
    </View>
    )
  };

  /** Controller wrapper around the image picker to use it inside a form */
  return <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
    render={imgPicker}
  />
}