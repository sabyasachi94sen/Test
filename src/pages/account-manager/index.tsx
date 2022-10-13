import { useState } from "react"
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/router";

import { Account } from "@/api";
import { AccountManagerActivityTable,AccountManagerTable,CreateAccountManagerModal,DeleteAccountManagerModal,UpdateAccountManagerModal } from "@/features/account_manger"
import { Button, Input } from "@/shared/components";
import { ModalState, useModal } from "@/shared/stores/modal.store";
import { useAccountManager ,useAccountManagerActivities } from "@/shared/services/account-manager.service";

export default function AccountManagerPage() {
  const { currModalKey, onModalOpen } = useModal() as ModalState<Account>;

  const [ManagerList,setManagerList]=useState(null)
  const [isSearch,setIsSearch]=useState(false)

  const router = useRouter();
  const { page, perPage } = router.query;
  const accountManagerQuery = useAccountManager({ page });
  

    const searchStaff=(e:SyntheticEvent)=>{
    const staffName=e.target.value;
    const searchResults=accountManagerQuery?.data?.filter((item)=>item.manager_name.includes(staffName))

    console.log(searchResults)
    
    if(searchResults.length!=0){
      setIsSearch(true)
      setManagerList({isLoading: false, data:searchResults
     
    })
  }
 }

  
 

  return (
    <>
      <CreateAccountManagerModal isOpen={currModalKey === "createAccountManager"} />
      <UpdateAccountManagerModal isOpen={currModalKey === "updateAccountManager"} />
      <DeleteAccountManagerModal isOpen={currModalKey === "deleteAccountManager"} />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="font-sans text-3xl font-bold">
          Essai Account Manager Roster
        </h1>
        <div className="mt-8 flex justify-between">
          <Input
            leftAddOn={<HiSearch />}
            placeholder="Search the staff member here"
            width="96"
            onChange={searchStaff}
          />
          <Button width="max" onClick={() => {onModalOpen("createAccountManager")
           setIsSearch(false)
        }}>
            Add Staff
          </Button>
        </div>
        
          <AccountManagerTable
           
            onDelete={(user) => onModalOpen("deleteAccountManager", user)}
            onUpdate={(user) => onModalOpen("updateAccountManager", user)}
            accountManagerQuery={!isSearch?accountManagerQuery:ManagerList}
            page={page}
            isSearch={()=>setIsSearch(false)}
            
        />
      </div>
    </>
  );
}
