import { InputText } from "primereact/inputtext";
import React from "react";
import { useStore } from "../../../zustand/Store";
function Apptextbox({ fromorto, index, filter }) {
  const {
    zuDelData,
    zuEditData,
    zuToggleResetState,
    zuToggleEdit,
    zuSetTitleFromAddEdit,
    zuToggleVisible,
    zuSetSearchFilters,
    zuToggleSearch,
    zuSetTitle,
    zuSetSearchFiltersCheckbox,
    zuSetSearchFiltersTextbox,
  } = useStore();

  const {
    zu_SearchFilters,
    zu_MasterCustomers,
    zu_MasterProducts,
    zu_MasterWeighttypes,
    zu_MasterDrivers,
    zu_MasterTransporters,
  } = useStore();
  const handleText = (index, fromorto, newValue) => {
    //console.log("newValue ", newValue);
    if (fromorto === "From") {
      const updatedFilters = [...zu_SearchFilters];
      updatedFilters[index] = {
        ...updatedFilters[index],
        From: newValue,
      };
      zuSetSearchFiltersTextbox(updatedFilters);
    } else if (fromorto === "To") {
      const updatedFilters = [...zu_SearchFilters];
      updatedFilters[index] = {
        ...updatedFilters[index],
        To: newValue,
      };
      zuSetSearchFiltersTextbox(updatedFilters);
    }
  };
  return (
    <>
      {fromorto === "From" && (
        <InputText
          //disabled={filter ? false : true}
          className="w-[100%]"
          //value={zu_SearchFilters[index].From}
          onChange={(e) => handleText(index, fromorto, e.target.value)}
        />
      )}

      {fromorto === "To" && (
        <InputText
          disabled={filter ? false : true}
          className="w-[100%]"
          value={zu_SearchFilters[index].To}
          onChange={(e) => handleText(index, fromorto, e.target.value)}
        />
      )}
    </>
  );
}

export default Apptextbox;
