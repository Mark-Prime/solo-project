import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './TeamPage.css'

// Components
import TeamManager from '../TeamManager/TeamManager'
import TeamStats from '../TeamStats/TeamStats'


// Ant Design
import {
  Row,
  Col,
  Tabs,
  Table,
  Avatar,
  Tag,
  Button,
  Popconfirm,
  Space,
  Tooltip,
  BackTop,
} from "antd";
import {
  CheckCircleTwoTone,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;

class PlayerPage extends Component {
  state = {
    isLeader: false,
    isMember: false,
    ID: this.props.match.params.id,
    member: this.props.member,
    teamName: "",
    teamTag: "",
    teamLink: ""
  };

  componentDidMount() {
    this.refreshInformation();
  }

  resetLeadership = () => {
    this.setState({
      isLeader: false,
    });
  };

  refreshInformation = () => {
    this.props.dispatch({ type: "SET_TEAMS", payload: [] });
    this.props.dispatch({ type: "SET_PLAYERS", payload: [] });
    this.props.dispatch({
      type: "FETCH_TEAM",
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: "FETCH_MEMBERS",
      payload: this.props.match.params.id,
    });
    this.props.dispatch({ type: "UNSET_LOGS" });
    this.props.dispatch({
      type: "FETCH_TEAM_LOGS",
      payload: this.props.match.params.id,
    });
  };

  componentDidUpdate() {
    if (this.state.ID !== this.props.match.params.id) {
      if (this.state.isLeader) {
        this.setState({ isLeader: false });
      }
      this.setState({ ID: this.props.match.params.id });
      this.refreshInformation();
    }
    if (this.props.team[0]) {
      if (this.props.team[0].name !== this.state.teamName) {
        this.setState({
          teamName: this.props.team[0].name,
          teamTag: this.props.team[0].tag,
          teamLink: this.props.team[0].team_page,
        });
      }
    }
    if (this.props.user[0]) {
      if (this.state.member !== this.props.member) {
        for (const index of this.props.member) {
          if (index.user_id === this.props.user[0].id) {
            if (index.is_leader) {
              this.setState({ isLeader: true });
            }
            this.setState({ isMember: true });
          }
        }
        this.setState({ member: this.props.member });
      }
    }
  }

  leaveTeam = () => {
    this.props.dispatch({
      type: "REMOVE_MEMBER",
      payload: { id: this.props.user[0].id, team: this.props.team[0].trueid },
    });
    this.setState({
      isLeader: false,
      isMember: false,
    });
  };

  joinTeam = () => {
    this.props.dispatch({
      type: "JOIN_TEAM",
      payload: { id: this.props.user[0].id, team: this.props.team[0].trueid },
    });
    this.setState({
      isMember: true,
    });
  };

  saveName = (value) => {
    this.props.dispatch({
      type: "SAVE_TEAM_NAME",
      payload: { newName: value, id: this.props.team[0].trueid },
    });
    this.setState({ teamName: value });
    this.refreshInformation();
  };

  saveTag = (value) => {
    this.props.dispatch({
      type: "SAVE_TEAM_TAG",
      payload: { newTag: value, id: this.props.team[0].trueid },
    });
    this.setState({ teamTag: value });
    this.refreshInformation();
  };

  saveLink = (value) => {

    if (
      value.includes("rgl.gg/Public/Team.aspx?t=") ||
      value.includes("ugcleague.com/team_page.cfm?clan_id=") ||
      value.includes("etf2l.org/teams/") ||
      value.includes("ozfortress.com/teams/") ||
      value.includes("match.tf/teams/") ||
      value.includes("rsl.tf/teams/") ||
      value.includes("asiafortress.com")
    ) {
      this.props.dispatch({
        type: "SAVE_TEAM_LINK",
        payload: { newTag: value, id: this.props.team[0].trueid },
      });
      this.setState({ teamLink: value });
    } 
    this.refreshInformation();
  };

  render() {
    const style = {
      height: 40,
      width: 40,
      lineHeight: "40px",
      borderRadius: 4,
      backgroundColor: "#1087e990",
      color: "#fff",
      textAlign: "center",
      fontSize: 35,
    };

    let matchLogs = this.props.log.filter((log) => {
      return log.Match;
    });

    let scrimLogs = this.props.log.filter((log) => {
      return !log.Match;
    });

    return (
      <div>
        <BackTop>
          <div style={style}>
            <VerticalAlignTopOutlined />
          </div>
        </BackTop>
        {this.props.team[0] ? (
          <>
            <Row>
              <Col span={24}>
                {this.props.team[0].active ? (
                  <h1 id="welcome" className="team-name">
                    {this.props.team[0].team_page ? (
                      <a href={this.props.team[0].team_page}>
                        {this.state.teamName}
                      </a>
                    ) : (
                      <>{this.state.teamName}</>
                    )}
                  </h1>
                ) : (
                  <span className="strike">
                    <h1 id="welcome" className="team-name">
                      {this.props.team[0].team_page ? (
                        <a href={this.props.team[0].team_page}>
                          {this.state.teamName}
                        </a>
                      ) : (
                        <>{this.state.teamName}</>
                      )}
                    </h1>
                  </span>
                )}
                <h3 id="welcome" className="team-name">
                  {this.props.team[0].title}
                </h3>
                <h3 id="welcome" className="team-name">
                  {this.state.teamTag}
                </h3>
              </Col>
            </Row>
            <div className="tab-container">
              <Tabs defaultActiveKey="1" type="card" size="large">
                <TabPane tab="Players" key="1">
                  <Table
                    columns={[
                      {
                        title: "Name",
                        dataIndex: "displayname",
                        key: "displayname",
                        render: (text, record) => (
                          <a href={`/#/player/${record.user_id}`}>
                            <Space size="small">
                              <Avatar
                                className="avatar"
                                shape="square"
                                src={record.avatar}
                              />
                              {record.donator ? (
                                <div className="donatorName">
                                  {text}
                                </div>
                              ) : (
                                <>{text}</>
                              )}
                              {record.verified && (
                                <Tooltip title="Verified!">
                                  <CheckCircleTwoTone />
                                </Tooltip>
                              )}
                            </Space>
                          </a>
                        ),
                      },
                      {
                        title: "Class",
                        dataIndex: "class_name",
                        key: "class_name",
                      },
                      {
                        title: "",
                        key: "is_leader",
                        dataIndex: "is_leader",
                        render: (leader, record) => (
                          <span>
                            {leader && (
                              <Tag
                                color={"orange"}
                                key={`${record.user_id}_LEADER`}
                              >
                                LEADER
                              </Tag>
                            )}
                            {record.main ? (
                              <Tag
                                color={"blue"}
                                key={`${record.user_id}_MAIN`}
                              >
                                MAIN
                              </Tag>
                            ) : (
                              <Tag color={"cyan"} key={`${record.user_id}_SUB`}>
                                SUB
                              </Tag>
                            )}
                          </span>
                        ),
                      },
                    ]}
                    dataSource={this.props.member}
                    rowKey={(record) => record.user_id}
                  />
                  {this.props.user[0] && (
                    <>
                      {this.state.isMember ? (
                        <Popconfirm
                          title={`Leave ${this.props.team[0].name}?`}
                          onConfirm={this.leaveTeam}
                          okText="Yes, Leave"
                          cancelText="No"
                        >
                          <Button type="primary" danger>
                            Leave Team
                          </Button>
                        </Popconfirm>
                      ) : (
                        <>
                          {this.props.team[0].active && (
                            <Popconfirm
                              title={`Join ${this.props.team[0].name}?`}
                              onConfirm={this.joinTeam}
                              okText="Yes, Join"
                              cancelText="No"
                            >
                              <Button type="primary">Join Team</Button>
                            </Popconfirm>
                          )}
                        </>
                      )}
                    </>
                  )}
                </TabPane>
                {matchLogs[0] && (
                  <TabPane
                    tab="Match Stats"
                    key="2"
                    style={{ overflow: "visible" }}
                  >
                    <TeamStats logs={matchLogs} />
                  </TabPane>
                )}
                {scrimLogs[0] && (
                  <TabPane
                    tab="Scrim Stats"
                    key="3"
                    style={{ overflow: "visible" }}
                  >
                    <TeamStats logs={scrimLogs} />
                  </TabPane>
                )}
                {this.props.log[0] && (
                  <TabPane
                    tab="All Stats"
                    key="4"
                    style={{ overflow: "visible" }}
                  >
                    <TeamStats logs={this.props.log} />
                  </TabPane>
                )}
                {this.state.isLeader && (
                  <TabPane tab="Manage" key="5">
                    <TeamManager
                      saveName={this.saveName}
                      saveTag={this.saveTag}
                      saveLink={this.saveLink}
                      resetLeadership={this.resetLeadership}
                      refreshInformation={this.refreshInformation}
                    />
                  </TabPane>
                )}
              </Tabs>
            </div>
          </>
        ) : (
          <p>Team not found</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ team, user, member, log }) => ({ team, user, member, log });

export default connect(mapStateToProps)(PlayerPage);
