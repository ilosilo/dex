import React, { useEffect, useState } from 'react'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/actions/actionCreators";
import { GlobalStyles } from './styleSheet';

import Display from './Display';


const Root = (props) => {
    const pokeStat = {
        statname: '',
        effort: '',
    }


    const pokeList = [];

    const items = [];
    const [refreshing, setRefreshing] = useState(false);
    const [pokelist, setPokelist] = useState([]);
    const [searchPoki, setSearchPoki] = useState('');
    const [pokeInfo, setPokeInfo] = useState(null);
    const [seeCaught, setSeeCaught] = useState(false);
    const [seeStarred, setSeeStarred] = useState(false);

    const refresh = () => {
        setRefreshing(true);

        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(json => {
                setPokelist(json.results);
                setRefreshing(false)
            })
            .catch(error => console.error(error));

    };
    const handleChange = (event) => {
        setSearchPoki(event.target.value)
    }
    const getPokePhoto = (url) => {
        var imageURL;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                imageURL = json.sprites.front_default
                console.log(imageURL);
                return imageURL
            })
            .catch(error => console.error(error));
        console.log(imageURL);
        return imageURL;
    }


    const getPokeInfo = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                let moveList = [];
                json.moves.forEach(element => {
                    moveList.push(element.move.name);
                });
                var poki = {
                    name: json.name,
                    height: json.height,
                    weight: json.weight,
                    base_experience: json.base_experience,
                    id: json.id,
                    moves: moveList,
                    imageURL: json.sprites.front_default,
                }
                setPokeInfo(poki);
                setRefreshing(false)
                props.actions.infoVisibility(true);
                console.log(poki.name);
            })
            .catch(error => console.error(error));
    }

    const catchRandomPoki = () => {
        let len = pokelist.length;
        showPokeInfo(pokelist[Math.floor(Math.random() * len)].url)
    }
    const showPokeInfo = (url) => {
        setRefreshing(true);
        getPokeInfo(url)
        setRefreshing(false);
    }

    useEffect(() => {
        refresh();

    }, []);

    return (
        <div>
            <div style={GlobalStyles.mainListPage}>
                <div>
                    {
                        pokelist.map((item) => (
                            seeCaught
                                ?
                                (((seeStarred && props.starredpokis.includes(item.name)) || !seeStarred) ?
                                    (props.caughtpokis.includes(item.name) ?
                                        searchPoki != '' ?
                                            item.name.includes(searchPoki) &&
                                            <div
                                                onClick={() => showPokeInfo(item.url)}
                                                style={GlobalStyles.pokiListItem}> {item.name} is mine!</div>
                                            :
                                            <div
                                                onClick={() => showPokeInfo(item.url)}
                                                style={GlobalStyles.pokiListItem}> {item.name} is mine!</div>
                                        : null)
                                    : null
                                )
                                :
                                searchPoki != '' ?
                                    item.name.includes(searchPoki) &&
                                    <div
                                        onClick={() => showPokeInfo(item.url)}
                                        style={GlobalStyles.pokiListItem}>
                                        <img src={getPokePhoto(item.url)}
                                            width={45} height={45} />
                                        {item.name} </div>
                                    :
                                    <div
                                        onClick={() => showPokeInfo(item.url)}
                                        style={GlobalStyles.pokiListItem}> {item.name} </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}


function mapStateToProps(state) {
    return {
        infoVisible: state.visibilityReducer.infoVisible,
        caughtpokis: state.catchReducer.caughtpokis,
        starredpokis: state.starReducer.starredpokis,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            infoVisibility: bindActionCreators(actionCreators.infoVisibility, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
