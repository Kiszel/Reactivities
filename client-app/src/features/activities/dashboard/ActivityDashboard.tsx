import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/layout/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface IActivityDashboard{
    activities:IActivity[];
    selectActivity: (id:string)=>void;
    selectedActivity: IActivity | null;
    setEditMode:(editMode:boolean)=>void;
    editMode:boolean;
    setSelectedActivity:(activity:IActivity|null)=>void;
    editActivity:(activity:IActivity)=>void;
    createActivity:(activity:IActivity)=>void;
    deleteActivity:(id:string)=>void;
}

export const ActivityDashboard:React.FC<IActivityDashboard> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity}) => {
    return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedActivity&& !editMode && 
                    <ActivityDetails 
                        setSelectedActivity={setSelectedActivity}
                        setEditMode={setEditMode} 
                        selectedActivity={selectedActivity!}
                        />}
                    {editMode && 
                    <ActivityForm
                        key={selectedActivity && selectedActivity.id || 0}
                        selectedActivity={selectedActivity!} 
                        setEditMode={setEditMode}
                        createActivity={createActivity}
                        editActivity={editActivity}
                    />}
                </Grid.Column>
            </Grid>
    )
}
