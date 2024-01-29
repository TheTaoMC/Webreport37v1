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
    zu_MasterCustomers,
    zu_MasterProducts,
    zu_MasterWeighttypes,
    zu_MasterDrivers,
    zu_MasterTransporters,
  } = useStore();

  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataWeighttypes, setDataWeighttypes] = useState([]);
  const [dataDrivers, setDataDrivers] = useState([]);
  const [dataTransporters, setDataTransporters] = useState([]);
  const [activeIndex, setActiveIndex] = useState();

  const [searchFilters, setSearchFilters] = useState([
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
      Title: "วันที่ชั่งเข้า",
      Filter: false,
      Typeinput: "calendar",
      From: moment(new Date()).startOf("day").format("DD/MM/YYYY HH:mm:ss"),
      To: moment(new Date()).startOf("day").format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      Title: "วันที่ชั่งออก",
      Filter: false,
      Typeinput: "calendar",
      From: moment(new Date()).startOf("day").format("DD/MM/YYYY HH:mm:ss"),
      To: moment(new Date()).startOf("day").format("DD/MM/YYYY HH:mm:ss"),
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
      Filter: true,
      Typeinput: "text",
      From: "80-0004",
      To: "80-0004",
    },
    {
      Tablename: "weighttype",
      Title: "ประเภทชั่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
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
      From: "",
      To: "",
    },
    {
      Tablename: "transporter",
      Title: "ผู้ขนส่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      Tablename: "driver",
      Title: "พนักงานขับรถ",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
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
  ]);

  useEffect(() => {
    setDataCustomers(
      zu_MasterCustomers.sort((a, b) =>
        a.CustomerID.localeCompare(b.CustomerID)
      )
    );
    setDataProducts(
      zu_MasterProducts.sort((a, b) => a.ProductID.localeCompare(b.ProductID))
    );
    setDataWeighttypes(
      zu_MasterWeighttypes.sort((a, b) =>
        a.WeightTypeID.localeCompare(b.WeightTypeID)
      )
    );
    setDataDrivers(
      zu_MasterDrivers.sort((a, b) => a.DriverID.localeCompare(b.DriverID))
    );
    setDataTransporters(
      zu_MasterTransporters.sort((a, b) =>
        a.TransporterID.localeCompare(b.TransporterID)
      )
    );
  }, [
    zu_MasterCustomers,
    zu_MasterProducts,
    zu_MasterWeighttypes,
    zu_MasterDrivers,
    zu_MasterTransporters,
  ]);

  //filterKey คือตัวเลข
  const handleCheckbox = (i) => {
    const updatedFilters = [...searchFilters];
    //console.log([...searchFilters]);
    updatedFilters[i] = {
      ...updatedFilters[i],
      Filter: !updatedFilters[i].Filter,
    };
    setSearchFilters(updatedFilters);
  };

  /*   const handleText = (index, fromorto, newValue) => {
    //console.log("newValue ", newValue);
    if (fromorto === "From") {
      const updatedFilters = [...zu_SearchFilters];
      updatedFilters[index] = {
        ...updatedFilters[index],
        From: newValue,
      };
      zuSetSearchFiltersTextbox(updatedFilters);
    } else if (fromorto === "To") {
      const updatedFilters = [...zu_SearchFilters];
      updatedFilters[index] = {
        ...updatedFilters[index],
        To: newValue,
      };
      zuSetSearchFiltersTextbox(updatedFilters);
    }
  }; */
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
                  "YYYY-MM-DD HH:mm:ss"
                ).toDate()}
                onChange={(e) =>
                  handleText(
                    index,
                    fromorto,
                    moment(e.value).startOf("day").format("YYYY-MM-DD HH:mm:ss")
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
                    moment(e.value).startOf("day").format("DD/MM/YYYY HH:mm:ss")
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
                  tablename === "weighttype"
                    ? dataWeighttypes.map((data) => ({
                        value: data.WeightTypeID,
                        label: data.WeightTypeID + " : " + data.WeightTypeName,
                      }))
                    : tablename === "customer"
                    ? dataCustomers.map((data) => ({
                        value: data.CustomerID,
                        label: data.CustomerID + " : " + data.CustomerName,
                      }))
                    : tablename === "product"
                    ? dataProducts.map((data) => ({
                        value: data.ProductID,
                        label: data.ProductID + " : " + data.ProductName,
                      }))
                    : tablename === "transporter"
                    ? dataTransporters.map((data) => ({
                        value: data.TransporterID,
                        label:
                          data.TransporterID + " : " + data.TransporterName,
                      }))
                    : tablename === "driver"
                    ? dataDrivers.map((data) => ({
                        value: data.DriverID,
                        label: data.DriverID + " : " + data.DriverName,
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
                  tablename === "weighttype"
                    ? dataWeighttypes.map((data) => ({
                        value: data.WeightTypeID,
                        label: data.WeightTypeID + " : " + data.WeightTypeName,
                      }))
                    : tablename === "customer"
                    ? dataCustomers.map((data) => ({
                        value: data.CustomerID,
                        label: data.CustomerID + " : " + data.CustomerName,
                      }))
                    : tablename === "product"
                    ? dataProducts.map((data) => ({
                        value: data.ProductID,
                        label: data.ProductID + " : " + data.ProductName,
                      }))
                    : tablename === "transporter"
                    ? dataTransporters.map((data) => ({
                        value: data.TransporterID,
                        label:
                          data.TransporterID + " : " + data.TransporterName,
                      }))
                    : tablename === "driver"
                    ? dataDrivers.map((data) => ({
                        value: data.DriverID,
                        label: data.DriverID + " : " + data.DriverName,
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
                className="min-w-[7rem] max-w-10rem sm:md:ml-[61px]"
                value={searchFilters[index].Filter}
                onChange={(e) => handleCheckbox(index, fromorto, e.value)}
                options={[
                  { show: "ใช่", value: true },
                  { show: "ไม่", value: false },
                ].map((data) => ({
                  value: data.value,
                  label: data.show,
                }))}
                placeholder="Select a Country"
                showClear
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const onClickClose = () => {
    if (activeIndex.length === 0) {
      // If no tabs are open, open all tabs
      setActiveIndex([0, 1, 2]);
    } else {
      // If any tabs are open, close all tabs
      setActiveIndex([]);
    }
  };

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
              {searchFilters.map((e, i) => (
                // eslint-disable-next-line react/jsx-key
                <div key={i} className="flex flex-col md:flex-row">
                  <div className="flex">
                    {e.Typeinput === "Singledropdown" ? (
                      <label
                        onClick={() => handleCheckbox(i)}
                        className="sm:md:ml-[37px] self-center min-w-[8rem] cursor-pointer"
                      >
                        {e.Title}
                      </label>
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
              ))}

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
