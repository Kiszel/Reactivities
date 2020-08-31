import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "./models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";



const App =()=> {
  const [activities, setActivities]=useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity]=useState<IActivity | null>(null);

  const [editMode, setEditMode]=useState(false);

  const handleSelectActivity=(id:string)=>{
    setSelectedActivity(activities.filter(a=>a.id===id)[0])
    setEditMode(false);
  }

  const handleOpenCreateForm =()=>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  useEffect(()=>{
    axios
    .get<IActivity[]>("http://localhost:5000/api/activities")
    .then((response) => {
      let activities:IActivity[] = [];
      response.data.forEach(activity=>{
        activity.date= activity.date.split('.')[0]
        activities.push(activity);
      })
           setActivities(activities);
         });
  },[])

  const handleCreateActivity=(activity: IActivity)=>{
    setActivities([...activities,activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }
  const handleEditActivtiy=(activity: IActivity)=>{
    setActivities([...activities.filter(a=>a.id!==activity.id),activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }
  const handleDelete=(id:string)=>{
    setActivities([...activities.filter(a=>a.id!==id)])
  }

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivtiy}
          deleteActivity={handleDelete}
          />
      </Container>
    </>
  );
}


export default App;
