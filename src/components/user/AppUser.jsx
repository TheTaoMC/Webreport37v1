import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
function AppUser() {
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
  const initialData = {
    Username: null,
    FullName: null,
    Pwd: null,
    CanEditUser: false,
    Cancel: false,
    OldPk: null,
  };

  //แก้
  const [usersData, setUsersData] = useState(initialData);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value, checked } = event.target;
    console.log(name, value);

    setUsersData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  //แก้
  const columns = [
    {
      field: "Username",
      header: "ชื่อ",
    },
    {
      field: "FullName",
      header: "ชื่อเต็ม",
    },
    {
      field: "CanEditUser",
      header: "ระดับ",
      body: (rowData) => {
        return rowData.CanEditUser ? "Admin" : "User";
      },
    },
    {
      field: "Cancel",
      header: "สถานะ",
      body: (rowData) => {
        return rowData.Cancel ? "ยกเลิก" : "ใช้งาน";
      },
    },
  ];
  const setState = () => {
    setUsersData({
      ...zu_SelectedList,
      Cancel: zu_SelectedList.Cancel ? true : false,
      OldPk: zu_SelectedList.Username,
    });
  };

  const resetState = () => {
    setUsersData(initialData);
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit, zu_SelectedList]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  //แก้
  const addedit = (
    <div>
      <div>{columns[0].header}</div>
      <div>
        <InputText
          autoFocus
          //disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="Username"
          defaultValue={usersData.Username}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[1].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="FullName"
          defaultValue={usersData.FullName}
          onBlur={handleInputChange}
        />
      </div>
      <div>รหัสผ่าน</div>
      <div>
        <Password
          className="w-[100%]"
          name="Pwd"
          defaultValue={usersData.Pwd}
          onBlur={handleInputChange}
          feedback={false}
          tabIndex={1}
        />
      </div>
      <div>{columns[2].header}</div>
      <div>
        {/*         <InputText
          className="w-[100%]"
          name="CanEditUser"
          defaultValue={usersData.CanEditUser}
          onBlur={handleInputChange}
        /> */}
        <Dropdown
          className="w-[100%]"
          name="CanEditUser"
          value={usersData.CanEditUser}
          options={[
            { name: "Admin", value: true },
            { name: "User", value: false },
          ]}
          optionLabel="name"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={usersData.Cancel}
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

  const urlapimain = "Users";
  //Load Data รอบแรก
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
    zuSetTitle("การบรรจุ");
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
        body: JSON.stringify(usersData),
      };
      zuSetDataID(usersData.Username);
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
        body: JSON.stringify(usersData),
      };
      zuSetDataID(usersData.Username);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [usersData, zu_Title_Form_AddEdit]);

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
        Username: usersData.Username,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [usersData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"Username"} minWidth={"10rem"} />
    </div>
  );
}

export default AppUser;
