import React, { useEffect, useState } from 'react'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/actions/actionCreators";
import { GlobalStyles } from './styleSheet';
import { en, tr } from './Language';

import Display from './Display';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}


const Root = (props) => {
    const { height, width } = useWindowDimensions();
    //var language = en;

    const pokeball = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Pok%C3%A9ball.png';

    const [refreshing, setRefreshing] = useState(false);
    const [pokelist, setPokelist] = useState([]);
    const [searchPoki, setSearchPoki] = useState('');
    const [pokeInfo, setPokeInfo] = useState(null);
    const [seeCaught, setSeeCaught] = useState(false);
    const [seeStarred, setSeeStarred] = useState(false);
    const [lang, setLang] = useState('en');
    const [language, setLanguage] = useState(en)

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
                    moveList.push(element.move.name + '\n');
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

    const showNextPoki = (way) => {
        setRefreshing(true);
        let a = -1;
        pokelist.forEach((poki, i) => {
            if (pokeInfo.name == poki.name) {
                a = i
            }
        });
        if (way == 'left')
            showPokeInfo(pokelist[a - 1].url)
        else if (way == 'right')
            showPokeInfo(pokelist[a + 1].url)
        setRefreshing(false);
    }

    const changeLanguage = () => {
        if(lang == 'en'){
            props.actions.setLang(tr)
            setLang('tr')
            console.log(language)
        }
        else{
            props.actions.setLang(tr)
            setLang('en')
            console.log(language)
        }
         
    }

    useEffect(() => {
        refresh();

    }, []);
   
    return (
       

        <div className="App" style={{ backgroundColor: '#efefef', userSelect: 'none', overflow: 'hidden' }}>
            {
                props.infoVisible && <Display item={pokeInfo} showNextPoki={showNextPoki} />
            }
            <div
                onClick={() => changeLanguage()}
                style={GlobalStyles.language}>
                {lang == 'en' ? 'Türkçe' : 'English'}
            </div>

            {refreshing
                ? <div> {props.language.load} </div>
                : <div>
                    <h2> Pokedex </h2>
                    <input type='text' placeholder={props.language.search}
                        style={GlobalStyles.searchBox}
                        onChange={handleChange} />
                    <div style={{
                        ...GlobalStyles.mainListPage,
                        flexDirection: width < 1300 && 'column-reverse'
                    }}>
                        <div style={{ height: height * 0.85, overflowY: 'scroll' }}>
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
                                                        style={GlobalStyles.pokiListItem}> {item.name} {props.language.mine}</div>
                                                    :
                                                    <div
                                                        onClick={() => showPokeInfo(item.url)}
                                                        style={GlobalStyles.pokiListItem}> {item.name} {props.language.mine}</div>
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
                        <div>
                            <div
                                style={GlobalStyles.pokiListItem}
                                onClick={() => catchRandomPoki()}
                            >
                                <img src={pokeball}
                                    width={45} height={45} />
                                {props.language.rand}
                            </div>
                            <div
                                style={GlobalStyles.pokiListItem}
                                onClick={() => setSeeCaught(!seeCaught)}>
                                <img src={pokeball}
                                    width={45} height={45} />
                                {seeCaught ? props.language.see : props.language.my}
                            </div>
                            {seeCaught &&
                                <div
                                    style={GlobalStyles.pokiListItem}
                                    onClick={() => setSeeStarred(!seeStarred)}
                                >
                                    <img src={pokeball}
                                        width={45} height={45} />
                                    {seeStarred ? props.language.myAll : props.language.star}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


function mapStateToProps(state) {
    return {
        infoVisible: state.visibilityReducer.infoVisible,
        caughtpokis: state.catchReducer.caughtpokis,
        starredpokis: state.starReducer.starredpokis,
        language: state.configReducer.language,

    }
};
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            infoVisibility: bindActionCreators(actionCreators.infoVisibility, dispatch),
            setLang: bindActionCreators(actionCreators.setLang, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
