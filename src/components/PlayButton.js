import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/actions/actionCreators";

import { GlobalStyles } from './styleSheet';
import down from '../img/down.png';

const PlayButton = (props) => {

    return (
        <div style={{ width: 90, height: 90, display: 'flex', flexDirection: 'row', margin: 15 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ flex: 1 }}></div>
                <div 
                onClick={() => props.doMove('left')}
                style={{ ...GlobalStyles.playButton, borderRight: 0 }}>
                    <img src={down} width={20} height={20}
                        style={{ transform: 'rotate(90deg)' }} />
                </div>
                <div style={{ flex: 1 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div 
                onClick={() => props.doMove('up')}
                style={{ ...GlobalStyles.playButton, borderBottom: 0 }}>
                    <img src={down} width={20} height={20}
                        style={{ transform: 'rotate(180deg)' }} />
                </div>
                <div 
                onClick={() => props.doMove('middle')}
                style={{ ...GlobalStyles.playButton, border: 0}}></div>
                <div 
                onClick={() => props.doMove('down')}
                style={{ ...GlobalStyles.playButton, borderTop: 0 }}>
                    <img src={down} width={20} height={20}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ flex: 1 }}></div>
                <div 
                onClick={() => props.doMove('right')}
                style={{ ...GlobalStyles.playButton, borderLeft: 0 }}>
                    <img src={down} width={20} height={20}
                        style={{ transform: 'rotate(270deg)' }} />
                </div>
                <div style={{ flex: 1 }}></div>
            </div>
        </div>
    )

}

function mapStateToProps(state) {
    return {
        caughtpokis: state.catchReducer.caughtpokis,
        starredpokis: state.starReducer.starredpokis,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            pokiStar: bindActionCreators(actionCreators.pokiStar, dispatch),
            pokiUnstar: bindActionCreators(actionCreators.pokiUnstar, dispatch),
            infoVisibility: bindActionCreators(actionCreators.infoVisibility, dispatch),
            pokiAdd: bindActionCreators(actionCreators.pokiAdd, dispatch),
            pokiRemove: bindActionCreators(actionCreators.pokiRemove, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);