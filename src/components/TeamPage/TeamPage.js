import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './TeamPage.css'


// Ant Design
import { Row, Col, Tabs, Table, Avatar, Tag } from 'antd';
const { TabPane } = Tabs;

class PlayerPage extends Component {
    state = {
        isLeader: false
    }

    componentDidMount() {
        console.log('ID:', this.props.match.params.id);
        this.props.dispatch({ type: 'FETCH_TEAM', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_MEMBERS', payload: this.props.match.params.id })

    }

    render() {
        return (
            <div>
                {this.props.team[0] ?
                    <>
                        <Row>
                            <Col span={24}>
                                {this.props.team.active ? 
                                <h1 id="welcome" className="team-name">
                                    {this.props.team[0].name}
                                </h1> :
                                <span className="strike">
                                    <h1 id="welcome" className="team-name">
                                        {this.props.team[0].name}
                                    </h1>
                                </span>
                                }
                                
                                <h3 id="welcome" className="team-name">
                                    {this.props.team[0].tag}
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <Tabs defaultActiveKey="1" type="card" size="large">
                                    <TabPane tab="Players" key="1">
                                        <Table columns={[
                                            {
                                                title: '',
                                                dataIndex: 'avatar',
                                                key: 'avatar',
                                                render: text => <Avatar className="avatar" shape="square" src={text} />
                                            },
                                            {
                                                title: 'Name',
                                                dataIndex: 'displayname',
                                                key: 'displayname',
                                                render: (text, record) => <a href={`/#/player/${record.user_id}`}>{text}</a>
                                            },
                                            {
                                                title: 'Class',
                                                dataIndex: 'class_name',
                                                key: 'class_name'
                                            },
                                            {
                                                title: '',
                                                key: 'is_leader',
                                                dataIndex: 'is_leader',
                                                render: (leader, record) => (
                                                    <span>
                                                        {leader &&
                                                            <Tag color={"orange"} key={leader}>
                                                                LEADER
                                                            </Tag>
                                                        }
                                                        {record.main ?
                                                            <Tag color={"blue"} key={record.main}>
                                                                MAIN
                                                            </Tag> :
                                                            <Tag color={"cyan"} key={record.main}>
                                                                SUB
                                                            </Tag>
                                                        }
                                                    </span>
                                                ),
                                            },
                                            {
                                                title: 'Join Date',
                                                dataIndex: 'join_date',
                                                key: 'join_date',
                                                render: text => <>{text && <>{text.split('T')[0]}</>}</>
                                            },
                                            {
                                                title: 'Leave Date',
                                                dataIndex: 'leave_date',
                                                key: 'leave_date',
                                                render: text => <>{text && <>{ text.split('T')[0]}</>}</>
                                            }
                                        ]} dataSource={this.props.member} />
                                    </TabPane>
                                    <TabPane tab="Stats" key="2">
                                        STATS
                                        {JSON.stringify(this.props.member)}
                                    </TabPane>
                                    {this.state.isLeader &&
                                        <TabPane tab="Manage" key="3">
                                            MANAGEMENT TOOLS
                                        </TabPane>
                                    }
                                    
                                </Tabs>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </> :
                    <p>User not found</p>
                }
                
                
            </div>
        );
    }
}

const mapStateToProps = ({ team, user, member }) => ({ team, user, member });

export default connect(mapStateToProps)(PlayerPage);