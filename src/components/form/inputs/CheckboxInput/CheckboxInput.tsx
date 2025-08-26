import { FC, useState } from 'react';
import './CheckboxInput.css';
import { FormConfig } from '../../../../types/index';

interface CheckboxInputProps {
  field: FormConfig;
  value?: boolean;
  onChange?: (fieldName: string, value: any) => void;
}

const CheckboxInput: FC<CheckboxInputProps> = ({ field, value = false, onChange}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(field.name, e.target.checked);
  }

  return (
    <div className="checkbox-input-wrapper">
      <div className="checkbox-input-container">
        <input 
          type={field.type} 
          name={field.name} 
          value={field.value} 
          checked={value} 
          id={field.id || field.name}
          onChange={handleChange}
          className="checkbox-input-field"
        />
        <div className="checkbox-input-content">
          <label htmlFor={field.id || field.name} className="checkbox-input-label">{field.label}</label>
          {field.secondaryCaption && <div className="checkbox-input-caption">{field.secondaryCaption}</div>}
        </div>
        {field.badge && <div className="checkbox-input-badge">{field.badge}</div>}
      </div>
    </div>
  );
};

export default CheckboxInput;