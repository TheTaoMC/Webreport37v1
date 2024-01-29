import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../../components/table/AppTable";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";
import { Dropdown } from "primereact/dropdown";

function AppUser() {
  const {
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
    zu_Option_Edit,
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
  const [dataID, setDataID] = useState("");
  const [logInName, setLogInName] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [permission, setPermission] = useState(false);
  const [flagCancel, setFlagCancel] = useState(false);

  //console.log(zu_Option_Edit);
  //console.log(zu_Data);
  const resetState = () => {
    setDataID("");
    setLogInName("");
    setLogInPassword("");
    setFullName("");
    setPermission(false);
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(zu_SelectedList.DataID);
    setLogInName(zu_SelectedList.LogInName);
    setLogInPassword(zu_SelectedList.LogInPassword);
    setFullName(zu_SelectedList.FullName);
    setPermission(zu_SelectedList.Permission === "Y" ? true : false);
    setFlagCancel(zu_SelectedList.FlagCancel === "Y" ? true : false);
  };

  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const columns = [
    {
      field: "LogInName",
      header: "LogInName",
    },
    {
      field: "FullName",
      header: "FullName",
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
      body: (rowData) => {
        return rowData.FlagCancel === "N" ? "ใช้งาน" : "ยกเลิก";
      },
    },
    {
      field: "Permission",
      header: "Permission",
      body: (rowData) => {
        return rowData.Permission === "Y" ? "Admin" : "User";
      },
    },
  ];

  const addedit = (
    <div>
      <div>logInName</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={logInName}
          onChange={(e) => {
            setLogInName(e.target.value);
          }}
        />
      </div>
      <div>logInPassword</div>
      <div>
        <InputText
          className="w-[100%]"
          value={logInPassword}
          onChange={(e) => setLogInPassword(e.target.value)}
        />
      </div>
      <div>fullName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <div className="">
          <div>สถานะผู้ใช้งาน</div>
          <div className="">
            <Dropdown
              className="min-w-[30%]"
              value={permission}
              onChange={(e) => setPermission(e.value)}
              options={[
                { show: "Admin", value: true },
                { show: "User", value: false },
              ].map((data) => ({
                value: data.value,
                label: data.show,
              }))}
              placeholder="Select a Country"
            />
          </div>
        </div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              onChange={(e) => setFlagCancel(e.checked)}
              checked={flagCancel}
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
      /* if (zu_SelectedList.length === 0) { */
      console.log("Add...");
      const uuidDataID = uuidv4();
      const urladd =
        "https://theothai.com/ttw_webreport/API/api/userlogin/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          DataID: logInName === "" ? "" : uuidDataID,
          LogInName: logInName,
          LogInPassword: logInPassword,
          FullName: fullName,
          Permission: permission ? "Y" : "N",
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(uuidDataID, logInName);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    } else {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/userlogin/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify({
          DataID: dataID,
          LogInName: logInName,
          LogInPassword: logInPassword,
          FullName: fullName,
          Permission: permission ? "Y" : "N",
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(dataID, logInName);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      //console.log("???? ", urledit, optionedit);
    }
  }, [logInName, logInPassword, fullName, flagCancel, permission]);

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/userlogin/read.php";
    const optionread = {
      method: "GET",
      headers: {
        //"API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ผู้ใช้งาน");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/userlogin/delete.php";
    const optiondel = {
      method: "POST",
      body: JSON.stringify({
        DataID: zu_SelectedList.DataID ? zu_SelectedList.DataID : "",
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [zu_SelectedList]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"DriverName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppUser;
