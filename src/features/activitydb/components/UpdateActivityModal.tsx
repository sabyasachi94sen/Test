import { Slider } from "@material-ui/core";
import { useState,useEffect } from "react";

import { Account } from "@/api";
import { BaseModal, Button, Form } from "@/shared/components";
import { useUpdateActivity } from "@/shared/services/activity.service";
import { useModal } from "@/shared/stores/modal.store";
import { formatDate } from "@/shared/utils";
import Select from "react-select"

export function UpdateActivityModal({ isOpen }: { isOpen: boolean }) {

  const [storeOptions,setStoreOptions]=useState(null)
  const [storeResidence,setStoreResidence]=useState(null)
  const [storeCitizen,setStoreCitizen]=useState(null)

  const activityTypeOptions=[{
    option: "Exam"
  },{
    option: "Competition"
  },{
    option: "STEP programs"
  },{
    option: "Online Course"
  },{
    option: "Summer Schools : selective speciality"
  },{
    option: "Summer Schools : credit bearing"
  },{
    option: "Other"
  }]


  const subjectOptions=[{
    option: "Maths"
  },{
    option: "Computer"
  },{
    option: "Physics"
  },{
    option: "Chemistry"
  },{
    option: "Physics"
  },{
    option: "Chemistry"
  },{
    option: "Biology"
  },{
    option: "Environmental Science"
  },{
    option: "General Science"
  },{
    option:"Economics/Business/Finance"
  },{
    option: "General Science"
  },{
    option:"Economics/Business/Finance"
  },{
    option: "English"
  },{
    option: "Political Science"
  },{
    option: "Psychology"
  },{
    option: "Other"
  }]
  
 
 
 
 
 const applicationOptions=[{
   
     label: "Fee",
     value: "fee"
   
 },{
   label: "Form",
   value: "form"
 },{
   label: "Essay",
   value: "essay"
 },{
   label:"Multiple Essays",
   value: "multiple_essay"
 },{
   label: "LOR",
   value: "lor"
 },{
   label: "Multiple LORs",
   value: "multiple_lors"
 },{
   label: "Other",
   value: "other"
 }]


const locationTypeOptions=[{
  option: "Country / City"
},{
  option: "Virtual"
},{
  option: "Country / City & Virtual"
}]

const countries=[{
  label: "India",
  value: "india"
 },{
  label: "Japan",
  value: "japan"
 },
 {
  label: "China",
  value: "china"
 },{
 label: "Indonesia",
  value: "indonesia"
 },
 {
  label: "Malaysia",
  value: "malaysia"
 },{
  label: "Thailand",
  value: "thailand"
 },
 {
  label: "Singapore",
  value: "singapore"
 },{
  label: "North Korea",
  value: "north korea"
 },
 {
  label: "Taiwan",
  value: "taiwan"
 },{
  label: "Vietnam",
  value: "vietnam"
 },
 {
  label: "Mongolia",
  value: "mongolia"
 },{
  label: "Myanmar",
  value: "myanmar"
 },
 {
  label: "Bangladesh",
  value: "bangladesh"
 },{
  label: "Sri lanka",
  value: "sri lanka"
 },
 {
  label: "Pakistan",
  value: "pakistan"
 },{
  label: "Oman",
  value: "oman"
 },
 {
  label: "Maldieves",
  value: "maldieves"
 },{
  label: "Uzbekistan",
  value: "uzbekistan"
 },
 {
  label: "Kuwait",
  value: "kuwait"
 },{
  label: "Saudi Arabia",
  value: "saudi arabia"
 }]

const [gradeVal, setGradeVal] = useState([0, 100]);
const [ageVal, setAgeVal] = useState([0, 100]);

const handleGradeVal = (e: SyntheticEvent, data: number[]) => {
  setGradeVal(data);
 
};

const handleAgeVal = (e: SyntheticEvent, data: number[]) => {
  setAgeVal(data);
  
};

const handleMultiOption=(value: {value: {}[]})=>{
  const select_options=value.map((item)=>item.label)
  setStoreOptions(select_options)
   


 }


 const handleResidence=(value: {value: {}[]})=>{
  const residence=value.map((item)=>item.label)
  setStoreResidence(residence)
   
    

 }

 const handleCitizen=(value: {value: {}[]})=>{
  const citizen=value.map((item)=>item.label)
  setStoreCitizen(citizen)
   
    

 }





  const { isModalOpen, onModalClose,selectedData } = useModal();
  const updateActivityMutation = useUpdateActivity(() => {
    onModalClose();
  });

 


  useEffect(()=>{
    
    if(selectedData!=null){
    setAgeVal(selectedData?.age_range)
     setGradeVal(selectedData?.grade_range)
    }
},[selectedData])

   
useEffect(()=>{
  setStoreOptions(selectedData?.application_requirement)
  setStoreCitizen(selectedData?.only_open_to_citizens_of_these_countries)
  setStoreResidence(selectedData?.only_open_to_residence_of_these_countries)
},[])

  

  return (
    <BaseModal
      hasHeader
      showHeaderCloseButton
      isOpen={isModalOpen && isOpen}
      modalWidth="max-w-[90%]"
      title="Update Activity"
      onRequestClose={() => {
        onModalClose();
      }}
    >
   
      <Form<Account>
       
        form={{
        defaultValues: {
            activity_name: selectedData?.activity_name,
            country_citizenship: selectedData?.country_citizenship,
            url: selectedData?.url,
            registration_open: selectedData?.registration_open,
            application_deadline: selectedData?.application_deadline,
            activity_start_date: selectedData?.activity_start_date,
            activity_end_date: selectedData?.activity_end_date,
            remarks: selectedData?.remarks,
            
          }}}
    
          onSubmit={(formData) =>
            updateActivityMutation.mutate({ data: {
              ...formData,
              application_requirement:storeOptions,
              age_range:ageVal,
              grade_range:gradeVal,
              only_open_to_citizens_of_these_countries: storeCitizen,
              only_open_to_residence_of_these_countries: storeResidence,

            },
            id:selectedData?.id })
          }
         
    >
        {({ register }) => (
          <div>
           
            <div className="mx-auto flex h-[70vh] w-full justify-around overflow-y-scroll">
              <div className="h-auto w-[40%]">
                <h1 className="mb-6 text-[1.4rem] font-bold text-[#6F6F6F]">
                  Activity Information
                </h1>
                <div className="mt-2 flex items-center">
                  <span className="text-md font-bold">Name</span>
                  <input
                   className="relative ml-[19.5%] h-[5vh] w-[73%] rounded-md bg-[#EEEE]"
                   
                    {...register("activity_name")}
                    // defaultValue={name!=="Add an activity to the database"?individualActivityInfo?.activity_name: null}
                    
                    type="text"
                  />
                  <br />
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-md font-bold">Type</span>
                  <select
                     className="relative ml-[20.5%] h-[5vh] w-[73%] rounded-md bg-[#EEEE] outline-none"
                    {...register("activity_type")}
                    
                    
                  >
                    <option>Select Type</option>
                    {activityTypeOptions.map((item,index)=><option key={index} 
                    selected={selectedData?.activity_type==item.option}
                    >
                      {item.option}
                    </option>)}
                  </select>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-md font-bold">Subject</span>
                  <select
                    className="relative ml-[17%] h-[5vh] w-[73%] rounded-md bg-[#EEEE] outline-none"
                    {...register("subject")}
                    
                  >
                    <option>Select Subject</option>
                    {subjectOptions.map((item,index)=><option key={index} 
                    selected={selectedData?.subject==item.option}
                    >{item.option}</option>)}
                  </select>
                </div>
                <div className="mt-6 flex items-center">
                  <span className="text-md font-bold">Application requirement</span>
                 
                   <Select 
                  
                  className="relative h-[5vh] w-[85%] rounded-md bg-[#EEEE] outline-none"
                  isMulti 
                  options={applicationOptions} 
                  onChange={handleMultiOption}
                  label="application_requirement"
                  isSearchable={true}
                  defaultValue={selectedData?.application_requirement?.map((item)=>{
                    return {label: item};
                  })}
                  
                  />
                </div>
                <div className="mt-8 flex items-center">
                  <span className="text-md font-bold">Location Type</span>
                  <select
                  className="relative ml-[9%] h-[5vh] w-[73%] rounded-md bg-[#EEEE] outline-none"
                    {...register("location_type")}
                    
                  >
                    <option>Location Type</option>
                    {locationTypeOptions.map((item,index)=><option key={index} 
                    selected={selectedData?.location_type==item.option}
                    >{item.option}</option>)}
                  </select>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-md font-bold">Country of Activity</span>
                  <select
                    className="relative ml-6 h-[5vh] w-[76%] rounded-md bg-[#EEEE] outline-none"
                    {...register("country_residence")}
                    
                  >
                    <option>Select Country</option>
                   
                    {countries.map((item,index)=>
                      <option key={index}  selected={selectedData?.country_residence===item.label} >{item.label}</option>
                    )}
                  </select>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-md font-bold">City of Activity</span>
                  <input
                        className="relative ml-12 h-[5vh] w-[73%] rounded-md bg-[#EEEE]"
                    {...register("country_citizenship")}
                    
                    
                    type="text"
                  />
                  <br />
                </div>
      
                <div className="mt-6 flex items-center">
                  <span className="text-md font-bold">URL</span>
                  <input
                  className="relative ml-[22%] h-[5vh] w-[73%] rounded-md bg-[#EEEE]"
                    {...register("url")}
                    // defaultValue={individualActivityInfo?.url}
                    
                    type="text"
                  />
                  <br />
                </div>
      
                <h1 className="mt-6 mb-4 text-lg text-[1.45rem] font-bold text-[#6F6F6F]">Key Dates</h1>
                <div className="mt-2 flex items-center">
                  <span className="text-md font-bold">Registration open</span>
                  <input
                      className="relative ml-10 h-[5vh] w-[80%] rounded-md bg-[#EEEE]"
                    {...register("registration_open")}
                    // defaultValue={individualActivityInfo?.registration_open}
                    
                    type="date"
                  />
                  <br />
                </div>
      
                <div className="mt-4 mb-5 flex items-center">
                  <span className="text-md font-bold">Application Date</span>
                  <input
                className="relative ml-10 h-[5vh] w-[75%] rounded-md bg-[#EEEE]"
                    {...register("application_deadline")}
                    // defaultValue={moment(individualActivityInfo?.created_at).format("YYYY-MM-DD")}
                    
                    type="date"
                  />
                  <br />
                </div>
      
                <div className="mb-6 flex items-center">
                  <span className="text-md font-bold">Activity Start</span>
                  <input
                   className="relative ml-[10%] h-[5vh] w-[73%] rounded-md bg-[#EEEE]"
                    {...register("activity_start_date")}
                    // defaultValue={individualActivityInfo?.activity_start_date}
                    
                    type="date"
                  />
                  <br />
                </div>
      
                <div className="mb-6 flex items-center">
                  <span className="text-md font-bold">Activity End</span>
                  <input
                    className="relative ml-[12%] h-[5vh] w-[74%] rounded-md bg-[#EEEE]"
                    {...register("activity_end_date")}
                    // defaultValue={individualActivityInfo?.activity_end_date}
                    
                    type="date"
                  />
                  <br />
                </div>
              </div>
              <div className="h-auto w-[45%] border-l-2 border-l-cyan-400 pl-12">
                <h1 className="mb-6 text-[1.4rem] font-bold text-[#6F6F6F]">
                  Eligibility Restrictions
                </h1>
                <div className="mt-2 flex items-center">
                  <span className="text-md font-bold">Range Type</span>
                  <select
                    className="relative left-16 h-[5vh] w-[40%] rounded-md bg-[#EEEE] outline-none"
                    {...register("range_type")}
                    
                  >
                    <option>Select range type</option>
                    <option>Grade range</option>
                    <option>Age range </option>
                  </select>
                </div>
      
                <div className="mt-4 flex w-[100%] items-center justify-between">
                  <span className="text-md font-bold">Grade Range</span>
                  {/* <div className="flex justify-around items-center w-[40%] ml-14">
                     <input className="bg-[#EEEE] rounded-md w-[35%] h-[5vh] relative" name="name" type="text"/><br />
                       <hr className="h-[0.8vh] w-[2vw] bg-black ml-2"/>
                       <input className="bg-[#EEEE] rounded-md w-[35%] h-[5vh] relative ml-3" name="name" type="text"/><br />
                     </div> */}
                  <input {...register("grade_low")} className="w-[8%] h-[3vh] relative left-[4%]" type="text" value={gradeVal[0]} />
                  <div className="w-[50%]">
                    <Slider className="mt-2" value={gradeVal} onChange={handleGradeVal}  />
                  </div>
      
                  <input {...register("grade_high")} className="w-[8%] h-[3vh]" type="text" value={gradeVal[1]} />
                </div>
      
                <div className="mt-4 flex w-[100%] items-center justify-between">
                  <span className="text-md font-bold">Age Range</span>
                  {/* <div className="flex justify-around items-center w-[40%] ml-[4.6vw]">
                      <input className="bg-[#EEEE] rounded-md w-[35%] h-[5vh] relative" name="name" type="text"/><br />
                      <hr className="h-[0.8vh] w-[2vw] bg-black ml-2"/>
                      <input className="bg-[#EEEE] rounded-md w-[35%] h-[5vh] relative ml-3" name="name" type="text"/><br />
                    </div> */}
      
                  <input className="w-[8%] relative left-[6%]" type="text" {...register("age_low")} value={ageVal[0]} />
      
                  <div className="w-[50%]">
                    <Slider className="mt-2 relative left-[2%]" value={ageVal} onChange={handleAgeVal} />
                  </div>
      
                  <input {...register("age_high")} className="w-[8%] relative" type="text" value={ageVal[1]} />
                </div>
                <div className="text-md mt-5 flex w-[60%] flex-col">
                  <p className="text-md font-bold font-bold ">
                    Only open to residence of these countries
                  </p>
                
                   
                   
                    <Select 
                  
                  className="text-small font-small block mt-4 h-auto w-[100%] rounded-md"
                  isMulti 
                  options={countries} 
                  onChange={handleResidence}
                  label="only_open_to_residence_of_these_countries"
                  isSearchable={true}
                  defaultValue={selectedData?.only_open_to_residence_of_these_countries?.map((item)=>{
                    return {label: item};
                  
                  }
                  )}
                  
                  />
                
                </div>
                <div className="text-md mt-5 flex w-[60%] flex-col">
                  <p className="text-md font-bold font-bold ">
                    Only open to citizens of these countries
                  </p>
                  <Select 
                  
                  className="text-small font-small block mt-4 h-auto w-[100%] rounded-md"
                  isMulti 
                  options={countries} 
                  onChange={handleCitizen}
                  label="only_open_to_citizens_of_these_countries"
                  isSearchable={true}
                  defaultValue={selectedData?.only_open_to_citizens_of_these_countries?.map((item)=>{
                    return {label: item};
                  
                  }
                  )} 
                  />
                </div>
                <div className="mt-14">
                  <h1 className="text-lg text-[1.45rem] font-bold text-[#6F6F6F]">Remarks</h1>
                  <textarea className="mt-5 h-[15vh] w-[70%] bg-[#EEEE]" {...register("remarks")} 
                  
                    
                  />
                </div>
      
                <div className="mt-10 mb-10 flex items-center">
                  <span className="text-md font-bold">Last Update Date</span>
                  <input
                    className="relative ml-10 h-[5vh] w-[83%] rounded-md bg-[#EEEE]"
                    value={formatDate(selectedData?.updated_at)}
                    disabled
                    type="text"
                    
                  />
                  <br />
                </div>
              </div>
              
            </div>
            <div className="mx-auto mt-6 mb-6 flex justify-center">
              <Button
                isLoading={updateActivityMutation.isLoading}
                type="submit"
                width="w-[15%]"
                >
                Submit
              </Button>
            </div>
          </div>
          )}
      </Form>
 
    </BaseModal>
  );
}
