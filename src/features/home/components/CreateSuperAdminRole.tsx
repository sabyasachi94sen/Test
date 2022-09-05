 import { Button } from "@/shared/components"
 

 interface CreateSuperAdminRoleProps{
    onClick1: ()=>void;
    onClick2: ()=>void;
    onClick3: ()=>void
 }
 
 
 export  function CreateSuperAdminRole({ onClick1,onClick2 ,onClick3}: CreateSuperAdminRoleProps){

    return (
      <div className="w-[34%] h-[40vh] rounded-xl bg-[#FDFEFF] border-2 top-[5vh] right-[10vw] mx-auto -mt-[100vh] left-[2vw] relative z-10">
        <div className="w-[90%] h-[10vh] mx-auto flex justify-around items-center">
          <div className="w-[50px] shadow-lg rounded-l-2 h-[5vh] flex items-center justify-center cursor-pointer" onClick={onClick1}>
            <img alt="back-icon" src="/images/backArrow.png"/>
          </div>
          <h1 className="text-4xl text-[#3AB0FB] font-bold">Create an Super Admin role</h1>
        </div>
        <div className="w-[82%] h-[20vh] p-2 mx-auto leading-7 font-bold  text-[18px] font-sans text-[#344054]">
          <div className="mt-2">
            <span>Name</span>
            <input className="bg-[#EEEE] rounded-md w-[90%] h-[5vh] relative left-8" name="name" type="text" onChange={onClick3} /><br />
          </div>

          <div className="mt-12">
            <span>Email</span>
            <input className="bg-[#EEEE] rounded-md w-[90%] h-[5vh] relative left-9" name="email" type="email" onChange={onClick3} /><br />
          </div>

        </div>
        <div className="mx-auto w-28">
          <Button className="w-28 h-12 bg-[#3AB0FB" onClick={onClick2} >Save</Button>
        </div>

      </div>
    )
}
