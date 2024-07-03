import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
function AppCustomer() {
  const {
    zu_Api_Key,
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
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
    zuCheckUser,
  } = useStore();
  const navigate = useNavigate();

  const initialData = {
    CustomerCode: null,
    CustomerName: null,
    Address1: null,
    Address2: null,
    Cancel: false,
    OldPk: null,
  };

  const [customerData, setCustomerData] = useState(initialData);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value, checked } = event.target;
    console.log(name, value);

    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  const columns = [
    {
      field: "CustomerCode",
      header: "รหัส",
      footer: (rowData) => {
        return "จำนวน ";
      },
    },
    {
      field: "CustomerName",
      header: "ชื่อ",
      footer: (rowData) => {
        return rowData.props.value.length.toLocaleString() + " รายการ";
      },
    },
    {
      field: "Address1",
      header: "ที่อยู่1",
    },
    {
      field: "Address2",
      header: "ที่อยู่2",
    },
    {
      field: "Cancel",
      header: "สถานะ",
      body: (rowData) => {
        return rowData.Cancel === 0 ? "ใช้งาน" : "ยกเลิก";
      },
    },
  ];
  const setState = () => {
    setCustomerData({
      ...zu_SelectedList,
      Cancel: zu_SelectedList.Cancel === 0 ? false : true,
      OldPk: zu_SelectedList.CustomerCode,
    });
  };

  const resetState = () => {
    setCustomerData(initialData);
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit, zu_SelectedList]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const addedit = (
    <div>
      <div>{columns[0].header}</div>
      <div>
        <InputText
          autoFocus
          //disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="CustomerCode"
          defaultValue={customerData.CustomerCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[1].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="CustomerName"
          defaultValue={customerData.CustomerName}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[2].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="Address1"
          defaultValue={customerData.Address1}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[3].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="Address2"
          defaultValue={customerData.Address2}
          onBlur={handleInputChange}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={customerData.Cancel}
              onChange={handleInputChange}
            />
            <label htmlFor="ingredient1" className="">
              ยกเลิก
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const urlapimain = "Customer";
  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread = urlapimain + "/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": zu_Api_Key,
      },
    };
    zuSetFromAddEdit(addedit);
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("คู่ค้า");
    zuFetch();
  }, []);

  //Add or Edit
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "add") {
      console.log("Add...");
      const urladd = urlapimain + "/create.php";
      const optionadd = {
        method: "POST",
        headers: {
          "API-KEY": zu_Api_Key,
        },
        body: JSON.stringify(customerData),
      };
      zuSetDataID(customerData.CustomerCode);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    }
    if (zu_Title_Form_AddEdit === "edit") {
      console.log("Edit...");
      const urledit = urlapimain + "/update.php";
      const optionedit = {
        method: "POST",
        headers: {
          "API-KEY": zu_Api_Key,
        },
        body: JSON.stringify(customerData),
      };
      //zuSetDataID(columnsData.ProductCode);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [customerData, zu_Title_Form_AddEdit]);

  //Del
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel = urlapimain + "/delete.php";
    const optiondel = {
      method: "POST",
      headers: {
        "API-KEY": zu_Api_Key,
      },
      body: JSON.stringify({
        CustomerCode: customerData.CustomerCode,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [customerData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"CustomerName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppCustomer;
