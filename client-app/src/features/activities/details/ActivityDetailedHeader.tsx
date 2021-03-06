import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const activityImageStyle = {
  filter: "brightness(30%)",
};
const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
interface IActivityDetailedHeader {
  activity: IActivity;
}

const ActivityDetailedHeader: React.FC<IActivityDetailedHeader> = ({
  activity,
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          style={activityImageStyle}
          src={`/assets/Images/categoryImages/${activity.category}.jpg`}
          fluid
        />
        <Segment  basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date,"eeee do MMMM")}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal"> Join Activity</Button>
        <Button> Cancel Activity</Button>
        <Button  as={Link} to={`/manage/${activity.id}`}color="orange" floated="right">
          Manage Activity
        </Button>
      </Segment>
    </Segment.Group>
  );
};
export default observer(ActivityDetailedHeader);
