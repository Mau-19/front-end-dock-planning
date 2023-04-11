import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DateTime } from "luxon";

import { OrderOverviewCard } from "./OrderOverviewCard";
import { EmptyCard } from "./EmptyCard";

import { Timeslot } from "../../../types/Timeslot";
import { TimeslotByDay } from "../../../types/Timeslot";
import { daysOfTheWeek } from "../../../../SampleData";

interface Props {
  timeslots: Timeslot[];
  timeslotsByDay: TimeslotByDay;
}

export const OrderOverview: React.FC<Props> = ({ timeslots }) => {
  const sample: TimeslotByDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };
  const [timeslotsByDay, setTimeslotsByDay] = useState<TimeslotByDay>(sample);

  useEffect(() => {
    groupTimeslotsByWeekDay(timeslots);
  }, [timeslots]);

  const groupTimeslotsByWeekDay = (timeslots: Timeslot[]) => {
    timeslots?.forEach((timeslot) => {
      const startTime = DateTime.fromISO(timeslot.start_time);
      const dayOfWeek = startTime.toFormat("EEEE");

      if (dayOfWeek in sample) {
        sample[dayOfWeek].push(timeslot);
      }
    });
    setTimeslotsByDay(sample);
  };

  return (
    <>
      <Container
        fluid
        style={{
          display: "flex",
          flexDirection: "column",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {timeslots?.length > 0 ? (
          daysOfTheWeek.map((day, index) => (
            <Row key={index}>
              <Col>
                {timeslotsByDay[day]?.length === 0 ? (
                  <EmptyCard />
                ) : (
                  timeslotsByDay[day]?.map((timeslot) => (
                    <OrderOverviewCard timeslot={timeslot} key={timeslot.id} />
                  ))
                )}
              </Col>
            </Row>
          ))
        ) : (
          <h1>There are no reservations!</h1>
        )}
      </Container>
    </>
  );
};
