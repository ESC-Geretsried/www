import React, { useState } from "react";
import { css } from "@emotion/react";
import { Collapse } from "antd";
import { colors, mq } from "../../styles/variables";
import Button from "../button/Button";
import { EventType } from "../../queries/useEvents";
import { getDateFromCalendarDateDetails } from "../../utils/dateUtils";

const EventList: React.FC<{
  events: Array<EventType>;
  isWeekdayList?: boolean;
  className?: string;
}> = ({ events, isWeekdayList = false, ...rest }) => {
  const [count, setCount] = useState(5);
  const loadMore = () => {
    setCount(count + 5);
  };

  return (
    <>
      <Collapse
        accordion
        bordered={false}
        css={css`
          background-color: transparent;
          .ant-collapse > .ant-collapse-item > .ant-collapse-header {
            color: ${colors.white};
          }
        `}
      >
        {[...events].slice(0, count).map((item) => (
          <Collapse.Panel
            collapsible={
              item.venue.city === undefined || item.venue.address === undefined || item.venue.zip === undefined
                ? "disabled"
                : undefined
            }
            css={css`
              background-color: transparent;
              &&&.ant-collapse-item {
                border: none;
              }
              &&& .ant-collapse-header {
                padding-right: 0;
                padding-left: 0;
              }
              &&& .ant-collapse-content-box {
                padding: 0;
                padding-bottom: 1em;
                color: ${colors.white};
              }
            `}
            showArrow={false}
            key={item.title}
            header={
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  color: white;
                `}
              >
                <div
                  css={css`
                    max-width: 75%;
                  `}
                >
                  <strong
                    css={css`
                      max-width: 50%;
                      ${mq[0]} {
                        max-width: inherit;
                      }
                    `}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  {item.venue.city && <span>{` in ${item.venue.city}`}</span>}
                </div>
                <span>
                  {getDateFromCalendarDateDetails(item.start_date_details).toLocaleString(["de-DE"], {
                    month: isWeekdayList ? "numeric" : undefined,
                    day: isWeekdayList ? "numeric" : undefined,
                    year: isWeekdayList ? "2-digit" : undefined,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  &nbsp;Uhr
                </span>
              </div>
            }
          >
            <span>{item.venue.address}</span>
            <br />
            <span>{item.venue.zip},&nbsp;</span>
            <span>{item.venue.city}</span>
            <br />
          </Collapse.Panel>
        ))}
      </Collapse>
      {count < events.length && (
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: center;
            padding-top: 1em;
          `}
        >
          <Button onClick={loadMore}>mehr</Button>
        </div>
      )}
    </>
  );
};

export default EventList;
// .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
