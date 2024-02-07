import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
function AppProduct() {
  const {
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
    zu_MasterTrdUnts,
    zu_MasterPackings,
    zu_MasterMoistTHs,
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
    zuFetchMaster,
  } = useStore();
  const navigate = useNavigate();

  const initialData = {
    ProductCode: null,
    ProductName: null,
    Price: null,
    TradingUnit: null,
    PackingCode: null,
    MoistureTableCode: null,
    Cancel: false,
    OldPk: null,
  };

  const [productData, setProductData] = useState(initialData);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value, checked } = event.target;
    console.log(name, value);

    setProductData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  const columns = [
    {
      field: "ProductCode",
      header: "รหัส",
    },
    {
      field: "ProductName",
      header: "ชื่อ",
    },
    {
      field: "Price",
      header: "ราคา",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "TradingUnit",
      header: "หน่วยซื้อขาย",
    },
    {
      field: "PackingCode",
      header: "การบรรจุ",
    },
    {
      field: "MoistureTableCode",
      header: "ตารางความชื้น",
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
    setProductData({
      ...zu_SelectedList,
      Cancel: zu_SelectedList.Cancel === 0 ? false : true,
      OldPk: zu_SelectedList.ProductCode,
    });
  };
  //console.log(productData);
  const resetState = () => {
    setProductData(initialData);
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit, zu_SelectedList]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const addedit = (
    <div>
      <div>รหัส</div>
      <div>
        <InputText
          autoFocus
          //disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="ProductCode"
          defaultValue={productData.ProductCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>ชื่อ</div>
      <div>
        <InputText
          className="w-[100%]"
          name="ProductName"
          defaultValue={productData.ProductName}
          onBlur={handleInputChange}
        />
      </div>
      <div>ราคา</div>
      <div>
        <InputText
          className="max-w-[20%] min-w-[5rem]  text-end"
          name="Price"
          defaultValue={productData.Price}
          onBlur={handleInputChange}
        />
      </div>

      <div>หน่วยซื้อขาย</div>
      <div>
        <Dropdown
          autoFocus
          className="w-[100%]"
          value={productData.TradingUnit}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterTrdUnts.find((e) => e.TradingUnitCode === newValue) ||
              {};

            const updatedZuSelectedList = {
              ...productData,
              //WeightTypeDataID: newValue,
              TradingUnit: newValue2.TradingUnitCode,
              //ProductName: newValue2.ProductName,
            };
            setProductData(updatedZuSelectedList);
          }}
          options={zu_MasterTrdUnts.map((data) => ({
            value: data.TradingUnitCode,
            label: data.TradingUnitCode,
          }))}
          placeholder="เลือกข้อมูล"
          filter
          showClear
        />
      </div>

      <div>การบรรจุ</div>
      <div>
        <Dropdown
          autoFocus
          className="w-[100%]"
          value={productData.PackingCode}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterPackings.find((e) => e.PackingCode === newValue) || {};

            const updatedZuSelectedList = {
              ...productData,
              //WeightTypeDataID: newValue,
              PackingCode: newValue2.PackingCode,
              //ProductName: newValue2.ProductName,
            };
            setProductData(updatedZuSelectedList);
          }}
          options={zu_MasterPackings.map((data) => ({
            value: data.PackingCode,
            label: data.PackingCode + " : " + data.PackingWeight + " กิโลกรัม",
          }))}
          placeholder="เลือกข้อมูล"
          filter
          showClear
        />
      </div>

      <div>ตารางความชื้น</div>
      <div>
        <Dropdown
          autoFocus
          className="w-[100%]"
          value={productData.MoistureTableCode}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterMoistTHs.find((e) => e.TableCode === newValue) || {};

            const updatedZuSelectedList = {
              ...productData,
              //WeightTypeDataID: newValue,
              MoistureTableCode: newValue2.TableCode,
              //ProductName: newValue2.ProductName,
            };
            setProductData(updatedZuSelectedList);
          }}
          options={zu_MasterMoistTHs.map((data) => ({
            value: data.TableCode,
            label: data.TableCode,
          }))}
          placeholder="เลือกข้อมูล"
          filter
          showClear
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={productData.Cancel}
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

  const urlapimain = "Product";
  //Load Data รอบแรก

  const memoizedZuFetchMaster = useMemo(() => {
    return async () => {
      const result = await zuFetchMaster();
      //console.log(result);
      //setBlocked(result === "success" ? false : true);
    };
  }, [zuFetchMaster]); // Dependencies ใน useMemo

  useEffect(() => {
    memoizedZuFetchMaster();
  }, [memoizedZuFetchMaster]);

  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread = urlapimain + "/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFromAddEdit(addedit);
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ความชื้น");
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
          "API-KEY": "857F7237C03246028748D51C97D4BADE",
        },
        body: JSON.stringify(productData),
      };
      zuSetDataID(productData.TradingUnitCode);
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
          "API-KEY": "857F7237C03246028748D51C97D4BADE",
        },
        body: JSON.stringify(productData),
      };
      zuSetDataID(productData.ProductCode);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [productData, zu_Title_Form_AddEdit]);

  //Del
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel = urlapimain + "/delete.php";
    const optiondel = {
      method: "POST",
      headers: {
        "API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
      body: JSON.stringify({
        ProductCode: productData.ProductCode,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [productData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"ProductName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppProduct;
