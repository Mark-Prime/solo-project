import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './TeamPage.css'

// Components
import TeamManager from '../TeamManager/TeamManager'

// Ant Design
import { Row, Col, Tabs, Table, Avatar, Tag } from 'antd';
const { TabPane } = Tabs;

class PlayerPage extends Component {
    state = {
        isLeader: false,
        ID: this.props.match.params.id,
        member: this.props.member
    }

    componentDidMount() {
        console.log('ID:', this.props.match.params.id);
        this.refreshInformation()
    }

    refreshInformation = () => {
        this.props.dispatch({ type: 'FETCH_TEAM', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_MEMBERS', payload: this.props.match.params.id })
    }

    componentDidUpdate() {
        console.log('UPDATE');
        if (this.state.ID !== this.props.match.params.id) {
            if (this.state.isLeader) {
                this.setState({ isLeader: false })
            }
            this.setState({ ID: this.props.match.params.id })
            this.refreshInformation()
        }
        if (this.props.user[0]){
            if (this.state.member !== this.props.member) {
                for (const index of this.props.member) {
                    console.log('index:', index.is_leader);

                    if (index.is_leader && index.user_id === this.props.user[0].id) {
                        console.log('LEADER');
                        this.setState({ isLeader: true })
                    }
                }
                this.setState({ member: this.props.member })
            }
        }
        
    }

    render() {
        return (
            <div>
                {this.props.team[0] ?
                    <>
                        <Row>
                            <Col span={24}>
                                {this.props.team[0].active ? 
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
                                    {this.props.team[0].title}
                                </h3>
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
                                                title: 'Name',
                                                dataIndex: 'displayname',
                                                key: 'displayname',
                                                render: (text, record) => <a href={`/#/player/${record.user_id}`}><Avatar className="avatar" shape="square" src={record.avatar} />   {text}</a>
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
                                                            <Tag color={"orange"} key={`${record.user_id}_LEADER`}>
                                                                LEADER
                                                            </Tag>
                                                        }
                                                        {record.main ?
                                                            <Tag color={"blue"} key={`${record.user_id}_MAIN`}>
                                                                MAIN
                                                            </Tag> :
                                                            <Tag color={"cyan"} key={`${record.user_id}_SUB`}>
                                                                SUB
                                                            </Tag>
                                                        }
                                                    </span>
                                                ),
                                            }
                                        ]} dataSource={this.props.member} />
                                    </TabPane>
                                    <TabPane tab="Stats" key="2">
                                        STATS
                                        {JSON.stringify(this.props.member)}

                                        {JSON.stringify(this.props.team)}

                                        {JSON.stringify(this.props.user)}

                                        {JSON.stringify(this.state)}
                                    </TabPane>
                                    {this.state.isLeader &&
                                        <TabPane tab="Manage" key="3">
                                            <TeamManager refreshInformation={this.refreshInformation}/>
                                        </TabPane>
                                    }
                                    
                                </Tabs>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </> :
                    <p>Team not found</p>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ team, user, member }) => ({ team, user, member });

export default connect(mapStateToProps)(PlayerPage);
