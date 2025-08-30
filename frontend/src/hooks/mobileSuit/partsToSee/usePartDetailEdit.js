// hooks/mobileSuit/usePartDetailEdit.js
import { useState } from "react";
import { editParts } from "../../../api/mobileSuitsController";

export function usePartDetailEdit() {
  const [error] = useState(null);

  const editPartInfo = async (msNumber, partType, updatedData) => {
      const result = await editParts(msNumber, partType, updatedData);
	  
      return result;
  };

  return { editPartInfo, error };
}