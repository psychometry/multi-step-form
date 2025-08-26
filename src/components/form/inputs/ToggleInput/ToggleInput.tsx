import { FC, useState } from 'react';
import './ToggleInput.css';
import { FormConfig } from '../../../../types/index';

interface ToggleInputProps {
  field: FormConfig;
  value?: boolean;
  onChange?: (fieldName: string, value: any) => void;
}

const ToggleInput: FC<ToggleInputProps> = ({ field, value = false, onChange }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(field.name, e.target.checked);
    };
  return (
    <div className="toggle-input-wrapper">
      <div className="toggle-input-container">
        <label htmlFor={field.id || field.name} className={value?"toggle-input-label__checked":"toggle-input-label"}>{field.label}</label>
        <input 
          type="checkbox" 
          name={field.name} 
          value={field.value} 
          checked={value} 
          id={field.id || field.name}
          onChange={handleChange}
          className="toggle-input-field"
        />
        {field.secondaryCaption && <span className={value?"toggle-input-label":"toggle-input-label__checked"}>{field.secondaryCaption}</span>}
      </div>
    </div>
  );
};

export default ToggleInput;