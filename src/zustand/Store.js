import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import moment from "moment/moment";

//import config from '../assets/config'

export const useStore = create((set, get) => ({
  zu_Api_Key: "3224447069454886babb1c10ffc0f8be",
  zu_Url_Base: "https://theothai.com/tww37_samui_waste/API/api/",
  zu_Basename: "./TTW37",
  //zu_Url_Base: "http://192.168.1.208/tww37_webreport/API/api/",
  zu_ToggleResetState: false,
  zu_ToggleEdit: false,
  zu_ToggleVisible: false,
  zu_ToggleSearch: false,
  zu_SearchFilters: [
    {
      Title: "เครื่องชั่งขาเข้า",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
      disabled: true,
    },
    {
      Title: "เครื่องชั่งขาออก",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
      disabled: true,
    },
    {
      Title: "วันที่ชั่งเข้า",
      Filter: false,
      Typeinput: "calendar",
      From: moment(new Date()).startOf("day"),
      To: moment(new Date()).startOf("day"),
      disabled: true,
    },
    {
      Title: "วันที่ชั่ง",
      Filter: true,
      Typeinput: "calendar",
      From: moment(new Date()).startOf("day"),
      To: moment(new Date()).startOf("day"),
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
      From: "80-0004",
      To: "80-0004",
    },
    {
      Tablename: "tranType",
      Title: "ประเภทชั่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      Tablename: "company",
      Title: "บริษัท",
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
      Tablename: "packing",
      Title: "บรรจุภัณฑ์",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      Tablename: "trdUnt",
      Title: "หน่วย",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      Tablename: "moistTH",
      Title: "ตารางความชึ้น",
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
  ],
  zu_ToggleFetchFilter: false,
  zu_Data: [],
  zu_DataDashboard: [],
  zu_Form_AddEdit: null,
  zu_Title: "",
  zu_Title_Form_AddEdit: null,
  zu_SelectedList: [],
  zu_DataID: "",
  zu_ID: "",
  zu_Columns: [],

  zu_permission: false,

  zu_MasterTranTypes: [],
  zu_MasterCompanys: [],
  zu_MasterCustomers: [],
  zu_MasterProducts: [],
  zu_MasterPackings: [],
  zu_MasterTrdUnts: [],
  zu_MasterMoistTHs: [],

  zu_Url_Fetch: "",
  zu_Option_Fetch: {},

  zu_Url_Add: "",
  zu_Option_Add: {},

  zu_Url_Edit: "",
  zu_Option_Edit: {},

  zu_Url_Del: "",
  zu_Option_Del: {},
  zuSetSearchFiltersCheckbox: (updatedFilters) =>
    set({ zu_SearchFilters: updatedFilters }),
  zuSetSearchFiltersTextbox: (updatedFilters) =>
    set({ zu_SearchFilters: updatedFilters }),

  zuSetSearchFilters: (filters) => set({ zu_SearchFilters: filters }),
  zuSetFromAddEdit: (form) => set({ zu_Form_AddEdit: form }),
  zuSetColumns: (columns) => set({ zu_Columns: columns }),
  zuSetTitle: (title) => set({ zu_Title: title }),
  zuSetTitleFromAddEdit: (title) => set({ zu_Title_Form_AddEdit: title }),
  zuSetDataID: (dataID, id) => set({ zu_DataID: dataID, zu_ID: id }),
  zuSetFetch: (url, option) =>
    set({ zu_Url_Fetch: url, zu_Option_Fetch: option }),
  zuSetAdd: (url, option) => set({ zu_Url_Add: url, zu_Option_Add: option }),
  zuSetEdit: (url, option) => set({ zu_Url_Edit: url, zu_Option_Edit: option }),
  zuSetDel: (url, option) => set({ zu_Url_Del: url, zu_Option_Del: option }),
  zuFetchMaster: async () => {
    try {
      const responseTranTypes = await fetch(
        get().zu_Url_Base + "TranType/read.php",
        {
          method: "GET",
          headers: { "API-KEY": get().zu_Api_Key },
        }
      );
      const responseCompanys = await fetch(
        get().zu_Url_Base + "Company/read.php",
        {
          method: "GET",
          headers: { "API-KEY": get().zu_Api_Key },
        }
      );
      const responseCustomers = await fetch(
        get().zu_Url_Base + "Customer/read.php",
        {
          method: "GET",
          headers: { "API-KEY": get().zu_Api_Key },
        }
      );
      const responseProducts = await fetch(
        get().zu_Url_Base + "Product/read.php",
        {
          method: "GET",
          headers: { "API-KEY": get().zu_Api_Key },
        }
      );
      const responsePackings = await fetch(
        get().zu_Url_Base + "Packing/read.php",
        {
          method: "GET",
          headers: { "API-KEY": get().zu_Api_Key },
        }
      );
      const responseTrdUnts = await fetch(
        get().zu_Url_Base + "TrdUnt/read.php",
        {
          method: "GET",
          headers: { "API-KEY": get().zu_Api_Key },
        }
      );
      const responseMoistTHs = await fetch(
        get().zu_Url_Base + "MoistTH/read.php",
        {
          method: "GET",
          headers: { "API-KEY": get().zu_Api_Key },
        }
      );

      const successfulResponses = [];

      if (responseTranTypes.ok) {
        const data = await responseTranTypes.json();
        set({ zu_MasterTranTypes: data });
        successfulResponses.push("TranTypes");
      }

      if (responseCompanys.ok) {
        const data = await responseCompanys.json();
        set({ zu_MasterCompanys: data });
        successfulResponses.push("Companys");
      }

      if (responseCustomers.ok) {
        const data = await responseCustomers.json();
        set({ zu_MasterCustomers: data });
        successfulResponses.push("Customers");
      }

      if (responseProducts.ok) {
        const data = await responseProducts.json();
        set({ zu_MasterProducts: data });
        successfulResponses.push("Products");
      }

      if (responsePackings.ok) {
        const data = await responsePackings.json();
        set({ zu_MasterPackings: data });
        successfulResponses.push("Packings");
      }

      if (responseTrdUnts.ok) {
        const data = await responseTrdUnts.json();
        set({ zu_MasterTrdUnts: data });
        successfulResponses.push("TrdUnts");
      }

      if (responseMoistTHs.ok) {
        const data = await responseMoistTHs.json();
        set({ zu_MasterMoistTHs: data });
        successfulResponses.push("MoistTHs");
      }

      if (successfulResponses.length === 0) {
        throw new Error("All requests failed.");
      }

      //console.log(`Successful requests for: ${successfulResponses.join(", ")}`);
      return "success";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  zuFetch: async () => {
    try {
      //console.log("testAPI");
      //console.log('get() ', get().zu_Url_Base + get().zu_Url_Fetch, get().zu_Option_Fetch);
      const response = await fetch(
        get().zu_Url_Base + get().zu_Url_Fetch,
        get().zu_Option_Fetch
      );

      if (!response.ok) {
        set({ zu_Data: [] });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        set({ zu_DataDashboard: data });
        if (get().zu_Title === "dashboard") {
          set({ zu_DataDashboard: data });
        } else {
          set({ zu_Data: data });
        }
        //return data;
        //return response.ok;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ zu_Data: [] });
    }
  },
  zuAddData: async () => {
    try {
      console.log("zuAddData : ", get().zu_ID);
      if (get().zu_ID === "") {
        return false;
      }

      const response = await fetch(
        get().zu_Url_Base + get().zu_Url_Add,
        get().zu_Option_Add
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      get().zuFetch();
      return response.ok;
    } catch (error) {
      console.error("Error Add data:", error);
    }
  },
  zuEditData: async () => {
    try {
      console.log(
        "zuEditData ",
        get().zu_Url_Base + get().zu_Url_Edit,
        get().zu_Option_Edit
      );

      //ผิดก็ผิดตรงนี้หละ
      if (get().zu_Title_Form_AddEdit !== "edit") {
        if (get().zu_ID === "") {
          console.log("309");
          return false;
        }
      }

      if (get().zu_SelectedList.length === 0) {
        console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการแก้ไข");
        return false;
      }

      const response = await fetch(
        get().zu_Url_Base + get().zu_Url_Edit,
        get().zu_Option_Edit
      );
      //console.log("response", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data: ", data);
      set({ zu_SelectedList: [] });
      get().zuFetch();
      return response.ok;
    } catch (error) {
      console.error("Error Edit data:", error);
    }
  },
  zuDelData: async () => {
    //console.log(url, option, selectedlist);
    try {
      console.log(
        get().zu_Url_Del,
        get().zu_Option_Del,
        get().zu_SelectedList.DataID
      );
      // ตรวจสอบว่า selectedlist มีค่าหรือไม่
      if (get().zu_SelectedList.length === 0) {
        console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบzu");
        return;
      }

      const response = await fetch(
        get().zu_Url_Base + get().zu_Url_Del,
        get().zu_Option_Del
      );

      if (!response.ok) {
        // หากไม่ปกติ ให้ throw ข้อผิดพลาด
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      set({ zu_SelectedList: [] });
      get().zuFetch();
      return data;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  },
  zuLogin: async (url, option) => {
    try {
      //console.log(get().zu_Url_Base + url, option);
      const response = await fetch(get().zu_Url_Base + url, option);
      if (!response.ok) {
        console.log(response.message);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        const data = await response.json();
        const logInName = data.LogInName;
        const permission = data.Permission;
        const authenticatedUser = { logInName, permission };
        /*                 Cookies.set("user", JSON.stringify(authenticatedUser), {
                                    expires: 1, // หาร1000 = 1 วินาที
                                }); */
        sessionStorage.setItem("user", JSON.stringify(authenticatedUser));
        return "success";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  zuCheckUser: async (func) => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      func();
      return;
    } else {
      const res = await JSON.parse(sessionStorage.getItem("user"));
      //console.log(res.permission);
      set({ zu_permission: res.permission === "Y" ? true : false });
      //console.log(get().zu_permission);
    }
  },
  zuResetData: () => set({ zu_Data: [] }),
  zuSelectedList: (selected) => set({ zu_SelectedList: selected }),
  zuToggleResetState: () =>
    set((state) => ({ zu_ToggleResetState: !state.zu_ToggleResetState })),
  zuToggleEdit: () => set((state) => ({ zu_ToggleEdit: !state.zu_ToggleEdit })),
  zuToggleVisible: () =>
    set((state) => ({ zu_ToggleVisible: !state.zu_ToggleVisible })),
  zuToggleSearch: () =>
    set((state) => ({ zu_ToggleSearch: !state.zu_ToggleSearch })),
  zuToggleFetchFilter: () =>
    set((state) => ({ zu_ToggleFetchFilter: !state.zu_ToggleFetchFilter })),
}));
