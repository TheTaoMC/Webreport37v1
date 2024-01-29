import React from "react";
import { InputText } from "primereact/inputtext";
import { useStore } from "../../../zustand/Store";

function InputTextSelector({ title, value1, field, zu }) {
  const {
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
    zu_Title,
    zu_SearchFilters,
    zu_ToggleSearch,
    zu_ToggleFetchFilter,
    zu_MasterCustomers,
    zu_MasterWeighttypes,
    zu_MasterProducts,
    zu_MasterTransporters,
    zu_MasterDrivers,
    zu_permission,
  } = useStore();
  const {
    zuFetch,
    zuSetFetch,
    zuSetAdd,
    zuResetData,
    zuSetDel,
    zuSetFromAddEdit,
    zuSetDataID,
    zuSetEdit,
    zuSetColumns,
    zuSetTitle,
    zuToggleFetchFilter,
    zuFetchMaster,
    zuSelectedList,
    zuCheckUser,
    zuSetTitleFromAddEdit,
  } = useStore();
  return (
    <>
      <div>{title}</div>
      <div>
        <InputText
          className="w-[100%]"
          value={value1 || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            const updatedZuSelectedList = {
              ...zu,
              field: newValue,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
        />
      </div>
    </>
  );
}

export default InputTextSelector;
