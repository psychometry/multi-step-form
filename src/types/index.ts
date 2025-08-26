export type FormConfig = FormAttr & FormCustomization;

export type DynamicFormData = {
  [key: string]: string | boolean | string[] | number;
};

export interface FormCustomization {
  secondaryCaption?: string;
  badge?: string;
  icon?: string;
  always?: boolean;
  validated?: boolean;
  errorMessage?: string;
}

export interface FormGroup {
  orientation: string;
  fields: FormConfig[];
}

export interface FormAttr {
  name: string;
  type: string;
  id: string;
  value: string;
  label: string;
  checked?: boolean;
  placeholder?: string;
  required: boolean;
}

export type FormPage = {
  step: string;
  heading: string;
  subHeading: string;
  formGroups: FormGroup[];
  initialData?: Partial<DynamicFormData>;
};