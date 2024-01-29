import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../../components/table/AppTable";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";

function AppProduct() {
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
  const [dataID, setDataID] = useState("");
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [flagCancel, setFlagCancel] = useState(false);

  const resetState = () => {
    setDataID("");
    setProductID("");
    setProductName("");
    setPrice(0.0);
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(zu_SelectedList.DataID);
    setProductID(zu_SelectedList.ProductID);
    setProductName(zu_SelectedList.ProductName);
    setPrice(zu_SelectedList.Price);
    setFlagCancel(zu_SelectedList.FlagCancel === "Y" ? true : false);
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const columns = [
    {
      field: "ProductID",
      header: "ProductID",
    },
    {
      field: "ProductName",
      header: "ProductName",
    },
    {
      field: "Price",
      header: "Price",
      align: "right",
      alignHeader: "right",
      body: (rowData) => {
        return rowData.Price.toFixed(2);
      },
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

  const handleBlur = (e) => {
    setProductID(e.target.value);
  };

  const addedit = (
    <div>
      <div>ProductID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          defaultValue={productID}
          //onBlur={handleBlur}
          //onChange={handleBlur}
          onBlur={(e) => {
            setProductID(e.target.value);
          }}
        />
      </div>
      <div>ProductName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>Price</div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-1 items-center">
            <InputNumber
              size={5}
              inputClassName="text-right"
              inputId="minmaxfraction"
              value={price}
              onValueChange={(e) => setPrice(e.value)}
              minFractionDigits={2}
              maxFractionDigits={7}
            />

            <label htmlFor="ingredient1">บาท</label>
          </div>

          <div className="flex gap-1 items-center">
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
        "https://theothai.com/ttw_webreport/API/api/product/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          DataID: productID === "" ? "" : uuidDataID,
          ProductID: productID,
          ProductName: productName,
          Price: price,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(uuidDataID, productID);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    } else {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/product/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify({
          DataID: dataID,
          ProductID: productID,
          ProductName: productName,
          Price: price,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(dataID, productID);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [productID, productName, price, flagCancel]);

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/product/read.php";
    const optionread = {
      method: "GET",
      headers: {
        //"API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("สินค้า");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/product/delete.php";
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
      <AppTable sortField={"ProductName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppProduct;
