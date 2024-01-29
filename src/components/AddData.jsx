import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import { useStore } from "../zustand/Store";

const AddData = () => {
  const { zu_Form_AddEdit, zu_Title_Form_AddEdit, zu_ToggleVisible } =
    useStore();
  const { zuAddData, zuEditData, zuToggleResetState, zuToggleVisible } =
    useStore();

  const toast = useRef(null);
  const save = async () => {
    if (zu_Title_Form_AddEdit === "add") {
      console.log("add");
      const data = await zuAddData();
      if (!data) {
        toast.current.show({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "ข้อมูลไม่ถูกต้อง",
          life: 3000,
        });
        return;
      } else {
        toast.current.show({
          severity: "success",
          summary: "แจ้งเตือน",
          detail: "เพิ่มข้อมูลสำเร็จ",
          life: 3000,
        });
      }

      zuToggleResetState();
      zuToggleVisible();
    } else {
      console.log("edit");
      const data = await zuEditData();
      console.log("edit:data: ", data);
      if (!data) {
        toast.current.show({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "ข้อมูลไม่ถูกต้อง",
          life: 3000,
        });
        return;
      } else {
        toast.current.show({
          severity: "success",
          summary: "แจ้งเตือน",
          detail: "แก้ไข้อมูลสำเร็จ",
          life: 3000,
        });
      }
      zuToggleResetState();
      zuToggleVisible();
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={zu_Title_Form_AddEdit === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
        visible={zu_ToggleVisible}
        style={{ width: "70vw" }}
        onHide={() => {
          zuToggleVisible();
        }}
      >
        {zu_Form_AddEdit}

        <div className="flex gap-2 mt-2">
          <Button
            onClick={() => {
              save();
            }}
            className="w-20"
            label="บันทึก"
          />

          <Button
            className="w-20"
            onClick={() => {
              zuToggleResetState();
              zuToggleVisible();
            }}
            label="ยกเลิก"
          />
        </div>
      </Dialog>
    </>
  );
};

export default AddData;
