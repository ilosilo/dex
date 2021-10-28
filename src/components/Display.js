import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/actions/actionCreators";

import styleSheet, { GlobalStyles } from './styleSheet';
import star from '../img/star.png';
import release from '../img/release.png';
import ball from '../img/ball.png';
import balls from '../img/balls.png';
import gold from '../img/gold.png';
import PlayButton from './PlayButton';

const Display = (props) => {
    var pokiInfo = props.item;

    const [seeMoves, setSeeMoves] = useState(false);
    const [move, setMove] = useState('');

    const starPoki = () => {
        if (props.starredpokis.includes(props.item.name)) {
            props.actions.pokiUnstar(pokiInfo.name)
        }
        else {
            props.actions.pokiStar(pokiInfo.name)
        }
    }
    const catchPoki = () => {
        if (props.caughtpokis.includes(pokiInfo.name)) {
            props.actions.pokiRemove(pokiInfo.name);
            props.actions.goldAdd(1);
            alert(pokiInfo.name + " released!");
            props.actions.infoVisibility(false);
        }
        else {
            if (props.balls >= 1) {
                props.actions.ballRemove(1);
                let rate = Math.floor(Math.random() * 3);
                if (rate == 2) {
                    props.actions.pokiAdd(pokiInfo.name);
                    alert(pokiInfo.name + " done!");
                }
                else {
                    alert(pokiInfo.name + " escaped!");
                    props.actions.infoVisibility(false)

                }
            } else {
                alert("Not enought Pokeball!");
            }

        }
    }

    const doMove = (way) => {
        switch (way) {
            case 'up':
                setMove(way)
                if (props.gold >= 2) {
                    props.actions.goldRemove(2);
                    props.actions.ballAdd(1);
                }
                setMove('');
                break;
            case 'down':
                setMove(way)
                setSeeMoves(!seeMoves)
                setMove('');
                break;
            case 'left':
                setMove(way)
                console.log(way);
                props.showNextPoki(way)
                setMove('');
                break;
            case 'right':
                setMove(way)
                console.log(way);
                props.showNextPoki(way)
                setMove('');
                break;
            case 'middle':
                setMove(way)
                console.log(way);
                setMove('');
                break;
            default:
                setMove('');
                break;

        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={GlobalStyles.pokiInfoCard}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 4 }}>
                        <div
                            style={{ ...GlobalStyles.xButton, backgroundColor: 'red' }}
                            onClick={() => props.actions.infoVisibility(false)}>X
                        </div>
                        {props.caughtpokis.includes(props.item.name)
                            ? <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div
                                    onClick={() => starPoki()}
                                    style={{ ...GlobalStyles.xButton, backgroundColor: props.starredpokis.includes(props.item.name) ? 'yellow' : 'white' }}>
                                    <img src={star} width={28} height={28}
                                    /> </div>
                                <div
                                    onClick={() => catchPoki()}
                                    style={GlobalStyles.xButton}
                                >
                                    <img src={release} width={28} height={28}
                                        alt="release poki"
                                    /> </div>
                            </div>
                            :
                            <div
                                onClick={() => catchPoki()}
                                style={GlobalStyles.xButton} >
                                <img src={ball} width={28} height={28}
                                />  </div>
                        }</div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}> {props.balls} <img src={balls} width={35} height={35} /></div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}> {props.gold} <img src={gold} width={35} height={35} /></div>
                    </div>
                </div>
                <div style={GlobalStyles.imgFrame}>
                    <img src={pokiInfo.imageURL} width={200} height={200} style={GlobalStyles.imgBox} />
                    <div style={GlobalStyles.label}><p>{props.language.exp} : {pokiInfo.base_experience}  </p></div>
                </div>
                <div style={GlobalStyles.nameBox}>
                    {pokiInfo.name}
                </div>
                <div style={GlobalStyles.infoPanel}>
                    <div>{props.language.height} : {pokiInfo.height} cm</div>
                    <div> {props.language.weight}: {pokiInfo.weight} kg</div>
                </div>
                <div>
                    <PlayButton doMove={doMove} />
                </div>




            </div>
            {
                seeMoves &&
                <div style={GlobalStyles.moveInfoCard}>
                    {props.language.moves}
                    <p> {pokiInfo.moves} </p>
                </div>
            }
        </div>
    )

}

function mapStateToProps(state) {
    return {
        caughtpokis: state.catchReducer.caughtpokis,
        starredpokis: state.starReducer.starredpokis,
        balls: state.itemReducer.balls,
        gold: state.itemReducer.gold,
        language: state.configReducer.language,
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
            ballAdd: bindActionCreators(actionCreators.ballAdd, dispatch),
            ballRemove: bindActionCreators(actionCreators.ballRemove, dispatch),
            goldAdd: bindActionCreators(actionCreators.goldAdd, dispatch),
            goldRemove: bindActionCreators(actionCreators.goldRemove, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);