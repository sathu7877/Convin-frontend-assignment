import React, { Component } from 'react';

class History extends Component {

    state = {
        HistoryDetails: [],
    };

    historyAPI(){
        //fetch history data
        fetch("http://localhost:8000/historyData")
        .then(res => res.json())
        .then(res => this.setState({ HistoryDetails: res }));
      }
    
    componentWillMount(){
    this.historyAPI();
    }

    renderHistoryDetails()
    {
        return this.state.HistoryDetails.map(record => (
     
            <tr>
                <td width="20%">{record.id}</td>
                <td width="20%">{record.cardName}</td>
                <td width="20%">{record.mp3Link}</td>
            </tr>
          
        ));
    }

    render() {
        return (
            <div>
                <table class="table table-hover">
                    <tr>
                        <td width="20%"><b>Id</b></td>
                        <td width="20%"><b>Card Name</b></td>
                        <td width="20%"><b>Link </b></td>
                    </tr>
                    {this.renderHistoryDetails()}
                </table>
            </div>
        );
    }
}

export default History;