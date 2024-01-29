import React, { useEffect, useState } from "react";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../zustand/Store";
function AppWeightreport() {
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
    zuCheckUser,
  } = useStore();
  /*   const [dataID, setDataID] = useState("");
  const [bodySearch, setBodySearch] = useState([
    {
      Title: "เครื่องชั่งขาเข้า",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "เครื่องชั่งขาออก",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "เวลาชั่งเข้า",
      Filter: false,
      Typeinput: "calendar",
      From: new Date(),
      To: new Date(),
    },
    {
      Title: "เวลาชั่งออก",
      Filter: true,
      Typeinput: "calendar",
      From: new Date(),
      To: new Date(),
    },
    {
      Title: "เลขที่เข้า",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "เลขที่ออก",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "ทะเบียนรถ",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Tablename: "weighttype",
      Title: "ประเภทชั่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Tablename: "customer",
      Title: "คู่ค้า",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      Tablename: "product",
      Title: "สินค้า",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Tablename: "transporter",
      Title: "ผู้ขนส่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Tablename: "driver",
      Title: "พนักงานขับรถ",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Title: "สถานะการยกเลิก",
      Filter: false,
      Typeinput: "Singledropdown",
      From: "",
      To: "",
    },
    {
      Title: "แสดงรถชั่งเสร็จ",
      Filter: false,
      Typeinput: "",
      From: "",
      To: "",
    },
    {
      Title: "แสดงงรถค้างชั่ง",
      Filter: false,
      Typeinput: "",
      From: "",
      To: "",
    },
  ]); */
  const navigate = useNavigate();
  /*   const fetchDataBody2 = () => {
    const result = bodySearch.map((e, i) => {
      return {
        method: "POST",
        body: JSON.stringify({
          WeightScaleIDInFilter: e.Filter,
          WeightScaleIDInFrom: "",
          WeightScaleIDInTo: "",
          WeightScaleIDOutFilter: e.Filter,
          WeightScaleIDOutFrom: "",
          WeightScaleIDOutTo: "",
          SequenceWeightInFilter: e.Filter,
          SequenceWeightInFrom: "",
          SequenceWeightInTo: "",
          SequenceWeightOutFilter: e.Filter,
          SequenceWeightOutFrom: "",
          SequenceWeightOutTo: "",
          WeightDateInFilter: e.Filter,
          WeightDateInFrom: "",
          WeightDateInTo: "",
          WeightTimeInFilter: e.Filter,
          WeightTimeInFrom: "",
          WeightTimeInTo: "",
          WeightDateOutFilter: e.Filter,
          WeightDateOutFrom: "",
          WeightDateOutTo: "",
          WeightTimeOutFilter: e.Filter,
          WeightTimeOutFrom: "",
          WeightTimeOutTo: "",
          CarRegisterFilter: e.Filter,
          CarRegisterTo: "",
          CarRegisterFrom: "",
          WeightTypeIDFilter: e.Filter,
          WeightTypeIDFrom: "",
          WeightTypeIDTo: "",
          CustomerIDFilter: e.Filter,
          CustomerIDFrom: "",
          customerIDTo: "",
          ProductIDFilter: e.Filter,
          ProductIDFrom: "",
          ProductIDTo: "",
          TransporterIDFilter: e.Filter,
          TransporterIDFrom: "",
          TransporterTo: "",
          DriverIDFilter: e.Filter,
          DriverIDFrom: "",
          DriverIDTo: "",
          RFIDTagIDFilter: e.Filter,
          RFIDTagIDFrom: "",
          RFIDTagIDTo: "",
          FlagStatusFilter: e.Filter,
          FlagCancelFilter: e.Filter,
          FlagPaymentFilter: e.Filter,
        }),
      };
    });

    return result;
  }; */

  //console.log("bodySearch: ", bodySearch[0].Filter);
  console.log("zu_SearchFilters: ", zu_SearchFilters);
  const option = {
    method: "POST",
    body: JSON.stringify({
      /*       WeightScaleIDInFilter: bodySearch[0].Filter,
      WeightScaleIDInFrom: bodySearch[0].From,
      WeightScaleIDInTo: bodySearch[0].To,
      WeightScaleIDOutFilter: bodySearch[1].Filter,
      WeightScaleIDOutFrom: bodySearch[1].From,
      WeightScaleIDOutTo: bodySearch[1].To,
      WeightDateInFilter: bodySearch[2].Filter,
      WeightDateInFrom: bodySearch[2].From,
      WeightDateInTo: bodySearch[2].To, */
      WeightDateOutFilter: zu_SearchFilters[3].Filter,
      WeightDateOutFrom: zu_SearchFilters[3].From,
      WeightDateOutTo: zu_SearchFilters[3].To,
      /*       SequenceWeightInFilter: bodySearch[4].Filter,
      SequenceWeightInFrom: bodySearch[4].From,
      SequenceWeightInTo: bodySearch[4].To,
      SequenceWeightOutFilter: bodySearch[5].Filter,
      SequenceWeightOutFrom: bodySearch[5].From,
      SequenceWeightOutTo: bodySearch[5].To, */
      CarRegisterFilter: zu_SearchFilters[6].Filter,
      CarRegisterFrom: zu_SearchFilters[6].From,
      CarRegisterTo: zu_SearchFilters[6].To,
      /*       WeightTypeIDFilter: bodySearch[7].Filter,
      WeightTypeIDFrom: bodySearch[7].From,
      WeightTypeIDTo: bodySearch[7].To,
      CustomerIDFilter: bodySearch[8].Filter,
      CustomerIDFrom: bodySearch[8].From,
      customerIDTo: bodySearch[8].To,
      ProductIDFilter: bodySearch[9].Filter,
      ProductIDFrom: bodySearch[9].From,
      ProductIDTo: bodySearch[9].To,
      TransporterIDFilter: bodySearch[10].Filter,
      TransporterIDFrom: bodySearch[10].From,
      TransporterTo: bodySearch[10].To,
      DriverIDFilter: bodySearch[11].Filter,
      DriverIDFrom: bodySearch[11].From,
      DriverIDTo: bodySearch[11].To, */
      //FlagCancelFilter: bodySearch[12].Filter ? "Y" : "N",
      //FlagStatusFilter: bodySearch[13].Filter ? "Y" : "N",
    }),
  };

  /*   const fetchDataBody1 = {
    method: "POST",
    body: JSON.stringify({
      WeightTimeInFilter: false,
      WeightTimeInFrom: "",
      WeightTimeInTo: "",
    }),
  };
 */
  /*   const delDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID.DataID,
    }),
  }; */

  /*   const upDatedataID = (selectedlist) => {
    setDataID(selectedlist);
  }; */

  /*   useEffect(() => {
    if (zu_SearchFilters.length === 0) {
      return;
    }
    console.log(zu_ToggleSearch);
    console.log(zu_SearchFilters);
    setBodySearch(zu_SearchFilters);
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/weightreport/read.php";
    const optionread = option;
    zuSetFetch(urlread, optionread);
    zuFetch();
  }, [zu_ToggleSearch]); */

  const columns = [
    {
      field: "DataID",
      header: "DataID",
    },
    {
      field: "WeightTimeIn",
      header: "WeightTimeIn",
    },
    {
      field: "WeightTimeOut",
      header: "WeightTimeOut",
    },
    {
      field: "CarRegister",
      header: "CarRegister",
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

  /*   const handleSearchFiltersChange = (filters) => {
    setBodySearch(filters);
  }; */

  //console.log(zu_SearchFilters);
  //console.log(bodySearch);
  /*   useEffect(() => {
    if (zu_SearchFilters.length === 0) {
      return;
    }
    setBodySearch(zu_SearchFilters);
    zuToggleFetchFilter();
    console.log("setBodySearch(zu_SearchFilters)");
  }, [zu_SearchFilters]); */

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/weightreport/read.php";
    const optionread = option;
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("รายงานชั่ง");
    zuFetch();
  }, []);

  //Load Data 2
  useEffect(() => {
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/weightreport/read.php";
    const optionread = option;
    zuSetFetch(urlread, optionread);
    zuFetch();
  }, [zu_ToggleSearch]);
  return (
    <div>
      <AppNavber />
      <AppTable minWidth={"50rem"} />
    </div>
  );
}

export default AppWeightreport;
