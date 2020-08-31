import React,{useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/layout/models/activity'
import {v4 as uuid} from 'uuid';

interface IActivityForm{
    setEditMode:(editMode:boolean)=>void;
    selectedActivity: IActivity;
    editActivity:(activity:IActivity)=>void;
    createActivity:(activity:IActivity)=>void;
}

export const ActivityForm:React.FC<IActivityForm> = ({
    setEditMode,
    selectedActivity,
    createActivity,
    editActivity}) => {
    
    const initializeForm = ()=>{
        if(selectedActivity){
            return selectedActivity;
        }else{
            return{
                id:"",
                title: "",
                category: "",
                description: "",
                date: "",
                city: "",
                venue: ""
            }
        }
    }
    const [activity,setAcitvity]=useState<IActivity>(initializeForm);

    const handleInputChange=(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value}=event.currentTarget;
        setAcitvity({...activity, [name]: value})
    }

    const handleSubmit =()=>{
        if(activity.id.length===0){
           let newActivity={
               ...activity,
               id: uuid()
           }
           createActivity(newActivity)
        }else{
            editActivity(activity)
        }
    }

    return (
        <div>
            <Segment clearing>
                <Form onSubmit={handleSubmit}>
                    <Form.Input onChange={handleInputChange} name="title" placeholder="Title" value={activity.title}/>
                    <Form.TextArea onChange={handleInputChange} rows={2} placeholder="Description"  name="description" value={activity.description}/>
                    <Form.Input onChange={handleInputChange} placeholder="Category"  name="category" value={activity.category}/>
                    <Form.Input onChange={handleInputChange} type="datetime-local" placeholder="Date"  name="date" value={activity.date}/>
                    <Form.Input onChange={handleInputChange} placeholder="City"  name="city" value={activity.city}/>
                    <Form.Input onChange={handleInputChange} placeholder="Venue" name="venue" value={activity.venue}/>
                    <Button floated='right' positivie type="submit" content="Submit" />
                    <Button onClick={()=>setEditMode(false)} floated='right' type="button" content="Cancel" />
                </Form>
            </Segment>
        </div>
    )
}
