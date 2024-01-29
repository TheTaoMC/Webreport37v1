import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import header from "./HeaderBtn";

import { useStore } from "../../zustand/Store";

function AppTable({ sortField, minWidth, onSearchFiltersChange }) {
  const { zu_Data, zu_SelectedList, zu_Columns, zu_Title } = useStore();
  const { zuSelectedList } = useStore();
  const [selectedList, setSelectedList] = useState([]);
  const dt = useRef(null);

  const funheader = () => {
    return header(dt, onSearchFiltersChange);
  };
  return (
    <>
      <div className="max-w-[95%] mx-auto">
        <div className="text-3xl font-bold flex justify-center my-2">
          {zu_Title}
        </div>
        <div className="card">
          <DataTable
            //tableClassName="text-red-500"
            //className="text-red-500"
            sortField={sortField}
            sortOrder={1}
            value={zu_Data}
            header={funheader}
            ref={dt}
            size="Small"
            showGridlines
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            removableSort
            scrollable
            scrollHeight={window.innerHeight - 250}
            tableStyle={{ minWidth: minWidth }}
            //selection
            selectionMode="single"
            selection={zu_SelectedList}
            onSelectionChange={(e) => {
              //setSelectedList(e.value);
              //selectedlistOut(e.value);
              zuSelectedList(e.value);
            }}
            dataKey="DataID"
            metaKeySelection={true}
          >
            {zu_Columns.map((e, i) => (
              <Column
                key={i}
                field={e.field}
                header={e.header}
                body={e.body}
                align={e.align}
                sortable
                pt={{
                  headerCell: { className: "bg-sky-400" },
                  headerTitle: { className: " text-black" },
                  sort: { className: "color-red" },
                }}
              ></Column>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default AppTable;
