import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useStore } from "../../zustand/Store";
import moment from "moment/moment";
import _debounce from "lodash/debounce";

function AppSearch() {
  const {
    zuDelData,
    zuEditData,
    zuToggleResetState,
    zuToggleEdit,
    zuSetTitleFromAddEdit,
    zuToggleVisible,
    zuSetSearchFilters,
    zuToggleSearch,
    zuSetTitle,
    zuSetSearchFiltersCheckbox,
    zuSetSearchFiltersTextbox,
  } = useStore();

  const {
    zu_SearchFilters,
    zu_MasterTranTypes,
    zu_MasterCompanys,
    zu_MasterCustomers,
    zu_MasterProducts,
    zu_MasterPackings,
    zu_MasterTrdUnts,
    zu_MasterMoistTHs,
  } = useStore();

  //Master ต่างๆ
  const [dataTranTypes, setDataTranTypes] = useState([]);
  const [dataCompanys, setDataCompanys] = useState([]);
  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataPackings, setDataPackings] = useState([]);
  const [dataTrdUnts, setDataTrdUnts] = useState([]);
  const [dataMoistTHs, setDataMoistTHs] = useState([]);

  //สถานะ Accordion
  const [activeIndex, setActiveIndex] = useState();

  const initialData = {
    WeightScaleIDInFilter: false,
    WeightScaleIDInFrom: null,
    WeightScaleIDInTo: null,
    WeightScaleIDOutFilter: false,
    WeightScaleIDOutFrom: null,
    WeightScaleIDOutTo: null,
    SequenceWeightInFilter: false,
    SequenceWeightInFrom: null,
    SequenceWeightInTo: null,
    SequenceWeightOutFilter: false,
    SequenceWeightOutFrom: null,
    SequenceWeightOutTo: null,
    WeightDateOutFilter: false,
    WeightDateOutFrom: null,
    WeightDateOutTo: null,
    CarRegisterFilter: false,
    CarRegisterTo: null,
    CarRegisterFrom: null,
    WeightTypeIDFilter: false,
    WeightTypeIDFrom: null,
    WeightTypeIDTo: null,
    CustomerIDFilter: false,
    CustomerIDFrom: null,
    customerIDTo: null,
    ProductIDFilter: false,
    ProductIDFrom: null,
    ProductIDTo: null,
    TransporterIDFilter: false,
    TransporterIDFrom: null,
    TransporterTo: null,
    DriverIDFilter: false,
    DriverIDFrom: null,
    DriverIDTo: null,
    FlagStatusFilter: false,
    FlagCancelFilter: false,
    FlagPaymentFilter: false,
  };
  const [searchFilters2, setSearchFilters2] = useState([initialData]);

  const [searchFilters, setSearchFilters] = useState([
    {
      //0
      Title: "เครื่องชั่งขาเข้า",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
      disabled: true,
    },
    {
      //1
      Title: "เครื่องชั่งขาออก",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
      disabled: true,
    },
    {
      //2
      Title: "วันที่ชั่งเข้า",
      Filter: false,
      Typeinput: "calendar",
      From: moment(new Date()).startOf("day"),
      To: moment(new Date()).startOf("day"),
      disabled: true,
    },
    {
      //3
      Title: "วันที่ชั่ง",
      Filter: true,
      Typeinput: "calendar",
      From: moment(new Date()).startOf("day"),
      To: moment(new Date()).startOf("day"),
    },
    {
      //4
      Title: "เลขที่เข้า",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      //5
      Title: "เลขที่ออก",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      //6
      Title: "ทะเบียนรถ",
      Filter: false,
      Typeinput: "text",
      From: "80-0004",
      To: "80-0004",
    },
    {
      //7
      Tablename: "tranType",
      Title: "ประเภทชั่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      //8
      Tablename: "company",
      Title: "บริษัท",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      //9
      Tablename: "customer",
      Title: "คู่ค้า",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      //10
      Tablename: "product",
      Title: "สินค้า",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      //11
      Tablename: "packing",
      Title: "บรรจุภัณฑ์",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
      disabled: true,
    },
    {
      //12
      Tablename: "trdUnt",
      Title: "หน่วย",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
      disabled: true,
    },
    {
      //13
      Tablename: "moistTH",
      Title: "ตารางความชึ้น",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
      disabled: true,
    },
    {
      //14
      Title: "สถานะ",
      Filter: false,
      FlagCancel: false,
      Typeinput: "Singledropdown",
      From: false,
      To: "",
    },
    {
      //15
      Title: "แสดงรถชั่งเสร็จ",
      Filter: false,
      Typeinput: "",
      From: "",
      To: "",
      disabled: true,
    },
    {
      //16
      Title: "แสดงงรถค้างชั่ง",
      Filter: false,
      Typeinput: "",
      From: "",
      To: "",
      disabled: true,
    },
  ]);

  //set ลำดับข้อมูล
  useEffect(() => {
    setDataTranTypes(
      zu_MasterTranTypes.sort((a, b) =>
        a.TransactionTypeCode.localeCompare(b.TransactionTypeCode)
      )
    );
    setDataCompanys(
      zu_MasterCompanys.sort((a, b) =>
        a.CompanyCode.localeCompare(b.CompanyCode)
      )
    );
    setDataCustomers(
      zu_MasterCustomers.sort((a, b) =>
        a.CustomerCode.localeCompare(b.CustomerCode)
      )
    );
    setDataProducts(
      zu_MasterProducts.sort((a, b) =>
        a.ProductCode.localeCompare(b.ProductCode)
      )
    );
    setDataPackings(
      zu_MasterPackings.sort((a, b) =>
        a.PackingCode.localeCompare(b.PackingCode)
      )
    );
    setDataTrdUnts(
      zu_MasterTrdUnts.sort((a, b) =>
        a.TradingUnitCode.localeCompare(b.TradingUnitCode)
      )
    );
    setDataMoistTHs(
      zu_MasterMoistTHs.sort((a, b) => a.TableCode.localeCompare(b.TableCode))
    );
  }, [
    zu_MasterTranTypes,
    zu_MasterCompanys,
    zu_MasterCustomers,
    zu_MasterProducts,
    zu_MasterPackings,
    zu_MasterTrdUnts,
    zu_MasterMoistTHs,
  ]);

  //set Checkbox
  const handleCheckbox = (i) => {
    const updatedFilters = [...searchFilters];
    //console.log([...searchFilters]);
    updatedFilters[i] = {
      ...updatedFilters[i],
      Filter: !updatedFilters[i].Filter,
    };
    setSearchFilters(updatedFilters);
  };

  //set อะไรวะ
  const handleText = _debounce((index, fromorto, newValue) => {
    if (fromorto === "From") {
      const updatedFilters = [...searchFilters];
      updatedFilters[index] = {
        ...updatedFilters[index],
        From: newValue,
      };
      setSearchFilters(updatedFilters);
    } else if (fromorto === "To") {
      const updatedFilters = [...searchFilters];
      updatedFilters[index] = {
        ...updatedFilters[index],
        To: newValue,
      };
      setSearchFilters(updatedFilters);
    }
  }, 1); // 300 milliseconds debounce time
  const handlesend = () => {
    // Update the Zustand store with the new filters
    zuSetSearchFiltersTextbox(searchFilters);
  };

  //set type input
  const renderSwitch = (
    typeinput,
    filter,
    value,
    index,
    fromorto,
    tablename
  ) => {
    //console.log("index:value: ", index, value);
    //console.log("tablename: ", tablename);
    switch (typeinput) {
      case "text":
        return (
          <>
            {fromorto === "From" && (
              <InputText
                disabled={filter ? false : true}
                className="w-[100%]"
                value={searchFilters[index].From}
                onChange={(e) => handleText(index, fromorto, e.target.value)}
              />
            )}

            {fromorto === "To" && (
              <InputText
                disabled={filter ? false : true}
                className="w-[100%]"
                value={searchFilters[index].To}
                onChange={(e) => handleText(index, fromorto, e.target.value)}
              />
            )}
          </>
        );
      case "calendar":
        return (
          <>
            {fromorto === "From" && (
              <Calendar
                disabled={filter ? false : true}
                className="w-[100%]"
                //showTime
                //value={zu_SearchFilters[index].From}
                value={moment(
                  searchFilters[index].From,
                  "DD/MM/YYYY HH:mm:ss"
                ).toDate()}
                onChange={(e) =>
                  handleText(
                    index,
                    fromorto,
                    //moment(e.value).startOf("day").format("DD/MM/YYYY")
                    e.value
                  )
                }
                hourFormat="24"
                dateFormat="dd/mm/yy"
                showIcon
                showButtonBar
              />
            )}
            {fromorto === "To" && (
              <Calendar
                disabled={filter ? false : true}
                className="w-[100%]"
                //showTime
                value={moment(
                  searchFilters[index].To,
                  "DD/MM/YYYY HH:mm:ss"
                ).toDate()}
                onChange={(e) =>
                  handleText(
                    index,
                    fromorto,
                    //moment(e.value).startOf("day").format("DD/MM/YYYY")
                    e.value
                  )
                }
                hourFormat="24"
                dateFormat="dd/mm/yy"
                showIcon
                showButtonBar
              />
            )}
          </>
        );
      case "dropdown":
        return (
          <>
            {fromorto === "From" && (
              <Dropdown
                disabled={filter ? false : true}
                className="w-[100%]"
                value={searchFilters[index].From}
                onChange={(e) => handleText(index, fromorto, e.value)}
                options={
                  tablename === "tranType"
                    ? dataTranTypes.map((data) => ({
                        value: data.TransactionTypeCode,
                        label:
                          data.TransactionTypeCode +
                          " : " +
                          data.TransactionTypeName,
                      }))
                    : tablename === "company"
                    ? dataCompanys.map((data) => ({
                        value: data.CompanyCode,
                        label: data.CompanyCode + " : " + data.CompanyName,
                      }))
                    : tablename === "customer"
                    ? dataCustomers.map((data) => ({
                        value: data.CustomerCode,
                        label: data.CustomerCode + " : " + data.CustomerName,
                      }))
                    : tablename === "product"
                    ? dataProducts.map((data) => ({
                        value: data.ProductCode,
                        label: data.ProductCode + " : " + data.ProductName,
                      }))
                    : tablename === "packing"
                    ? dataPackings.map((data) => ({
                        value: data.PackingCode,
                        label: data.PackingCode + " : " + data.PackingName,
                      }))
                    : tablename === "trdUnt"
                    ? dataTrdUnts.map((data) => ({
                        value: data.TradingUnitCode,
                        label: data.TradingUnitCode,
                      }))
                    : tablename === "moistTH"
                    ? dataMoistTHs.map((data) => ({
                        value: data.TableCode,
                        label: data.TableCode,
                      }))
                    : [] // Add more cases as needed
                }
                placeholder="เลือกข้อมูล"
                filter
                showClear
              />
            )}
            {fromorto === "To" && (
              <Dropdown
                disabled={filter ? false : true}
                className="w-[100%]"
                value={searchFilters[index].To}
                onChange={(e) => handleText(index, fromorto, e.value)}
                options={
                  tablename === "tranType"
                    ? dataTranTypes.map((data) => ({
                        value: data.TransactionTypeCode,
                        label:
                          data.TransactionTypeCode +
                          " : " +
                          data.TransactionTypeName,
                      }))
                    : tablename === "company"
                    ? dataCompanys.map((data) => ({
                        value: data.CompanyCode,
                        label: data.CompanyCode + " : " + data.CompanyName,
                      }))
                    : tablename === "customer"
                    ? dataCustomers.map((data) => ({
                        value: data.CustomerCode,
                        label: data.CustomerCode + " : " + data.CustomerName,
                      }))
                    : tablename === "product"
                    ? dataProducts.map((data) => ({
                        value: data.ProductCode,
                        label: data.ProductCode + " : " + data.ProductName,
                      }))
                    : tablename === "packing"
                    ? dataPackings.map((data) => ({
                        value: data.PackingCode,
                        label: data.PackingCode + " : " + data.PackingName,
                      }))
                    : tablename === "trdUnt"
                    ? dataTrdUnts.map((data) => ({
                        value: data.TradingUnitCode,
                        label: data.TradingUnitCode,
                      }))
                    : tablename === "moistTH"
                    ? dataMoistTHs.map((data) => ({
                        value: data.TableCode,
                        label: data.TableCode,
                      }))
                    : [] // Add more cases as needed
                }
                placeholder="เลือกข้อมูล"
                filter
                showClear
              />
            )}
          </>
        );
      case "Singledropdown":
        return (
          <div className="w-[100%]">
            {fromorto === "From" && (
              <Dropdown
                disabled={filter ? false : true}
                className="min-w-[7rem] max-w-10rem sm:md:ml-[62px]"
                value={searchFilters[index].From}
                onChange={(e) => handleText(index, fromorto, e.value)}
                options={[
                  { show: "ไม่ยกเลิก", value: false },
                  { show: "ยกเลิก", value: true },
                ].map((data) => ({
                  value: data.value,
                  label: data.show,
                }))}
                //placeholder="Select a Country"
                showClear
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  //เปิด - ปิด Accordion
  const onClickClose = () => {
    if (activeIndex.length === 0) {
      // If no tabs are open, open all tabs
      setActiveIndex([0, 1, 2]);
    } else {
      // If any tabs are open, close all tabs
      setActiveIndex([]);
    }
  };

  //set ชื่อ zuSetTitleFromAddEdit
  //set handlesend อัพเดท zuSetSearchFiltersTextbox(searchFilters)
  //set zuToggleSearch
  const handleSearch = () => {
    zuSetTitleFromAddEdit("search");
    handlesend();
    zuToggleSearch();
  };

  return (
    <div>
      <Accordion
        className="mt-2"
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <AccordionTab
          header="ค้นหา"
          pt={{
            headerAction: "bg-sky-200 hover:bg-sky-300 ",
          }}
        >
          <div className="">
            <div className="flex flex-col align-items-center">
              {searchFilters.map(
                (e, i) =>
                  !e.disabled && (
                    <div key={i} className="flex flex-col md:flex-row">
                      <div className="flex">
                        {e.Typeinput === "Singledropdown" ? (
                          <>
                            <input
                              type="checkbox"
                              className={"scale-150 cursor-pointer mr-2"}
                              onChange={() => handleCheckbox(i)}
                              checked={e.Filter}
                            />
                            <label
                              onClick={() => handleCheckbox(i)}
                              className="sm:md:ml-[0px] self-center min-w-[8rem] cursor-pointer"
                            >
                              {e.Title}
                            </label>
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              className={"scale-150 cursor-pointer mr-2"}
                              onChange={() => handleCheckbox(i)}
                              checked={e.Filter}
                            />
                            <label
                              onClick={() => handleCheckbox(i)}
                              className="self-center min-w-[8rem] cursor-pointer"
                            >
                              {e.Title}
                            </label>
                          </>
                        )}
                      </div>

                      {e.Typeinput === "Singledropdown" ||
                      e.Typeinput === "" ? null : (
                        <label className="self-start md:self-center md:ml-4 mr-2">
                          ตั้งแต่
                        </label>
                      )}

                      {renderSwitch(
                        e.Typeinput,
                        e.Filter,
                        e.Value,
                        i,
                        "From",
                        e.Tablename
                      )}
                      {e.Typeinput === "Singledropdown" ||
                      e.Typeinput === "" ? null : (
                        <label className="self-start md:self-center md:mx-2">
                          ถึง
                        </label>
                      )}

                      {renderSwitch(
                        e.Typeinput,
                        e.Filter,
                        e.Value,
                        i,
                        "To",
                        e.Tablename
                      )}
                    </div>
                  )
              )}

              <div className="flex justify-end gap-2">
                <Button
                  className=" p-2 w-24 h-10"
                  label="ค้นหา"
                  icon="pi pi-search"
                  onClick={handleSearch}
                />
                <Button
                  className=" p-2 w-24 h-10"
                  severity="danger"
                  label="ปิด"
                  icon="pi pi-times"
                  onClick={onClickClose}
                />
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
}

export default AppSearch;
