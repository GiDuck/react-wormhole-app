import React from 'react';
import { connect } from 'react-redux';
import './main.css';
import DeckPanel from './DeckPanel';
import DashBoard from './DashBoard';
import Tunnel from './Tunnel';

class Main extends React.Component {
  state = {
    startShips: [],
    endShips: [],
    acrossShips: [],
    time: 0,
    tunnel_current_weight: 0,
  };

  looper = () => {
    const IsEmptyShipsOnTunnel = () => {
      let isEmpty = true;
      for (let i = 0; i < this.state.acrossShips.length; ++i) {
        if (this.state.acrossShips[i] !== -1) isEmpty = false;
      }

      return isEmpty;
    };

    let timer = setInterval(() => {
      this.shiftShipsInTunnel();
      this.takeoff();
      this.setState({ time: ++this.state.time });

      if (this.state.startShips.length === 0 && IsEmptyShipsOnTunnel()) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  };

  takeoff = () => {
    let { startShips, acrossShips } = this.state;

    let waitingShip = startShips[0];
    if (this.controlTakeoff(waitingShip)) {
      startShips = startShips.splice(1, startShips.length);
      acrossShips[0] = waitingShip;
      this.setState({ startShips: startShips, acrossShips: acrossShips });
    }
  };

  shiftShipsInTunnel = () => {
    let { acrossShips, endShips, tunnel_current_weight } = this.state;

    const lastShipOnTunnel = acrossShips[acrossShips.length - 1];
    if (lastShipOnTunnel !== -1) {
      endShips.push(lastShipOnTunnel);
      this.setState({
        endShips: endShips,
        tunnel_current_weight: tunnel_current_weight - lastShipOnTunnel,
      });
    }
    acrossShips = [-1].concat(acrossShips.splice(0, acrossShips.length - 1));
    this.setState({ acrossShips: acrossShips });
  };

  controlTakeoff = shipWeight => {
    const { tunnel_current_weight } = this.state;
    const { tunnel_limit_weight } = this.props;
    const nextTunnelWeight = tunnel_current_weight + shipWeight;
    if (nextTunnelWeight <= tunnel_limit_weight) {
      this.setState({ tunnel_current_weight: nextTunnelWeight });
      return true;
    }
    return false;
  };

  componentDidMount() {
    (async () => {
      const { ship_weights, tunnel_length } = this.props;
      let startShips = ship_weights.split(',');
      startShips = startShips.map(el => {
        return +el;
      });
      await this.setState({
        startShips: startShips,
        acrossShips: new Array(+tunnel_length).fill(-1),
      });
      this.looper();
    })();
  }

  componentWillMount() {
    const { history, isValidated } = this.props;
    if (isValidated === false) {
      alert('잘못된 접근입니다.');
      history.push('/');
      return;
    }
  }

  render() {
    const {
      startShips,
      endShips,
      acrossShips,
      time,
      tunnel_current_weight,
    } = this.state;
    const { tunnel_length, tunnel_limit_weight, ship_weights } = this.props;
    const globalInfoContent = [
      { key: '터널 길이', value: tunnel_length },
      { key: '터널 무게 제한', value: tunnel_limit_weight },
      { key: '우주선 무게', value: ship_weights },
    ];
    const currentInfoContent = [
      { key: '시간', value: time },
      { key: '현재 무게', value: tunnel_current_weight },
    ];

    return (
      <div className="mainComponent">
        <div className="start">
          <DeckPanel key="startPoint" shipsCount={startShips.length} />
        </div>
        <div className="center">
          <div className="upper">
            <DashBoard
              key="globalInfo"
              title="Global Info"
              content={globalInfoContent}
            />
          </div>
          <div className="middle">
            <Tunnel acrossShips={acrossShips} />
          </div>
          <div className="lower">
            <DashBoard
              key="currentInfo"
              title="Current Info"
              content={currentInfoContent}
            />
          </div>
        </div>
        <div className="end">
          <DeckPanel key="endPoint" shipsCount={endShips.length} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ globalField }) => ({
    tunnel_length: globalField.tunnel_length,
    tunnel_limit_weight: globalField.tunnel_limit_weight,
    ship_weights: globalField.ship_weights,
    isValidated: globalField.isValidated,
  }),
  {},
)(Main);
