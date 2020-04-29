import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import './PlayerPage.css'


// Ant Design
import { Row, Col, Avatar, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

class PlayerPage extends Component {

    componentDidMount() {
        console.log('ID:', this.props.match.params.id);
        this.props.dispatch({ type: 'FETCH_PLAYER', payload: this.props.match.params.id })

    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3} className="player-info">
                        {this.props.player[0] ?
                            <>
                                <Avatar size={128} src={this.props.player[0].avatar} />
                                <h1 id="welcome">
                                    {this.props.player[0].displayname}
                                </h1>
                                <p>Player ID: {this.props.player[0].id}</p>

                                <Dropdown overlay={<Menu>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://steamcommunity.com/profiles/${this.props.player[0].id}`}>
                                            Steam
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://rgl.gg//public/PlayerProfile.aspx?p=${this.props.player[0].id}`}>
                                            RGL.gg
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://www.ugcleague.com/players_page.cfm?player_id=${this.props.player[0].id}`}>
                                            UGC
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`http://etf2l.org/search/${this.props.player[0].id}`}>
                                            ETF2L
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://ozfortress.com/users?q=${this.props.player[0].id}`}>
                                            OZFortress
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://logs.tf/profile/${this.props.player[0].id}`}>
                                            Logs.tf
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://demos.tf/profiles/${this.props.player[0].id}`}>
                                            Demos.tf
                                        </a>
                                    </Menu.Item>
                                </Menu>}>
                                    <h4 className="dropdown">
                                        External Links <DownOutlined />
                                    </h4>
                                </Dropdown>
                            </> :

                            <p>User not found</p>
                        }
                    </Col>
                    <Col span={19}>
                        {/* Soon to be graphs */}
                    </Col>
                    <Col span={1}></Col>
                </Row>
                
            </div>
        );
    }
}

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps)(PlayerPage);
