import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";

function AppWeighttype() {
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
  //console.log("zu_ToggleEdit: ", zu_ToggleEdit);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [dataID, setDataID] = useState("");
  const [weightTypeID, setWeightTypeID] = useState("");
  const [weightTypeName, setWeightTypeName] = useState("");
  const [flagCancel, setFlagCancel] = useState(false);
  //console.log(data);

  const fetchDataBody = {
    method: "GET",
  };
  const delDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: /* zu_SelectedList.DataID || */ "",
    }),
  };

  const addDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: weightTypeID === "" ? "" : uuidv4(),
      WeightTypeID: weightTypeID,
      WeightTypeName: weightTypeName,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const editDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID,
      WeightTypeID: weightTypeID,
      WeightTypeName: weightTypeName,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const resetState = () => {
    setDataID("");
    setWeightTypeID("");
    setWeightTypeName("");
    setFlagCancel(false);
  };
  //console.log(zu_SelectedList);
  const setState = () => {
    setDataID(zu_SelectedList.DataID);
    setWeightTypeID(zu_SelectedList.WeightTypeID);
    setWeightTypeName(zu_SelectedList.WeightTypeName);
    setFlagCancel(zu_SelectedList.FlagCancel === "Y" ? true : false);
    console.log("setState");
  };

  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const upDatedataID = (selectedlist) => {
    //console.log("selectedlist:upDatedataID: ", selectedlist);
    setData(selectedlist);
  };

  const columns = [
    {
      field: "WeightTypeID",
      header: "WeightTypeID",
    },
    {
      field: "WeightTypeName",
      header: "WeightTypeName",
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
      align: "center",
      alignHeader: "center",
      body: (rowData) => {
        return rowData.FlagCancel === "N" ? "ใช้งาน" : "ยกเลิก";
      },
    },
  ];

  const addedit = (
    <div>
      <div>WeightTypeID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={weightTypeID}
          onChange={(e) => {
            setWeightTypeID(e.target.value);
          }}
        />
      </div>
      <div>WeightTypeName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={weightTypeName}
          onChange={(e) => setWeightTypeName(e.target.value)}
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
        "https://theothai.com/ttw_webreport/API/api/weighttype/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          DataID: weightTypeID === "" ? "" : uuidDataID,
          WeightTypeID: weightTypeID,
          WeightTypeName: weightTypeName,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(uuidDataID, weightTypeID);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    } else {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/weighttype/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify({
          DataID: dataID,
          WeightTypeID: weightTypeID,
          WeightTypeName: weightTypeName,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(dataID, weightTypeID);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      //console.log(urledit, optionedit);
    }
    console.log(weightTypeName, weightTypeID, flagCancel);
  }, [weightTypeName, weightTypeID, flagCancel]);

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/weighttype/read.php";
    const optionread = {
      method: "GET",
    };
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ประเภทชั่ง");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/weighttype/delete.php";
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
      <AppTable sortField={"WeightTypeName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppWeighttype;
