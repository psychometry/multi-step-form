import { useState, useEffect } from "react";
import "./MultiStepForm.css";
import { FormPage, DynamicFormData } from "../../../types/index";
import FormStep from "../FormStep/FormStep";
import FormBody from "../FormBody/FormBody";

const MultiStepForm = () => {
  const [formData, setFormData] = useState<DynamicFormData>({});
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [formPages, setFormPages] = useState<FormPage[]>([]);
  const [validationState, setValidationState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/PageConfig.json")
      .then((response) => {
        if (!response.ok) {
          throw Error("Network Response was not OK");
        }
        return response.json();
      })
      .then((configData) => {
        const pages: FormPage[] = configData.PageConfigs;
        setFormPages(pages);

        const initialData: DynamicFormData = {};
        pages.forEach((page: FormPage) => {
          if (page.initialData) {
            Object.assign(initialData, page.initialData);
          } else {
            page.formGroups.forEach((group) => {
              group.fields.forEach((field) => {
                if (field.type === "radio") {
                  initialData[field.name] = "";
                }
                if (field.type === "checkbox" || field.type === "toggle") {
                  initialData[field.name] = false;
                }
              });
            });
          }
        });
        setFormData(initialData);
      })
      .catch((error) => {
        console.error("Error loading form configuration:", error);
      });
  }, []);

  const handleAdvance = () => {
    // Validate required fields before advancing
    const currentValidationState = validateCurrentPage();
    setValidationState(currentValidationState);
    
    // Check if all fields are valid
    const allValid = Object.values(currentValidationState).every(isValid => isValid !== false);
    
    if (allValid && currentPageIndex < formPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setValidationState({});
    }
  };
  
  // Handle field-level validation
  const handleFieldValidation = (fieldName: string, isValid: boolean) => {
    setValidationState(prevState => ({
      ...prevState,
      [fieldName]: isValid
    }));
  };

  const handleBack = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleDataChange = (fieldName: string, value: any) => {
    if (formData.hasOwnProperty(fieldName)) {
      let changedData = {[fieldName]: value};
      if (fieldName === "isMonthly") {
        let newPlan= value? (formData.plan as string).replace("yearly", "monthly"): (formData.plan as string).replace("monthly", "yearly");
        changedData = { plan: newPlan, ...changedData };
      }
      setFormData({ ...formData, ...changedData });
    }
  };
  function validateCurrentPage() {
    const newValidationState: Record<string, boolean> = {};

    const fields = formPages[currentPageIndex].formGroups.flatMap(group => group.fields);

    fields.forEach(field => {
      const value = formData[field.name];

      if (field.required) {
        if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
          if (!value || value === '') {
            newValidationState[field.name] = false;
            return;
          }
        } else if (field.type === 'radio' && (!value || value === '')) {
          newValidationState[field.name] = false;
          return;
        }
      }

      if (field.name === 'name' && value) {
        newValidationState[field.name] = validateName(value as string);
      } else if (field.name === 'email' && value) {
        newValidationState[field.name] = validateEmail(value as string);
      } else if (field.name === 'phone' && value) {
        newValidationState[field.name] = validatePhone(value as string);
      }
    });
    
    return newValidationState;
  }
  function validateName(name: string) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  }
  function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  function validatePhone(phone: string) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  } 

  return (
    <div className="form-container">
      {formPages.length > 0 && (
        <>
          <FormStep 
            currentIndex={currentPageIndex} 
            steps={formPages.map((page) => page.step)} 
          />
          <FormBody
            title={formPages[currentPageIndex].heading}
            subtitle={formPages[currentPageIndex].subHeading}
            currentIndex={currentPageIndex}
            lastIndex={formPages.length - 1}
            formGroups={formPages[currentPageIndex].formGroups}
            data={formData}
            filterBy={formData.isMonthly ? "monthly" : "yearly"}
            onAdvance={handleAdvance}
            onBack={handleBack}
            onDataChange={handleDataChange}
            validationState={validationState}
            onValidate={handleFieldValidation}
          />
        </>
      )}
    </div>
  );
};

export default MultiStepForm;