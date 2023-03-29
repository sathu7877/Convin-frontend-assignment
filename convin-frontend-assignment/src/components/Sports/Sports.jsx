import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrAdd } from "react-icons/gr";
import { MdDelete, MdModeEdit, MdPlayCircleOutline, MdDriveFileMove } from "react-icons/md";
import Popup from 'reactjs-popup';
import Iframe from 'react-iframe';
import { BrowserRouter, Route } from 'react-router-dom';

class Sports extends Component {
    state = {
        sportsCardData: [],
        name: '',
        mp3Link: '',
        deleteIds: [],
        popupOpened: false,
    };

    fetchSportsAPI() {
        fetch("http://localhost:8000/sportsData")
            .then(res => res.json())
            .then(res => this.setState({ sportsCardData: res }));
    }

    componentWillMount() {
        this.fetchSportsAPI();
    }

    renderSportsData() {
        return this.state.sportsCardData.map(data => (

            <div class="card col-2" style={{ marginRight: '1rem', marginTop: '1rem' }}>
                <div class="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type="checkbox" onChange={e => this.onCheckBoxChange(e, data.id)} />
                    <div>
                        <button type="submit" class="btn" onClick={e => this.deleteCard(data.id)}>
                            <MdDelete size={25}></MdDelete>
                        </button>
                        <Popup opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})} trigger=
                            {<button type="submit" class="btn">
                                <MdModeEdit size={25}></MdModeEdit>
                            </button>}
                            position="center">
                            <div class="card" style={{ marginRight: '1rem', marginTop: '30rem', marginLeft: '30rem', width: '40rem', height: '20rem' }}>
                                <div class="card-body" style={{ padding: '3rem', display: 'row' }}>
                                    <h1>Edit Card Values: </h1>
                                    <form onSubmit={this.handleSubmit}>
                                        <label style={{ marginRight: '1rem' }}>Enter Card Name:
                                            <input style={{ margin: '1rem' }}
                                                type="text"
                                                id="Name"
                                                onChange={e => this.setState({ name: e.target.value })}
                                            />
                                        </label><br />
                                        <label style={{ marginRight: '1rem' }}>Enter Link:
                                            <input style={{ margin: '1rem' }}
                                                type="text"
                                                id="Mp3Link"
                                                onChange={e => this.setState({ mp3Link: e.target.value })}
                                            />
                                        </label>
                                        <button type="submit" class="btn btn-primary" style={{ marginTop: '3rem', marginRight: '2rem' }} onClick={e => this.handleUpdate(data.id, data.cardName, data.mp3Link)}>Update</button>
                                    </form>

                                </div>
                            </div>
                        </Popup>
                        <Popup trigger=
                            {<button type="submit" class="btn">
                            <MdDriveFileMove size={25}></MdDriveFileMove>
                        </button>}
                            position="right center">
                            <div class="card" style={{width: '20rem', height: '6rem' }}>
                                <div class="card-body" style={{ display: 'row' }}>
                                    
                                <button type="submit" class="btn" onClick={e => this.moveToEntertainmentCard(data.id, data.cardName, data.mp3Link)}>
                                    Move to Entertainment Bucket
                                </button>
                                <button type="submit" class="btn" onClick={e => this.moveToEducationCard(data.id, data.cardName, data.mp3Link)}>
                                    Move to Education Bucket
                                </button>
                                </div>
                            </div>
                        </Popup>
                        

                    </div>

                </div>
                <div class="card-body">
                    <h5 class="card-title">{data.cardName}</h5>
                    <Popup trigger=
                        {<button type="submit" class="btn">
                            <MdPlayCircleOutline size={60} onClick={() => this.onPlayButtonClick(data.cardName,data.mp3Link)}></MdPlayCircleOutline>
                        </button>}
                        position="right center">
                        <Iframe url={data.mp3Link}
                            width="640px"
                            height="320px"
                            id=""
                            className=""
                            display="block"
                            position="relative" />
                    </Popup>
                </div>
            </div>

        ));
    }

    onSubmit = () => {
        return (
            <BrowserRouter>
                <Route path="/" element={<Sports />} />
            </BrowserRouter>
        )
    }

    handleSubmit = async e => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:8000/sportsData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardName: this.state.name, mp3Link: this.state.mp3Link }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
        alert("entry recorded");
        this.fetchSportsAPI();
        this.popupOpened = false;
        
        
        
    };

    deleteCard = async e => {
        fetch(`http://localhost:8000/sportsData/${e}`, {
            method: 'DELETE',
        }).then((res) => {
            res.json().then((repo) => {
            })
        })
        this.fetchSportsAPI();
    };

    handleUpdate(id, cardName, mp3Link) {
        this.deleteCard(id);
        let data = { cardName, mp3Link }
        fetch(`http://localhost:8000/sportsData/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            res.json().then((repo) => {
                alert("entry updated");
            })
        })
        this.fetchSportsAPI();
    };

    onCheckBoxChange(e, id) {
        if (e.target.checked === true) {
            this.state.deleteIds?.push(id)
        }
        else {
            if (this.state.deleteIds?.includes(id)) {
                const indexValue = this.state.deleteIds?.indexOf(id)
                this.state.deleteIds?.splice(indexValue, 1);
            }
        }
        console.log(this.state.deleteIds);
    };

    onDeleteSelected() {
        if (this.state.deleteIds?.length > 0) {
            for (let id of this.state.deleteIds) {
                this.deleteCard(id);
            }
        }
        this.fetchSportsAPI();
    }
    moveToEntertainmentCard(id, cardName, mp3Link)
    {
        //add card to entertainment bucket
        fetch('http://localhost:8000/entertainmentData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardName: cardName, mp3Link: mp3Link }),
        }).then((res) => {
            res.json().then((repo) => {
            })
        })

        //delete card from sports bucket
        fetch(`http://localhost:8000/sportsData/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            res.json().then((repo) => {
                alert("entry moved to Entertainment Bucket.");
            })
        })
        this.fetchSportsAPI();

    }

    moveToEducationCard(id, cardName, mp3Link)
    {
        //add card to education bucket
        fetch('http://localhost:8000/educationData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardName: cardName, mp3Link: mp3Link }),
        }).then((res) => {
            res.json().then((repo) => {
            })
        })

        //delete card from sports bucket
        fetch(`http://localhost:8000/sportsData/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            res.json().then((repo) => {
                alert("entry moved to Education Bucket.");
            })
        })
        this.fetchSportsAPI();
    }

    onPlayButtonClick(cardName, mp3Link)
    {
        console.log('clicked on play button');
        //add clicked data to history table
        fetch('http://localhost:8000/historyData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardName: cardName, mp3Link: mp3Link }),
        }).then((res) => {
            res.json().then((repo) => {
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <button type="submit" class="btn btn-primary" style={{ marginTop: '3rem', marginRight: '2rem', display: 'flex', marginLeft: 'auto' }} onClick={e => this.onDeleteSelected()}>Delete Selected Cards</button>
                </div>
                <div class="row sports-container" style={{ margin: '3rem' }}>
                    <div class="card col-2" style={{ marginRight: '1rem', marginTop: '1rem' }}>
                        <div class="card-body">
                            <Popup trigger=
                                {<button type="submit" class="btn">
                                    <GrAdd size={70} style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}></GrAdd>
                                </button>}
                                position="right center">
                                <div class="card" style={{ marginRight: '1rem', marginTop: '30rem', marginLeft: '30rem', width: '40rem', height: '20rem' }}>
                                    <div class="card-body" style={{ padding: '3rem', display: 'row' }}>
                                        <form onSubmit={this.handleSubmit}>
                                            <label style={{ marginRight: '1rem' }}>Enter Card Name:
                                                <input style={{ margin: '1rem' }}
                                                    type="text"
                                                    id="Name"
                                                    value={this.state.post}
                                                    onChange={e => this.setState({ name: e.target.value })}
                                                />
                                            </label><br />
                                            <label style={{ marginRight: '1rem' }}>Enter Link:
                                                <input style={{ margin: '1rem' }}
                                                    type="text"
                                                    id="Mp3Link"
                                                    value={this.state.post}
                                                    onChange={e => this.setState({ mp3Link: e.target.value })}
                                                />
                                            </label>
                                            <button type="submit" class="btn btn-primary" style={{ marginTop: '3rem', marginRight: '2rem' }} onClick={this.onSubmit}>Submit</button>
                                        </form>

                                    </div>
                                </div>
                            </Popup>
                        </div>
                    </div>
                    {this.renderSportsData()}
                </div>
            </div>

        );
    }
}

export default Sports;