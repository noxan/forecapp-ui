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
