import { create } from "zustand";

export const storeMaster = create((set, get) => ({
    zu_MasterCustomers: [],
    zu_MasterProducts: [],
    zu_MasterWeighttypes: [],
    zu_MasterDrivers: [],
    zu_MasterTransporters: [],
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
}));