import { FC, useState } from "react";
import "./FormBody.css";
import { FormConfig, DynamicFormData, FormGroup } from "../../../types/index";
import TextInput from "../inputs/TextInput/TextInput";
import RadioInput from "../inputs/RadioInput/RadioInput";
import CheckboxInput from "../inputs/CheckboxInput/CheckboxInput";
import ToggleInput from "../inputs/ToggleInput/ToggleInput";
import SummaryView from "../SummaryView/SummaryView";
import ThankYouView from "../ThankYouView/ThankYouView";

interface FormBodyProps {
  title: string;
  subtitle: string;
  currentIndex: number;
  lastIndex: number;
  formGroups: FormGroup[];
  data: DynamicFormData;
  filterBy?: string;
  onAdvance?: () => void;
  onBack?: () => void;
  onDataChange?: (fieldName: string, value: any) => void;
  validationState?: Record<string, boolean>;
  onValidate?: (fieldName: string, isValid: boolean) => void;
}

const createFormInput = (
  field: FormConfig,
  onChange?: (fieldName: string, value: any) => void,
  value?: string | boolean,
  validated: boolean = true,
  onValidate?: (fieldName: string, isValid: boolean) => void
) => {
  switch (field.type) {
    case "text":
    case "email":
    case "tel":
      return (
        <TextInput
          field={field}
          onChange={onChange}
          value={value as string}
          validated={validated}
          onValidate={onValidate}
        />
      );
    case "radio":
      return (
        <RadioInput
          field={field}
          onChange={onChange}
          value={value as string}
          validated={validated}
          onValidate={onValidate}
        />
      );
    case "toggle":
      return (
        <ToggleInput
          field={field}
          onChange={onChange}
          value={value as boolean}
        />
      );
    case "checkbox":
      return (
        <CheckboxInput
          field={field}
          onChange={onChange}
          value={value as boolean}
        />
      );
    default:
      return null;
  }
};

const FormBody: FC<FormBodyProps> = ({
  title,
  subtitle,
  currentIndex,
  lastIndex,
  formGroups,
  data,
  filterBy,
  onAdvance,
  onBack,
  onDataChange,
  validationState = {},
  onValidate,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextClick = () => {
    onAdvance && onAdvance();
  };

  const handleBackClick = () => {
    onBack && onBack();
  };

  const handleConfirmClick = () => {
    setIsSubmitted(true);
    // Here you could add API calls to submit the form data
  };

  if (isSubmitted) {
    return (
      <div className="form-body">
        <ThankYouView />
      </div>
    );
  }

  return (
    <div className="form-body">
      <div className="form-content">
        <div className="form-body-title">{title}</div>
        <div className="form-body-subtitle">{subtitle}</div>
        {currentIndex === lastIndex ? (
          // Show summary view on the last page
          <SummaryView data={data} filterBy={filterBy} />
        ) : (
          // Show regular form inputs on other pages
          formGroups.map((formGroup, groupIndex) => {
            let filteredFields = formGroup.fields;

            if (filterBy) {
              filteredFields = formGroup.fields.filter((field) => {
                return field.value.includes(filterBy) || field.always;
              });
            }

            return (
              <div
                key={groupIndex}
                className={`form-group ${formGroup.orientation}`}
              >
                {filteredFields.map((field, fieldIndex) => {
                  const fieldValue = data[field.name];
                  const isBoolean =
                    field.type === "checkbox" || field.type === "toggle";

                  return (
                    <div key={fieldIndex} className="form-field">
                      {createFormInput(
                        field,
                        onDataChange,
                        isBoolean ? Boolean(fieldValue) : String(fieldValue),
                        validationState[field.name] !== false,
                        onValidate
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
      <div className="form-actions">
        <div className="form-back-button">
          {currentIndex > 0 && (
            <button onClick={handleBackClick} className="back-button">
              Go Back
            </button>
          )}
        </div>
        <div className="form-next-button">
          {currentIndex === lastIndex ? (
            <button onClick={handleConfirmClick} className="confirm-button">
              Confirm
            </button>
          ) : (
            <button onClick={handleNextClick} className="next-button">
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBody;
