import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  ActivityFormValues
} from "../../../app/layout/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/api/stores/ActivitityStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/Form/TextInput";
import { TextAreInput } from "../../../app/common/Form/TextAreInput";
import { SelectInput } from "../../../app/common/Form/SelectInput";
import { category } from "../../../app/common/options/CategoryOptions";
import { DateInput } from "../../../app/common/Form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/Util";
import {
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  composeValidators,
} from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "The event is require title" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  ),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
  Time: isRequired("Time"),
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    submitting,
    createActivity,
    editActivity,
    loadActivity,
  } = activityStore;

  const [activity, setAcitvity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => {
          console.log(activity);
          setAcitvity(new ActivityFormValues(activity));
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;

    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };
  console.log(activity);
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  placeholder="Description"
                  name="description"
                  value={activity.description}
                  component={TextAreInput}
                  rows={3}
                />
                <Field
                  placeholder="Category"
                  name="category"
                  value={activity.category}
                  options={category}
                  component={SelectInput}
                />
                <Form.Group widths={"equal"}>
                  <Field
                    placeholder="Date"
                    name="date"
                    value={activity.date}
                    component={DateInput}
                    date={true}
                  />
                  <Field
                    placeholder="Time"
                    name="time"
                    value={activity.time}
                    component={DateInput}
                    time={true}
                  />
                </Form.Group>
                <Field
                  placeholder="City"
                  name="city"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  placeholder="Venue"
                  name="venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positivie
                  type="submit"
                  content="Submit"
                  disabled={loading || invalid || pristine}
                />
                <Button
                  disabled={loading}
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
