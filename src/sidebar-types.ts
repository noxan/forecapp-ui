export type currentStep =
  | "Data Selector"
  | "Model Configuration"
  | "Model Validation"
  | "Prediction";

export type navItem = {
  name: string;
  href: string;
  content: any;
};

export type enabledMenuItems = {
  ["Data Selector"]: boolean;
  ["Model Configuration"]: boolean;
  ["Model Validation"]: boolean;
  ["Prediction"]: boolean;
};
