import React from "react";

const Label = ({ label }:any) => {
  return (
    <label className="block text-secondary-300 font-medium text-sm leading-none mb-2">
      {label}
    </label>
  );
};

export default Label;
