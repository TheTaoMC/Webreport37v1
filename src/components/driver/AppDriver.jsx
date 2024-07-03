import React, { useEffect, useState } from "react";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../../components/table/AppTable";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";

function AppDriver() {
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
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [cancel, setCancel] = useState(false);

  const resetState = () => {
    setCompanyCode("");
    setCompanyName("");
    setAddress1("");
    setAddress2("");
    setCancel(false);
  };

  const setState = () => {
    //setDataID(zu_SelectedList.DataID);
    setCompanyCode(zu_SelectedList.CompanyCode);
    setCompanyName(zu_SelectedList.CompanyName);
    setAddress1(zu_SelectedList.Address1);
    setAddress2(zu_SelectedList.Address2);
    setCancel(zu_SelectedList.Cancel === 0 ? false : true);
  };

  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const columns = [
    {
      field: "CompanyCode",
      header: "รหัส",
    },
    {
      field: "CompanyName",
      header: "ชื่อ",
    },
    {
      field: "Address1",
      header: "ที่อยู่ 1",
    },
    {
      field: "Address2",
      header: "ที่อยู่ 2",
    },
    {
      field: "Cancel",
      header: "สถานะ",
      body: (rowData) => {
        return rowData.Cancel === 0 ? "ใช้งาน" : "ยกเลิก";
      },
    },
  ];

  const addedit = (
    <div>
      <div>{columns[0].header}</div>
      <div>
        <InputText
          autoFocus
          disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          defaultValue={companyCode}
          onBlur={(e) => {
            setCompanyCode(e.target.value);
          }}
        />
      </div>
      <div>{columns[1].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          defaultValue={companyName}
          onBlur={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>{columns[2].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          defaultValue={address1}
          onBlur={(e) => setAddress1(e.target.value)}
        />
      </div>
      <div>{columns[3].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          defaultValue={address2}
          onBlur={(e) => setAddress2(e.target.value)}
        />
      </div>

      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              onChange={(e) => setCancel(e.checked)}
              checked={cancel}
            ></Checkbox>
            <label htmlFor="ingredient1" className="">
              ยกเลิก
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  //setFromAddEdit //AddData
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "add") {
      console.log("Add...");
      const urladd = "Company/create.php";
      const optionadd = {
        method: "POST",
        headers: {
          "API-KEY": zu_Api_Key,
        },
        body: JSON.stringify({
          CompanyCode: companyCode,
          CompanyName: companyName,
          Address1: address1,
          Address2: address2,
          Cancel: !cancel ? 0 : 1,
        }),
      };
      zuSetDataID(companyCode);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    }
    if (zu_Title_Form_AddEdit === "edit") {
      console.log("Edit...");
      const urledit = "Company/update.php";
      const optionedit = {
        method: "POST",
        headers: {
          "API-KEY": zu_Api_Key,
        },
        body: JSON.stringify({
          CompanyCode: companyCode,
          CompanyName: companyName,
          Address1: address1,
          Address2: address2,
          Cancel: !cancel ? 0 : 1,
        }),
      };
      zuSetDataID(companyCode);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [
    companyCode,
    companyName,
    address1,
    address2,
    cancel,
    zu_Title_Form_AddEdit,
  ]);

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread = "Company/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": zu_Api_Key,
      },
    };
    zuSetFromAddEdit(addedit);
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("บริษัท");
    zuFetch();
  }, []);

  //console.log(zu_SelectedList);
  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel = "Company/delete.php";
    const optiondel = {
      method: "POST",
      headers: {
        "API-KEY": zu_Api_Key,
      },
      body: JSON.stringify({
        CompanyCode: zu_SelectedList.CompanyCode
          ? zu_SelectedList.CompanyCode
          : "",
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [zu_SelectedList]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"CompanyName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppDriver;
