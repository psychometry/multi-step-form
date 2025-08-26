import { FC, useState } from 'react';
import './TextInput.css';
import { FormConfig } from '../../../../types/index';

interface TextInputProps {
  field: FormConfig;
  value?: string;
  onChange?: (fieldName: string, value: any) => void;
  validated?: boolean;
  onValidate?: (fieldName: string, isValid: boolean) => void;
}

const TextInput: FC<TextInputProps> = ({ field, onChange, value = '', validated = true, onValidate }) => {
  const [touched, setTouched] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(field.name, e.target.value);
  };
  
  const handleBlur = () => {
    setTouched(true);
    if (onValidate && field.required) {
      const isValid = value !== '';
      onValidate(field.name, isValid);
    }
  };
  
  const showError = (touched && field.required && !validated) || (!validated && field.required);
  
  return (
    <div className="text-input-container">
      <div className="text-input-header">
        <label htmlFor={field.name} className="text-input-label">{field.label}</label>
        {showError && (
          <span className="text-input-error">{field.errorMessage || 'This field is required'}</span>
        )}
      </div>
      <input 
        type={field.type} 
        value={value} 
        name={field.name} 
        id={field.id || field.name}
        placeholder={field.placeholder}
        required={field.required}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`text-input-field ${showError ? 'text-input-field-error' : ''}`}
      />
    </div>
  );
};

export default TextInput;