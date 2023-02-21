import React, { useEffect, useState } from "react";
// import Img from "gatsby-image";
import { css } from "@emotion/react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { closestIndexTo } from "date-fns";
import {
  PageFieldsFragment,
  TeamMemberFieldsFragment,
  RankingFieldsFragment,
  BlogPostPreviewFieldsFragment,
} from "../../../graphql-types";
import BaseSection from "../sections/BaseSection";
import { Tabs, TabPane } from "../../styles/Tabs";
import { Table } from "../../styles/Table";
import ContactSection from "../sections/ContactSection";
import H2 from "../h2/H2";
import FeatureImg from "../featureImg/FeatureImg";
import { colors } from "../../styles/variables";
import BlogPostListContainer from "../blogPostPreview/BlogPostListContainer";
import { EventType } from "../../queries/useEvents";
import { getDateFromCalendarDateDetails } from "../../utils/dateUtils";
import { useJuniorEvents } from "../../queries/useJuniorEvents";

const renderNullAsZero = (maybeNull: string | null) => maybeNull ?? "0";

const TemplateTeam: React.FC<{ data: PageFieldsFragment; posts: Array<BlogPostPreviewFieldsFragment> }> = ({
  data,
  posts,
}) => {
  const featureImg = data.pageACF?.teamContent?.teamPicture;

  const teamContent = data.pageACF?.teamContent;
  const [nextUp, setNextUp] = useState<EventType>();
  const { data: allEvents, isLoading: eventsLoading } = useJuniorEvents(data.pageACF?.division ?? "verein");

  const { events, futureEvents } = allEvents ?? { events: [], futureEvents: [] };

  useEffect(() => {
    setNextUp(
      futureEvents[
        closestIndexTo(
          new Date(),
          futureEvents.map((event) => getDateFromCalendarDateDetails(event.start_date_details)),
        )
      ],
    );
  }, [eventsLoading, futureEvents]);

  if (teamContent === undefined || teamContent == null) {
    return null;
  }

  const { team, ranking, showTable } = teamContent;

  return (
    <>
      <FeatureImg
        img={featureImg?.localFile?.childImageSharp ?? undefined}
        alt={featureImg?.altText ?? "Default Alt"}
        title={featureImg?.title ?? "Default Title"}
      />
      <div
        css={css`
          grid-column: 1 / -1;
          min-height: 50vh;
          max-width: 100%;
        `}
      >
        <Tabs defaultActiveKey="1">
          {posts.length > 0 && (
            <TabPane tab="News" key="0">
              <BlogPostListContainer posts={posts} />
            </TabPane>
          )}
          <TabPane tab="Mannschaft" key="1">
            <BaseSection size="small" row={1}>
              <ContactSection
                coach={team?.contact?.coach}
                assistant={team?.contact?.assistant}
                manager={team?.contact?.manager}
                email={team?.contact?.email}
                telephone={team?.contact?.telephone}
              />
            </BaseSection>
            <BaseSection
              size="big"
              row={1}
              css={css`
                max-width: 100%;
              `}
            >
              <Table<TeamMemberFieldsFragment>
                pagination={false}
                size="small"
                dataSource={(team?.teamMembers ?? []) as Array<TeamMemberFieldsFragment>}
                rowKey="name"
                locale={{ emptyText: "Keine Spieler gefunden, willst du mitmachen?" }}
                columns={[
                  {
                    title: "Pos.",
                    dataIndex: "pos",
                    render: (value: string) => {
                      switch (value) {
                        case "goalie":
                          return "T";
                        case "offense":
                          return "S";
                        case "defense":
                          return "V";
                        default:
                          return "S";
                      }
                    },
                  },
                  {
                    title: "Nr.",
                    dataIndex: "number",
                  },
                  {
                    title: "Name",
                    dataIndex: "name",
                  },
                ]}
              />
            </BaseSection>
          </TabPane>
          <TabPane tab="Spielplan" key="2">
            <BaseSection size="small" row={1}>
              <H2 title="Nächstes Spiel" />
              {!eventsLoading && nextUp ? (
                <div
                  css={css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <div>
                    <strong>
                      {getDateFromCalendarDateDetails(nextUp.start_date_details).toLocaleString(["de-DE"], {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      &nbsp;Uhr
                    </strong>
                    <br />
                    {/* eslint-disable-next-line react/no-danger */}
                    <span dangerouslySetInnerHTML={{ __html: nextUp.title }} />
                  </div>
                </div>
              ) : (
                "Diese Mannschaft spielt in der nächsten Zeit nicht."
              )}
            </BaseSection>
            <BaseSection
              size="big"
              row={1}
              css={css`
                max-width: 100%;
              `}
            >
              {eventsLoading ? (
                <div
                  css={css`
                    width: 100%;
                    text-align: center;
                  `}
                >
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: colors.gold }} spin />} />
                </div>
              ) : (
                <Table
                  pagination={false}
                  size="small"
                  dataSource={events}
                  rowKey="title"
                  locale={{ emptyText: "Keine Spiele geplant" }}
                  columns={[
                    {
                      title: "Datum",
                      key: "Datum",
                      dataIndex: "start_date_details",
                      render: (date) => {
                        return <span>{getDateFromCalendarDateDetails(date).toLocaleDateString(["de-DE"])}</span>;
                      },
                    },
                    {
                      title: "Uhrzeit",
                      key: "Uhrzeit",
                      dataIndex: "start_date_details",
                      render: (date) => {
                        return (
                          <span>
                            {getDateFromCalendarDateDetails(date).toLocaleTimeString(["de-DE"], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            &nbsp;Uhr
                          </span>
                        );
                      },
                    },
                    {
                      title: "Spiel",
                      key: "Spiel",
                      dataIndex: "title",
                      // eslint-disable-next-line react/no-danger
                      render: (title) => <span dangerouslySetInnerHTML={{ __html: title }} />,
                    },
                  ]}
                />
              )}
            </BaseSection>
          </TabPane>
          {showTable && (
            <TabPane tab="Tabelle" key="3">
              <BaseSection
                size="full"
                row={1}
                css={css`
                  max-width: 100%;
                `}
              >
                <Table<RankingFieldsFragment>
                  pagination={false}
                  size="small"
                  dataSource={(ranking ?? []) as Array<RankingFieldsFragment>}
                  rowKey="team"
                  scroll={{ x: true }}
                  locale={{
                    emptyText: "Keine Daten gefunden",
                  }}
                  columns={[
                    { title: "Platz", render: (_: unknown, __: unknown, index) => index + 1 },
                    {
                      title: "Mannschaft",
                      dataIndex: "team",
                      render: (team: string) => (
                        <span
                          css={css`
                            white-space: nowrap;
                          `}
                        >
                          {team}
                        </span>
                      ),
                    },
                    {
                      title: "Spiele",
                      dataIndex: "gamesAmount",
                      render: renderNullAsZero,
                      ellipsis: true,
                    },
                    {
                      title: "Siege",
                      dataIndex: "wins",
                      render: renderNullAsZero,
                      ellipsis: true,
                    },

                    {
                      title: "Unent.",
                      dataIndex: "draws",
                      render: renderNullAsZero,
                      ellipsis: true,
                    },
                    {
                      title: "Niederlagen",
                      dataIndex: "defeats",
                      render: renderNullAsZero,
                      ellipsis: true,
                    },
                    {
                      title: "Tore",
                      dataIndex: "goals",
                      render: (_: unknown, item) => {
                        return (
                          <span
                            css={css`
                              white-space: nowrap;
                            `}
                          >{`${item.goals ?? "0"} : ${item.goalsAgainst ?? "0"}`}</span>
                        );
                      },
                    },

                    {
                      title: "Diff",
                      ellipsis: true,
                      render: (_: unknown, item) => {
                        const diff = (item.goals ?? 0) - (item.goalsAgainst ?? 0);

                        return <span>{diff}</span>;
                      },
                    },
                    {
                      title: "Punkte",
                      dataIndex: "points",
                      render: renderNullAsZero,
                      ellipsis: true,
                    },
                  ]}
                />
              </BaseSection>
            </TabPane>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default TemplateTeam;
