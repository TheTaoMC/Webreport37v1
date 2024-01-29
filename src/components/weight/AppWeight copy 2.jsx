import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import isEqual from "lodash/isEqual";
import { BlockUI } from "primereact/blockui";
import { useStore } from "../../zustand/Store";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

function AppWeight() {
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
  const navigate = useNavigate();
  //const [dataID, setDataID] = useState("");
  /*   const [driverID, setDriverID] = useState(""); */
  /*   const [driverName, setDriverName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState(""); */

  /*   const [xx, setXx] = useState([]);
  const [carRegister, setCarRegister] = useState("");
  const [weightType, setWeightType] = useState("");
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [driver, setDriver] = useState("");
  const [transporter, setTransporter] = useState("");
  const [remark1, setRemark1] = useState("");
  const [remark2, setRemark2] = useState("");
  const [remark3, setRemark3] = useState("");
  const [flagCancel, setFlagCancel] = useState(false); */
  //console.log("zu_MasterWeighttypes ", zu_MasterWeighttypes);
  //console.log(zu_permission);

  const option = {
    method: "POST",
    body: JSON.stringify({
      WeightScaleIDInFilter: zu_SearchFilters[0].Filter,
      WeightScaleIDInFrom: zu_SearchFilters[0].From,
      WeightScaleIDInTo: zu_SearchFilters[0].To,
      WeightScaleIDOutFilter: zu_SearchFilters[1].Filter,
      WeightScaleIDOutFrom: zu_SearchFilters[1].From,
      WeightScaleIDOutTo: zu_SearchFilters[1].To,
      WeightDateInFilter: zu_SearchFilters[2].Filter,
      WeightDateInFrom: zu_SearchFilters[2].From,
      WeightDateInTo: zu_SearchFilters[2].To,
      WeightDateOutFilter: zu_SearchFilters[3].Filter,
      WeightDateOutFrom: zu_SearchFilters[3].From,
      WeightDateOutTo: zu_SearchFilters[3].To,
      SequenceWeightInFilter: zu_SearchFilters[4].Filter,
      SequenceWeightInFrom: zu_SearchFilters[4].From,
      SequenceWeightInTo: zu_SearchFilters[4].To,
      SequenceWeightOutFilter: zu_SearchFilters[5].Filter,
      SequenceWeightOutFrom: zu_SearchFilters[5].From,
      SequenceWeightOutTo: zu_SearchFilters[5].To,
      CarRegisterFilter: zu_SearchFilters[6].Filter,
      CarRegisterFrom: zu_SearchFilters[6].From,
      CarRegisterTo: zu_SearchFilters[6].To,
      WeightTypeIDFilter: zu_SearchFilters[7].Filter,
      WeightTypeIDFrom: zu_SearchFilters[7].From,
      WeightTypeIDTo: zu_SearchFilters[7].To,
      CustomerIDFilter: zu_SearchFilters[8].Filter,
      CustomerIDFrom: zu_SearchFilters[8].From,
      CustomerIDTo: zu_SearchFilters[8].To,
      ProductIDFilter: zu_SearchFilters[9].Filter,
      ProductIDFrom: zu_SearchFilters[9].From,
      ProductIDTo: zu_SearchFilters[9].To,
      TransporterIDFilter: zu_SearchFilters[10].Filter,
      TransporterIDFrom: zu_SearchFilters[10].From,
      TransporterIDTo: zu_SearchFilters[10].To,
      DriverIDFilter: zu_SearchFilters[11].Filter,
      DriverIDFrom: zu_SearchFilters[11].From,
      DriverIDTo: zu_SearchFilters[11].To,
      //FlagCancelFilter: zu_SearchFilters[12].Filter ? "Y" : "N",
      //FlagStatusFilter: bodySearch[13].Filter ? "Y" : "N",
    }),
  };
  //console.log("zu_SelectedList ", zu_SelectedList);
  const addedit = (
    <div>
      <div>ทะเบียนรถ</div>
      <div>
        <InputText
          //autoFocus
          disabled={true}
          className="w-[100%]"
          value={zu_SelectedList.CarRegister || ""}
        />
      </div>
      <div>ประเภทชั่ง</div>
      <div>
        <Dropdown
          autoFocus
          //disabled={filter ? false : true}
          className="w-[100%]"
          value={zu_SelectedList.WeightTypeDataID}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterWeighttypes.find((e) => e.DataID === newValue) || {};

            const updatedZuSelectedList = {
              ...zu_SelectedList,
              WeightTypeDataID: newValue,
              WeightTypeID: newValue2.WeightTypeID,
              WeightTypeName: newValue2.WeightTypeName,
            };
            //console.log("e.target.value2 ", newValue2);
            //console.log("updatedZuSelectedList ", updatedZuSelectedList);
            zuSelectedList(updatedZuSelectedList);
          }}
          //onChange={(e) => setWeightType(e?.DataID || "")}
          options={zu_MasterWeighttypes.map((data) => ({
            //value0: data.DataID,
            value: data.DataID,
            label: data.WeightTypeID + " : " + data.WeightTypeName,
          }))}
          placeholder="Select a Country"
          filter
          showClear
        />
      </div>
      <div>คู่ค้า</div>
      <div>
        <Dropdown
          //disabled={filter ? false : true}
          className="w-[100%]"
          value={zu_SelectedList.CustomerDataID}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterCustomers.find((e) => e.DataID === newValue) || {};

            const updatedZuSelectedList = {
              ...zu_SelectedList,
              CustomerDataID: newValue,
              CustomerID: newValue2.CustomerID,
              CustomerName: newValue2.CustomerName,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
          options={zu_MasterCustomers.map((data) => ({
            value: data.DataID,
            label: data.CustomerID + " : " + data.CustomerName,
          }))}
          placeholder="Select a Country"
          filter
          showClear
        />
      </div>
      <div>สินค้า</div>
      <div>
        <Dropdown
          //disabled={filter ? false : true}
          className="w-[100%]"
          value={zu_SelectedList.ProductDataID}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterProducts.find((e) => e.DataID === newValue) || {};

            const updatedZuSelectedList = {
              ...zu_SelectedList,
              ProductDataID: newValue,
              ProductID: newValue2.ProductID,
              ProductName: newValue2.ProductName,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
          options={zu_MasterProducts.map((data) => ({
            value: data.DataID,
            label: data.ProductID + " : " + data.ProductName,
          }))}
          placeholder="Select a Country"
          filter
          showClear
        />
      </div>
      <div>ผู้ขนส่ง</div>
      <div>
        <Dropdown
          //disabled={filter ? false : true}
          className="w-[100%]"
          value={zu_SelectedList.TransporterDataID}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterTransporters.find((e) => e.DataID === newValue) || {};

            const updatedZuSelectedList = {
              ...zu_SelectedList,
              TransporterDataID: newValue,
              TransporterID: newValue2.TransporterID,
              TransporterName: newValue2.TransporterName,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
          options={zu_MasterTransporters.map((data) => ({
            value: data.DataID,
            label: data.TransporterID + " : " + data.TransporterName,
          }))}
          placeholder="Select a Country"
          filter
          showClear
        />
      </div>
      <div>พนักงานขับรถ</div>
      <div>
        <Dropdown
          //disabled={filter ? false : true}
          className="w-[100%]"
          value={zu_SelectedList.DriverDataID}
          onChange={(e) => {
            const newValue = e.target.value;
            const newValue2 =
              zu_MasterDrivers.find((e) => e.DataID === newValue) || {};

            const updatedZuSelectedList = {
              ...zu_SelectedList,
              DriverDataID: newValue,
              DriverID: newValue2.DriverID,
              DriverName: newValue2.DriverName,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
          options={zu_MasterDrivers.map((data) => ({
            value: data.DataID,
            label: data.DriverID + " : " + data.DriverName,
          }))}
          placeholder="Select a Country"
          filter
          showClear
        />
      </div>
      <div>หมายเหตุ 1</div>
      <div>
        <InputText
          className="w-[100%]"
          value={zu_SelectedList.Remark1 || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            const updatedZuSelectedList = {
              ...zu_SelectedList,
              Remark1: newValue,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
        />
      </div>
      <div>หมายเหตุ 2</div>
      <div>
        <InputText
          className="w-[100%]"
          value={zu_SelectedList.Remark2 || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            const updatedZuSelectedList = {
              ...zu_SelectedList,
              Remark2: newValue,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
        />
      </div>
      <div>หมายเหตุ 3</div>
      <div>
        <InputText
          className="w-[100%]"
          value={zu_SelectedList.Remark3 || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            const updatedZuSelectedList = {
              ...zu_SelectedList,
              Remark3: newValue,
            };
            zuSelectedList(updatedZuSelectedList);
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-[100%] table-auto mt-2">
          <thead className="border border-gray-950">
            <tr className="bg-sky-300">
              <th className="w-219 p-2">รายการ</th>
              <th className="min-w-[120px] p-2">เลขที่</th>
              <th className="min-w-[120px] p-2">วันที่</th>
              <th className="min-w-[120px] p-2">เวลา</th>
              <th className="min-w-[120px]  p-2">{"น้ำหนัก(กก.)"}</th>
              <th className="min-w-[120px] p-2">ผู้ชั่ง</th>
              <th className="min-w-[120px] p-2">เครื่องชั่ง</th>
              <th className="w-24 p-2">Auto</th>
              <th className="w-24 p-2">Sens</th>
            </tr>
          </thead>
          <tbody className="border border-gray-950">
            <tr>
              <td className="bg-green-500 font-semibold border border-gray-950 p-2 text-center">
                เข้า
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {zu_SelectedList.SequenceWeightIn}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {moment(zu_SelectedList.WeightDateIn).format("DD-MM-YYYY")}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {moment(zu_SelectedList.WeightTimeIn).format("HH:mm:ss")}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-right">
                {zu_SelectedList.WeightIn || "0"}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {zu_SelectedList.UserLogInDataIDIn}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {zu_SelectedList.WeightScaleIDIn}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                Y
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                YYY
              </td>
            </tr>
            <tr>
              <td className="bg-green-500 font-semibold border border-gray-950 p-2 text-center">
                ออก
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {zu_SelectedList.SequenceWeightOut}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {moment(zu_SelectedList.WeightDateOut).format("DD-MM-YYYY")}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {moment(zu_SelectedList.WeightTimeOut).format("HH:mm:ss")}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-right">
                {zu_SelectedList.WeightOut || "0"}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {zu_SelectedList.UserLogInDataIDOut}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                {zu_SelectedList.WeightScaleIDOut}
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                Y
              </td>
              <td className="text-red-500 font-semibold border border-gray-950 p-2 text-center">
                YYY
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-red-500 font-bold border border-gray-950 text-right p-2">
                {zu_SelectedList.WeightNet}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              onChange={(e) => {
                const newValue = e.checked;
                const updatedZuSelectedList = {
                  ...zu_SelectedList,
                  FlagCancel: newValue === true ? "Y" : "N",
                };
                console.log(newValue);
                zuSelectedList(updatedZuSelectedList);
              }}
              checked={zu_SelectedList.FlagCancel === "N" ? false : true}
            ></Checkbox>
            <label htmlFor="ingredient1" className="">
              ยกเลิก
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      field: "DataID",
      header: "DataID",
    },
    {
      field: "WeightScaleIDIn",
      header: "WeightScaleIDIn",
    },
    {
      field: "WeightScaleIDOut",
      header: "WeightScaleIDOut",
    },
    {
      field: "SequenceWeightIn",
      header: "SequenceWeightIn",
    },
    {
      field: "SequenceWeightOut",
      header: "SequenceWeightOut",
    },
    {
      field: "WeightDateIn",
      header: "WeightDateIn",
      body: (rowData) => {
        return moment(rowData.WeightDateOut).format("DD/MM/YYYY");
      },
    },
    {
      field: "WeightDateOut",
      header: "WeightDateOut",
      body: (rowData) => {
        return moment(rowData.WeightDateOut).format("DD/MM/YYYY");
      },
    },
    {
      field: "CarRegister",
      header: "CarRegister",
    },
    {
      field: "WeightTypeID",
      header: "WeightTypeID",
    },
    {
      field: "WeightTypeName",
      header: "WeightTypeName",
    },
    {
      field: "CustomerID",
      header: "CustomerID",
    },
    {
      field: "CustomerName",
      header: "CustomerName",
    },
    {
      field: "ProductID",
      header: "ProductID",
    },
    {
      field: "ProductName",
      header: "ProductName",
    },
    {
      field: "TransporterID",
      header: "TransporterID",
    },
    {
      field: "TransporterName",
      header: "TransporterName",
    },
    {
      field: "DriverID",
      header: "DriverID",
    },
    {
      field: "DriverName",
      header: "DriverName",
    },
    {
      field: "Remark1",
      header: "Remark1",
    },
    {
      field: "Remark2",
      header: "Remark2",
    },
    {
      field: "Remark3",
      header: "Remark3",
    },
    {
      field: "Remark4",
      header: "Remark4",
    },
    {
      field: "WeightIn",
      header: "WeightIn",
    },
    {
      field: "WeightOut",
      header: "WeightOut",
    },
    {
      field: "Weight",
      header: "Weight",
    },
    {
      field: "WeightNet",
      header: "WeightNet",
    },
  ];

  //console.log("zu_SelectedList ", zu_SelectedList);

  /*   const setState = () => {
    setXx(zu_SelectedList);
    setDataID(zu_SelectedList.DataID);
    setCarRegister(zu_SelectedList.CarRegister);
    setWeightType(zu_SelectedList.WeightTypeDataID);
    setProduct(zu_SelectedList.ProductDataID);
    setTransporter(zu_SelectedList.TransporterDataID);
    setDriver(zu_SelectedList.DriverDataID);
    setRemark1(zu_SelectedList.Remark1);
    setRemark2(zu_SelectedList.Remark2);
    setRemark3(zu_SelectedList.Remark3);
  }; */
  //setState
  //useEffect(() => setState(), [zu_ToggleEdit]);

  //console.log("zu_Title_Form_AddEdit ", zu_Title_Form_AddEdit);
  //setFromAddEdit //AddData
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "add") {
      /* if (zu_SelectedList.length === 0) { */
      console.log("Add...");
      const uuidDataID = uuidv4();
      const urladd =
        "https://theothai.com/ttw_webreport/API/api/weightreport/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          /*           DataID: driverID === "" ? "" : uuidDataID,
          DriverID: driverID,
          DriverName: driverName,
          Address1: address1,
          Address2: address2,
          FlagCancel: flagCancel ? "Y" : "N", */
        }),
      };
      //zuSetDataID(uuidDataID, driverID);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    }

    if (zu_Title_Form_AddEdit === "edit") {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/weight/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify(zu_SelectedList),
      };
      //const optionedit = option;
      zuSetDataID(zu_SelectedList.DataID, "");
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
    zuSetFromAddEdit(addedit);
  }, [zu_SelectedList]);

  //Load Data 2
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "search") {
      //zuResetData();
      const urlread =
        "https://theothai.com/ttw_webreport/API/api/weightreport/read.php";
      const optionread = option;
      zuSetFetch(urlread, optionread);
      zuFetch();
      console.log("Load Data 2");
    }
  }, [zu_ToggleSearch]);

  //Load Data รอบแรก
  const memoizedZuFetchMaster = useMemo(() => {
    return async () => {
      const result = await zuFetchMaster();
      //console.log(result);
      setBlocked(result === "success" ? false : true);
    };
  }, [zuFetchMaster]); // Dependencies ใน useMemo

  useEffect(() => {
    memoizedZuFetchMaster();
  }, [memoizedZuFetchMaster]);

  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuSetTitleFromAddEdit("weight");
    console.log("zu_Title_Form_AddEdit ", zu_Title_Form_AddEdit, zu_Title);
    if (zu_Title_Form_AddEdit === "weight" || zu_Title_Form_AddEdit === null) {
      zuResetData();
      const urlread =
        "https://theothai.com/ttw_webreport/API/api/weightreport/read.php";
      const optionread = option;
      zuSetFetch(urlread, optionread);
      zuSetColumns(columns);
      zuSetTitle("ข้อมูลชั่งน้ำหนัก");
      zuFetch();
    }
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/weight/delete.php";
    const optiondel = {
      method: "POST",
      body: JSON.stringify({
        DataID: zu_SelectedList.DataID ? zu_SelectedList.DataID : "",
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [zu_SelectedList]);

  const [blocked, setBlocked] = useState(true);
  useEffect(() => {
    if (!blocked) {
      setTimeout(() => {
        setBlocked(false);
      }, 3000);
    }
  }, [blocked]);

  const statusTemplate = (e) => {
    return e.Permission === "Y" ? "Admin" : "User";
  };

  return (
    <div>
      <BlockUI blocked={blocked} fullScreen />
      <AppNavber />
      <AppTable statusTemplate={statusTemplate} minWidth={"50rem"} />
    </div>
  );
}

export default AppWeight;
