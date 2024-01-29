import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import moment from "moment/moment";

export const useStore = create((set, get) => ({
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
            From: moment(new Date())
                .startOf("day")
                .format("DD/MM/YYYY HH:mm:ss"),
            To: moment(new Date())
                .startOf("day")
                .format("DD/MM/YYYY HH:mm:ss"),
        },
        {
            Title: "วันที่ชั่งออก",
            Filter: false,
            Typeinput: "calendar",
            From: moment(new Date())
                .startOf("day")
                .format("DD/MM/YYYY HH:mm:ss"),
            To: moment(new Date())
                .startOf("day")
                .format("DD/MM/YYYY HH:mm:ss"),

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
    ],
    zu_ToggleFetchFilter: false,
    zu_Data: [],
    zu_Form_AddEdit: null,
    zu_Title: "",
    zu_Title_Form_AddEdit: null,
    zu_SelectedList: [],
    zu_DataID: "",
    zu_ID: "",
    zu_Columns: [],

    zu_permission: false,

    zu_MasterCustomers: [],
    zu_MasterProducts: [],
    zu_MasterWeighttypes: [],
    zu_MasterDrivers: [],
    zu_MasterTransporters: [],

    zu_Url_Base: "https://theothai.com/ttw_webreport/API/api/",

    zu_Url_Fetch: "",
    zu_Option_Fetch: {},

    zu_Url_Add: "",
    zu_Option_Add: {},

    zu_Url_Edit: "",
    zu_Option_Edit: {},

    zu_Url_Del: "",
    zu_Option_Del: {},
    zuSetSearchFiltersCheckbox: (updatedFilters) => set({ zu_SearchFilters: updatedFilters }),
    zuSetSearchFiltersTextbox: (updatedFilters) => set({ zu_SearchFilters: updatedFilters }),

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
            const responseCustomers = await fetch(get().zu_Url_Base + "customer/read.php", { method: "GET", headers: { "API-KEY": "857F7237C03246028748D51C97D4BADE" } });
            const responseProducts = await fetch(get().zu_Url_Base + "product/read.php", { method: "GET" });
            const responseWeighttypes = await fetch(get().zu_Url_Base + "weighttype/read.php", { method: "GET" });
            const responseDrivers = await fetch(get().zu_Url_Base + "driver/read.php", { method: "GET" });
            const responseTransporters = await fetch(get().zu_Url_Base + "transporter/read.php", { method: "GET" });

            const successfulResponses = [];

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

            if (responseWeighttypes.ok) {
                const data = await responseWeighttypes.json();
                set({ zu_MasterWeighttypes: data });
                successfulResponses.push("Weighttypes");
            }

            if (responseDrivers.ok) {
                const data = await responseDrivers.json();
                set({ zu_MasterDrivers: data });
                successfulResponses.push("Drivers");
            }

            if (responseTransporters.ok) {
                const data = await responseTransporters.json();
                set({ zu_MasterTransporters: data });
                successfulResponses.push("Transporters");
            }

            if (successfulResponses.length === 0) {
                throw new Error("All requests failed.");
            }

            //console.log(`Successful requests for: ${successfulResponses.join(", ")}`);
            return 'success';
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    zuFetch: async () => {
        try {
            //console.log('get() ', get().zu_Url_Fetch, get().zu_Option_Fetch);
            const response = await fetch(get().zu_Url_Fetch, get().zu_Option_Fetch);
            if (!response.ok) {
                set({ zu_Data: [] });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response.ok) {
                const data = await response.json();
                //console.log(data);
                set({ zu_Data: data });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            set({ zu_Data: [] });
        }
    },
    zuAddData: async () => {
        try {
            console.log(get().zu_DataID, get().zu_ID);
            if (get().zu_DataID === "" || get().zu_ID === "") {
                return false;
            }

            const response = await fetch(get().zu_Url_Add, get().zu_Option_Add);

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
            console.log('294 ', get().zu_Url_Edit, get().zu_Option_Edit);
            console.log('295 ', get().zu_DataID, get().zu_ID);
            console.log('get().zu_Title_Form_AddEdit ', get().zu_Title_Form_AddEdit);
            console.log('get().zu_DataID ', get().zu_DataID);
            /*       console.log(
                                "76",
                                get().zu_Url_Edit,
                                get().zu_Option_Edit,
                                get().zu_SelectedList
                              );
                              console.log(get().zu_SelectedList);
                              console.log(typeof get().zu_SelectedList);
                        
                              console.log(get().zu_SelectedList.length); */
            //ผิดก็ผิดตรงนี้หละ
            if (get().zu_Title_Form_AddEdit !== 'edit' && get().zu_DataID === "") {
                if (get().zu_DataID === "" || get().zu_ID === "") {
                    console.log('309');
                    return false;
                }
            }



            if (get().zu_SelectedList.length === 0) {
                console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการแก้ไข");
                return false;
            }

            const response = await fetch(get().zu_Url_Edit, get().zu_Option_Edit);
            console.log("response");
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

            const response = await fetch(get().zu_Url_Del, get().zu_Option_Del);

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
    zuLogin: async (username, password, formData) => {
        const url = get().zu_Url_Base + 'userlogin/login.php'
        try {
            //console.log(get().zu_Url_Fetch, get().zu_Option_Fetch);
            const response = await fetch('https://theothai.com/ttw_webreport/API/api/userlogin/login.php', {
                method: 'POST',
                body: JSON.stringify(/* {
                    "LogInName": username,
                    "LogInPassword": password
                } */
                    formData
                )
            });
            if (!response.ok) {
                //set({ zu_Data: [] });
                console.log(response.message);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response.ok) {
                const data = await response.json();
                //console.log('data ', data);
                const logInName = data.LogInName;
                const permission = data.Permission;
                const authenticatedUser = { logInName, permission };
                Cookies.set("user", JSON.stringify(authenticatedUser), {
                    expires: 1, // หาร1000 = 1 วินาที
                });
                return 'success';
            }



        } catch (error) {
            console.error("Error fetching data:", error);

        }
    },
    zuCheckUser: async (func) => {
        const storedUser = Cookies.get("user");
        if (!storedUser) {
            func()
            return;
        } else {
            const res = await JSON.parse(Cookies.get('user'))
            //console.log(res.permission);
            set({ zu_permission: res.permission === 'Y' ? true : false });
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
