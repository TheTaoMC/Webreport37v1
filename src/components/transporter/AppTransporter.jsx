import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";

function AppTransporter() {
  const {
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
  const [data, setData] = useState("");
  const [dataID, setDataID] = useState("");
  const [transporterID, setTransporterID] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [flagCancel, setFlagCancel] = useState(false);

  const resetState = () => {
    setDataID("");
    setTransporterID("");
    setTransporterName("");
    setAddress1("");
    setAddress2("");
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(zu_SelectedList.DataID);
    setTransporterID(zu_SelectedList.TransporterID);
    setTransporterName(zu_SelectedList.TransporterName);
    setAddress1(zu_SelectedList.Address1);
    setAddress2(zu_SelectedList.Address2);
    setFlagCancel(zu_SelectedList.FlagCancel === "Y" ? true : false);
  };

  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const columns = [
    {
      field: "TransporterID",
      header: "TransporterID",
    },
    {
      field: "TransporterName",
      header: "TransporterName",
    },
    {
      field: "Address1",
      header: "Address1",
    },
    {
      field: "Address2",
      header: "Address2",
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
      body: (rowData) => {
        return rowData.FlagCancel === "N" ? "ใช้งาน" : "ยกเลิก";
      },
    },
  ];

  const addedit = (
    <div>
      <div>TransporterID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={transporterID}
          onChange={(e) => {
            setTransporterID(e.target.value);
          }}
        />
      </div>
      <div>TransporterName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={transporterName}
          onChange={(e) => setTransporterName(e.target.value)}
        />
      </div>
      <div>Address1</div>
      <div>
        <InputText
          className="w-[100%]"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
      </div>
      <div>Address2</div>
      <div>
        <InputText
          className="w-[100%]"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>
      <div>
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
        "https://theothai.com/ttw_webreport/API/api/transporter/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          DataID: transporterID === "" ? "" : uuidDataID,
          TransporterID: transporterID,
          TransporterName: transporterName,
          Address1: address1,
          Address2: address2,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(uuidDataID, transporterID);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    } else {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/transporter/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify({
          DataID: dataID,
          TransporterID: transporterID,
          TransporterName: transporterName,
          Address1: address1,
          Address2: address2,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(dataID, transporterID);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [transporterID, transporterName, address1, address2, flagCancel]);

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/transporter/read.php";
    const optionread = {
      method: "GET",
      headers: {
        //"API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ผู้ขนส่ง");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/transporter/delete.php";
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
      <AppTable sortField={"TransporterName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppTransporter;
