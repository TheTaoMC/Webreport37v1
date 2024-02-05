import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function AppTransctn() {
  const {
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
    zu_SearchFilters,
    zu_ToggleSearch,
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
    TransactionKey: null,
    TicketCode: null,
    TransactionTypeCode: null,
    VahicleCode: null,
    CompanyCode: null,
    CustomerCode: null,
    ProductCode: null,
    InboundDate: null,
    InboundTime: null,
    InboundWeight: null,
    OutboundDate: null,
    OutboundTime: null,
    OutboundWeight: null,
    Moisture: null,
    MoistureTableCode: null,
    MoistureDeduct: null,
    Price: null,
    TradingUnit: null,
    KgPerTradingUnit: null,
    Quantity: null,
    PackingCode: null,
    SagWeight: null,
    DeductWeight: null,
    VariedDeductWeight1: null,
    VariedDeductWeight2: null,
    FixedDeductAmount1: null,
    VariedDeductAmount1: null,
    FixedDeductAmount2: null,
    VariedDeductAmount2: null,
    Remark1: null,
    Remark2: null,
    Remark3: null,
    Remark4: null,
    InboundUsername: null,
    OutboundUsername: null,
    Cancel: false,
  };

  //แก้
  const [transctnData, setTransctnData] = useState(initialData);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value, checked } = event.target;
    console.log(name, value);

    setTransctnData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  //แก้
  const columns = [
    {
      field: "TicketCode",
      header: "เลขที่ตั๋ว",
      minWidth: "10rem",
    },
    {
      field: "InboundDate",
      header: "วันที่ชั่งเข้า",
      minWidth: "10rem",
      body: (rowData) => {
        return moment(rowData.InboundDate).format("DD/MM/YYYY");
      },
    },
    {
      field: "OutboundDate",
      header: "วันที่ชั่งออก",
      minWidth: "10rem",
      body: (rowData) => {
        return moment(rowData.InboundDate).format("DD/MM/YYYY");
      },
    },
    {
      field: "VahicleCode",
      header: "ทะเบียนรถ",
      minWidth: "10rem",
    },
    {
      field: "TransactionTypeCode",
      header: "รหัสประเภทชั่ง",
      minWidth: "15rem",
    },

    {
      field: "CompanyCode",
      header: "รหัสบริษัท",
      minWidth: "15rem",
    },
    {
      field: "CompanyName",
      header: "ชื่อบริษัท",
      minWidth: "15rem",
    },
    {
      field: "CustomerCode",
      header: "รหัสคู่ค้า",
      minWidth: "15rem",
    },
    {
      field: "CustomerName",
      header: "ชื่อคู่ค้า",
      minWidth: "15rem",
    },
    {
      field: "CustomerAddress1",
      header: "ที่อยู่คู่ค้า 1",
      minWidth: "15rem",
    },
    {
      field: "CustomerAddress2",
      header: "ที่อยู่คู่ค้า 2",
      minWidth: "15rem",
    },
    {
      field: "ProductCode",
      header: "รหัสสินค้า",
      minWidth: "15rem",
    },
    {
      field: "ProductName",
      header: "ชื่อสินค้า",
      minWidth: "15rem",
    },
    {
      field: "StoreCode",
      header: "StoreCode",
      minWidth: "10rem",
    },
    {
      field: "InboundWeight",
      header: "น้ำหนักเข้า",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "OutboundWeight",
      header: "น้ำหนักออก",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "Moisture",
      header: "ความชื้น",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "MoistureTableCode",
      header: "รหัสตารางความชื้น",
      minWidth: "15rem",
    },
    {
      field: "MoistureDeduct",
      header: "หักความชื้น",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "Price",
      header: "ราคา",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "TradingUnit",
      header: "หน่วยซื้อขาย",
      minWidth: "15rem",
    },
    {
      field: "KgPerTradingUnit",
      header: "กก.ต่อหน่วย",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "Quantity",
      header: "จำนวน",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "PackingCode",
      header: "รหัสการบรรจุ",
      minWidth: "15rem",
    },
    {
      field: "SagWeight",
      header: "นน.กระสอบ",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "DeductWeight",
      header: "นน.หัก",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "VariedDeductWeight1",
      header: "หักสิ่งเจือปน",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "VariedDeductWeight2",
      header: "สิ่งเจือปนวัดได้",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "FixedDeductAmount1",
      header: "ค่าชั่งเหมา",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "VariedDeductAmount1",
      header: "ค่าชั่งต่อตัน",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "FixedDeductAmount2",
      header: "ค่าลงเหมา",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "VariedDeductAmount2",
      header: "ค่าลงต่อตัน",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "Remark1",
      header: "หมายเหตุ 1",
      minWidth: "15rem",
    },
    {
      field: "Remark2",
      header: "หมายเหตุ 2",
      minWidth: "15rem",
    },
    {
      field: "Remark3",
      header: "หมายเหตุ 3",
      minWidth: "15rem",
    },
    {
      field: "Remark4",
      header: "หมายเหตุ 4",
      minWidth: "15rem",
    },
    {
      field: "InboundUsername",
      header: "ผู้ชั่งเข้า",
      minWidth: "15rem",
    },
    {
      field: "OutboundUsername",
      header: "ผู้ชั่งออก",
      minWidth: "15rem",
    },
    {
      field: "NetWeight",
      header: "NetWeight",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "TradingWeight",
      header: "TradingWeight",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "Amount",
      header: "Amount",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "NetAmount",
      header: "NetAmount",
      minWidth: "15rem",
      align: "right",
      alignHeader: "right",
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
    setTransctnData({
      ...zu_SelectedList,
      Cancel: zu_SelectedList.Cancel === 0 ? false : true,
    });
  };

  const option = {
    method: "POST",
    headers: {
      "API-KEY": "857F7237C03246028748D51C97D4BADE",
    },
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
      WeightDateOutFrom: moment(zu_SearchFilters[3].From).format("YYYY-MM-DD"),
      WeightDateOutTo: moment(zu_SearchFilters[3].To).format("YYYY-MM-DD"),

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
      CompanyIDFilter: zu_SearchFilters[8].Filter,
      CompanyIDFrom: zu_SearchFilters[8].From,
      CompanyIDTo: zu_SearchFilters[8].To,
      CustomerIDFilter: zu_SearchFilters[9].Filter,
      CustomerIDFrom: zu_SearchFilters[9].From,
      CustomerIDTo: zu_SearchFilters[9].To,
      ProductIDFilter: zu_SearchFilters[10].Filter,
      ProductIDFrom: zu_SearchFilters[10].From,
      ProductIDTo: zu_SearchFilters[10].To,
      TransporterIDFilter: zu_SearchFilters[11].Filter,
      TransporterIDFrom: zu_SearchFilters[11].From,
      TransporterIDTo: zu_SearchFilters[11].To,
      DriverIDFilter: zu_SearchFilters[12].Filter,
      DriverIDFrom: zu_SearchFilters[12].From,
      DriverIDTo: zu_SearchFilters[12].To,
      //FlagCancelFilter: zu_SearchFilters[12].Filter ? "Y" : "N",
      //FlagStatusFilter: bodySearch[13].Filter ? "Y" : "N",
    }),
  };

  const resetState = () => {
    setTransctnData(initialData);
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit, zu_SelectedList]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  //แก้
  const addedit = (
    <div>
      <div>{columns[0].header} </div>
      <div>
        <InputText
          autoFocus
          disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="TransactionKey"
          defaultValue={transctnData.TransactionKey}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[1].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="TicketCode"
          defaultValue={transctnData.TicketCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[2].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="TransactionTypeCode"
          defaultValue={transctnData.TransactionTypeCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[3].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="TransactionTypeCode"
          defaultValue={transctnData.TransactionTypeCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={transctnData.Cancel}
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

  const urlapimain = "Transctn";
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
    const urlread = "/weightreport/read.php";
    const optionread = option;
    zuSetFromAddEdit(addedit);
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ข้อมูลชั่งน้ำหนัก");
    zuFetch();
  }, []);

  //search
  useEffect(() => {
    console.log("useEffect Load Data 2");
    if (zu_Title_Form_AddEdit === "search") {
      //zuResetData();
      const urlread = "weightreport/read.php";
      const optionread = option;
      zuSetFetch(urlread, optionread);
      zuFetch();
      console.log("Load Data 2");
    }
  }, [zu_ToggleSearch]);

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
        body: JSON.stringify(transctnData),
      };
      zuSetDataID(transctnData.TransactionKey);
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
        body: JSON.stringify(transctnData),
      };
      zuSetDataID(transctnData.TransactionKey);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [transctnData, zu_Title_Form_AddEdit]);

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
        TransactionKey: transctnData.TransactionKey,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [transctnData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"TransactionKey"} minWidth={"10rem"} />
    </div>
  );
}

export default AppTransctn;
