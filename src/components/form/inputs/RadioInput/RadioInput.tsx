import { FC, useState } from 'react';
import './RadioInput.css';
import { FormConfig } from '../../../../types/index';

interface RadioInputProps {
  field: FormConfig;
  value?: string;
  onChange?: (fieldName: string, value: any) => void;
  validated?: boolean;
  onValidate?: (fieldName: string, isValid: boolean) => void;
}

const RadioInput: FC<RadioInputProps> = ({ field, value = '', onChange, validated = true, onValidate }) => {
  const [touched, setTouched] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    onChange && onChange(field.name, e.target.value);
    
    // Validate on change for radio buttons
    if (onValidate && field.required) {
      onValidate(field.name, e.target.value !== '');
    }
  };

  // Show validation error if field is touched or if validation state is explicitly set from parent
  const showError = (touched && field.required && !validated) || (!validated && field.required);
  
  return (
    <div className="radio-input-wrapper">
      {showError && (
        <div className="radio-input-error">{field.errorMessage || 'This field is required'}</div>
      )}
      <div className={`radio-input-container ${showError ? 'radio-input-container-error' : ''}`}>
        <label htmlFor={field.id || field.value} className="radio-input-label">
        {field.icon && <img src={field.icon} alt="" className="radio-input-icon" />}
          <div className="radio-input-content">
            <span className="radio-input-text">{field.label}</span>
            {field.secondaryCaption && <div className="radio-input-caption">{field.secondaryCaption}</div>}
            {field.badge && <div className="radio-input-badge">{field.badge}</div>}
          </div>
          <input
            type={field.type}
            name={field.name}
            value={field.value}
            checked={value === field.value}
            id={field.id || field.value}
            onChange={handleChange}
            className="radio-input-field"
          />
        </label>
      </div>
    </div>
  );
};

export default RadioInput;