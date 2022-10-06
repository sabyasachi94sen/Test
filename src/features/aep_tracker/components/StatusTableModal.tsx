import { Account } from "@/api";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BaseModal, Button, Form, Input,BaseTable,Checkbox } from "@/shared/components";
import React, { useEffect, useMemo, useState} from "react";
import { useModal } from "@/shared/stores/modal.store";
import { useRouter } from "next/router";
import { formatDate } from "@/shared/utils";

export function StatusTableModal({ isOpen }: { isOpen: boolean }) {
  const { isModalOpen, onModalClose ,selectedData} = useModal();

   const [tableData,setTableData]=useState([])
  
  const columnHelper = createColumnHelper<Account>();
  const router=useRouter()
  const { page, perPage } = router.query;


  const columns = useMemo<ColumnDef<Account, any>[]>(
    () => [
     
      columnHelper.accessor((row) => row.activity_assignment?.activity?.activity_name, {
        id: "activity_name",
        header: "Activity Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.activity_assignment?.activity?.activity_type, {
        id: "activity_type",
        header: "Activity Type",
        cell: (info) => (info.getValue()),
      }),
      columnHelper.accessor((row) =>row.activity_assignment?.activity?.subject, {
        id: "subject",
        header: "Subject",
        cell: (info) => (
         info.getValue()
        ),
      }),
      columnHelper.accessor((row) => row.action_map?.action, {
        id: "action_map",
        header: "Action Map",
        cell: (info) => (
         info.getValue()
        ),
      }),
      columnHelper.accessor((row) => row.action_map?.created_at, {
        id: "target_date",
        header: "Target Date",
        cell: (info) => (
          info.getValue() ? formatDate(info.getValue()) : null
        ),
      }),

     

      columnHelper.accessor((row) => row.id, {
        id: "is_complete",
        header: "Complete",
        cell: (info) => (
         <Checkbox size={"lg"} isChecked={selectedData?.is_complete} isDisabled={true}/>
        ),
      }),




      columnHelper.accessor((row) => row.remarks, {
        id: "status",
        header: "Status",
        cell: (info) => (
           <Input  className="w-[70%] h-[4vh] rounded-lg bg-cyan-500" isDisabled={true} defaultValue={info.getValue()}/>
        ),
      }),
    ],
    [],
  );

 






  return (
    <BaseModal
      hasHeader
      showHeaderCloseButton
      isOpen={isModalOpen && isOpen}
      title="AEP implementation status table"
      
      modalWidth="max-w-[70%]"
      onRequestClose={() => {
        onModalClose();
      }}
    >
      <p className="ml-[2%] mb-5 text-bold mt-4">Student Name : {selectedData?.activity_assignment?.student?.student_name} </p>

    <BaseTable<Account>
      columns={columns}
      currentPage={Number(page) || 1}
      data={selectedData!=null?[selectedData]: []}
  
      totalPagesCount={10} // TODO: fix This once backend adds limit in query
    
    />
      
    </BaseModal>
  );
}
