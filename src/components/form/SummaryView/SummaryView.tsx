import { FC } from "react";
import "./SummaryView.css";
import { DynamicFormData } from "../../../types/index";

interface SummaryViewProps {
  data: DynamicFormData;
  filterBy?: string;
}

const SummaryView: FC<SummaryViewProps> = ({ data, filterBy }) => {
  const isMonthly = filterBy === "monthly";
  const planName = ((data.plan as string) || "").split("_")[0];
  const planPeriod = isMonthly ? "Monthly" : "Yearly";
  
  // Calculate plan cost based on selection
  const getPlanCost = () => {
    const planCosts: Record<string, number> = {
      Arcade_monthly: 9,
      Advanced_monthly: 12,
      Pro_monthly: 15,
      Arcade_yearly: 90,
      Advanced_yearly: 120,
      Pro_yearly: 150
    };
    
    return planCosts[data.plan as string] || 0;
  };
  
  // Calculate addon costs
  const getAddonCost = (addonName: string) => {
    const addonCosts: Record<string, number> = {
      online_service_monthly: 1,
      larger_storage_monthly: 2,
      customizable_profile_monthly: 2,
      online_service_yearly: 10,
      larger_storage_yearly: 20,
      customizable_profile_yearly: 20
    };
    
    const period = isMonthly ? "monthly" : "yearly";
    const key = `${addonName}_${period}`;
    return addonCosts[key] || 0;
  };
  
  // Get addon display name
  const getAddonDisplayName = (addonName: string) => {
    const displayNames: Record<string, string> = {
      online_service: "Online Service",
      larger_storage: "Larger Storage",
      customizable_profile: "Customizable Profile"
    };
    
    return displayNames[addonName] || addonName;
  };

  const calculateTotal = () => {
    let total = getPlanCost();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "plan" && key !== "isMonthly" && key !== "name" && key !== "email" && key !== "phone" && value === true) {
        total += getAddonCost(key);
      }
    });
    
    return total;
  };
  
  // Get selected addons
  const getSelectedAddons = () => {
    return Object.entries(data)
      .filter(([key, value]) => {
        return key !== "plan" && key !== "isMonthly" && key !== "name" && key !== "email" && key !== "phone" && value === true;
      })
      .map(([key]) => key);
  };
  
  const selectedAddons = getSelectedAddons();
  const totalCost = calculateTotal();
  
  return (
    <div className="summary-container">
      <div className="summary-plan">
        <div className="summary-plan-info">
          <div className="summary-plan-name">{planName} ({planPeriod})</div>
          <button className="summary-change-link">Change</button>
        </div>
        <div className="summary-plan-price">
          ${getPlanCost()}/{isMonthly ? "mo" : "yr"}
        </div>
      </div>
      
      {selectedAddons.length > 0 && (
        <div className="summary-addons">
          {selectedAddons.map((addon) => (
            <div key={addon} className="summary-addon-item">
              <div className="summary-addon-name">{getAddonDisplayName(addon)}</div>
              <div className="summary-addon-price">+${getAddonCost(addon)}/{isMonthly ? "mo" : "yr"}</div>
            </div>
          ))}
        </div>
      )}
      
      <div className="summary-total">
        <div className="summary-total-label">Total (per {isMonthly ? "month" : "year"})</div>
        <div className="summary-total-price">+${totalCost}/{isMonthly ? "mo" : "yr"}</div>
      </div>
    </div>
  );
};

export default SummaryView;