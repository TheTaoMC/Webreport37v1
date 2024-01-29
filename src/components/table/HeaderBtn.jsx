import React, { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Menu } from "primereact/menu";
import "primeicons/primeicons.css";
import AddData from "../AddData";
import AppSearch from "../search/AppSearch";

import { useStore } from "../../zustand/Store";

const header = (dt, onSearchFiltersChange) => {
  const {
    zu_SelectedList,
    zu_Url_Del,
    zu_Option_Del,
    zu_Columns,
    zu_Data,
    zu_Title,
    zu_permission,
  } = useStore();
  const {
    zuDelData,
    zuEditData,
    zuToggleResetState,
    zuToggleEdit,
    zuSetTitleFromAddEdit,
    zuToggleVisible,
    zuCheckUser,
  } = useStore();

  //console.log("zu_Url,zu_Option: ", zu_Url_Del, zu_Option_Del);
  const menuLeft = useRef(null);
  const toast = useRef(null);
  //console.log(setSelectedlist);

  const accept = async () => {
    try {
      const deletedData = await zuDelData(zu_Url_Del, zu_Option_Del);
      console.log("deletedData: ", deletedData);
      if (deletedData) {
        toast.current.show({
          severity: "info",
          summary: "แจ้งเตือน",
          detail: "ลบข้อมูลเรียบร้อย",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณาเลือกข้อมูล",
          life: 3000,
        });
      }
    } catch (error) {
      // จัดการ error ที่เกิดขึ้นในการลบข้อมูล
      console.error("Error deleting data:", error);
    }
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "แจ้งเตือน",
      detail: "ยกเลิก",
      life: 3000,
    });
  };

  //delete
  const confirmdel = () => {
    if (zu_SelectedList.length === 0) {
      console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบ");
      // คุณอาจต้องแสดงข้อความไปยังผู้ใช้ทาง UI ด้วย
      toast.current.show({
        severity: "warn",
        summary: "แจ้งเตือน",
        detail: "ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบ",
        life: 3000,
      });
      return;
    }
    confirmDialog({
      message: "ยืนยันการลบข้อมูล",
      header: "แจ้งเตือน !!!",
      icon: "pi pi-times",
      acceptClassName: "w-[80px]",
      defaultFocus: "reject",
      rejectClassName: "w-[80px] bg-red-700 hover:bg-red-800",
      headerClassName: "w-[20rem]",
      accept,
      reject,
    });
  };

  //Export CSV Pdf
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, zu_Data);
        doc.save("weightDatas.pdf");
      });
    });
  };

  const exportColumns = zu_Columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  //visible Dialog Add/Edit
  const handleClickAdd = () => {
    zuSetTitleFromAddEdit("add");
    zuToggleResetState();
    zuToggleVisible();
  };

  const handleClickEdit = () => {
    if (zu_SelectedList.length === 0) {
      console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการแก้ไข");
      toast.current.show({
        severity: "warn",
        summary: "แจ้งเตือน",
        detail: "ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการแก้ไข",
        life: 3000,
      });

      return;
    } else {
      zuSetTitleFromAddEdit("edit");
      zuToggleEdit();
      zuToggleVisible();
    }
  };
  //console.log("zu_permission ", zu_permission);
  const menu = useRef(null);
  const menuItems1 = [
    {
      label: "Add",
      icon: "pi pi-plus",
      command: handleClickAdd,
      visible:
        zu_Title === "ข้อมูลชั่งน้ำหนัก" ||
        zu_Title === "รายงานชั่ง" ||
        zu_permission === false
          ? false
          : true,
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: handleClickEdit,
      visible:
        zu_Title === "ข้อมูลชั่งน้ำหนัก" && zu_permission === true
          ? true
          : zu_Title === "รายงานชั่ง"
          ? false
          : zu_permission === false
          ? false
          : true,
    },
    {
      id: 3,
      label: "Delete",
      icon: "pi pi-times",
      command: confirmdel,
      visible:
        zu_Title === "ข้อมูลชั่งน้ำหนัก" && zu_permission === true
          ? true
          : zu_Title === "รายงานชั่ง"
          ? false
          : zu_permission === false
          ? false
          : true,
    },
    {
      label: "Export",
      icon: "pi pi-file-pdf",
      command: exportPdf,
    },
    {
      label: "Export",
      icon: "pi pi-file",
      command: () => exportCSV(false),
    },
  ];
  const menuItems2 = [
    {
      label: "PDF",
      icon: "pi pi-file-pdf",
      command: exportPdf,
    },
    {
      label: "CSV",
      icon: "pi pi-file",
      command: () => exportCSV(false),
    },
  ];
  const menuItems3 = [
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: handleClickEdit,
    },
    {
      id: 3,
      label: "Delete",
      icon: "pi pi-times",
      command: confirmdel,
    },
    {
      label: "Export",
      icon: "pi pi-file-pdf",
      command: exportPdf,
    },
    {
      label: "Export",
      icon: "pi pi-file",
      command: () => exportCSV(false),
    },
  ];

  useEffect(() => {
    zuCheckUser();
  }, []);
  return (
    <>
      <div className="flex sm:flex-row flex-col  sm:align-items-center items-center justify-between gap-2">
        <Toast ref={toast} />
        <ConfirmDialog className="text-6xl border border-gray-950" />

        <div className="flex sm:hidden self-start">
          {/*           <Menu
            model={
              zu_Title === "รายงานชั่ง"
                ? menuItems2
                : zu_Title === "ข้อมูลชั่งน้ำหนัก"
                ? menuItems3
                : menuItems1
            }
            popup
            ref={menuLeft}
            id="popup_menu_left"
          /> */}
          <Menu model={menuItems1} popup ref={menuLeft} id="popup_menu_left" />
          <Button
            label="Menu"
            icon="pi pi-bars"
            className="p-2 w-24 h-10"
            onClick={(event) => menuLeft.current.toggle(event)}
            aria-controls="popup_menu_left"
            aria-haspopup
          />
        </div>

        {zu_Title !== "รายงานชั่ง" && (
          <div className="sm:flex hidden sm:flex-row flex-col gap-2">
            {zu_Title !== "ข้อมูลชั่งน้ำหนัก" && (
              <Button
                visible={
                  zu_Title === "ข้อมูลชั่งน้ำหนัก" ||
                  zu_Title === "รายงานชั่ง" ||
                  zu_permission === false
                    ? false
                    : true
                }
                className=" p-2 w-24 h-10"
                label="Add"
                icon="pi pi-plus"
                onClick={handleClickAdd}
              />
            )}
            <AddData />

            <Button
              visible={
                zu_Title === "ข้อมูลชั่งน้ำหนัก" && zu_permission === true
                  ? true
                  : zu_Title === "รายงานชั่ง"
                  ? false
                  : zu_permission === false
                  ? false
                  : true
              }
              className=" p-2 w-24 h-10"
              label="Edit"
              icon="pi pi-pencil"
              onClick={handleClickEdit}
            />

            <Button
              visible={
                zu_Title === "ข้อมูลชั่งน้ำหนัก" && zu_permission === true
                  ? true
                  : zu_Title === "รายงานชั่ง"
                  ? false
                  : zu_permission === false
                  ? false
                  : true
              }
              className=" p-2 w-24 h-10"
              severity="danger"
              label="Delete"
              icon="pi pi-times"
              onClick={confirmdel}
            />
          </div>
        )}

        <div className="sm:flex hidden sm:flex-row flex-col gap-2 w-screen justify-end">
          <Button
            className=" p-2 w-24 h-10 rounded-md"
            type="button"
            label="PDF"
            icon="pi pi-file-pdf"
            //severity="warning"
            rounded
            onClick={exportPdf}
            data-pr-tooltip="PDF"
          />
          <Button
            className=" p-2 w-24 h-10 rounded-md"
            type="button"
            label="CSV"
            icon="pi pi-file"
            rounded
            onClick={() => exportCSV(false)}
            data-pr-tooltip="CSV"
          />
        </div>
      </div>

      {zu_Title === "รายงานชั่ง" || zu_Title === "ข้อมูลชั่งน้ำหนัก" ? (
        <AppSearch onSearchFiltersChange={onSearchFiltersChange} />
      ) : null}
    </>
  );
};

export default header;
