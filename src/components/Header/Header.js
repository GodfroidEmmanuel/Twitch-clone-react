import React, {useState, useEffect} from 'react';
import logo from './IconeTwitch.svg';
import search from './Search.svg';
import menuIco from './MenuIco.svg';
import {Link} from 'react-router-dom';
import croix from "./Croix.svg";





function Header (){

    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [searchInput, setSearch] = useState('');

    useEffect(() => {

        const mediaQuery = window.matchMedia("(max-width: 900px)");
        //addlistener c'est comme addeventlistener pour les medias queries
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }

    })

    const handleMediaQueryChange = mediaQuery => {
        if(mediaQuery.matches){
            setSmallScreen(true);
        }else {
            setSmallScreen(false);
        }
    }

    const toggleNavRes = () => {
        showMenu(!menu)
    }


    const hideMenu = () => {
        if(menu === true){
            showMenu(!menu);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleKeyPress = (e) => {
        setSearch(e.target.value);
    }

    
    return (
        <div>
            <nav className="headerTop">
                {(menu || !smallScreen) && ( 
                <ul className="listeMenu">

                    <li onClick = {hideMenu} className="liensNav">
                        <Link className="lien" to="/">
                        <img src={logo} alt="logo" className="logo"/>

                        </Link>
                    </li>
                    <li onClick = {hideMenu} className="liensNav">
                    <Link className="lien" to="/">
                        Top Games
                        </Link>
                    </li>
                    <li onClick = {hideMenu} className="liensNav">
                    <Link className="lien" to="/top-streams">
                        Top Streams
                        </Link>
                    </li>
                    <li className="liensNav">
                        <form  className="formSubmit" onSubmit={handleSubmit}>

                            <input required value={searchInput}type="text" onChange={(e) => handleKeyPress(e)} className="inputRecherche"/>

                            <Link
                            className="lien"
                            to={{
                                pathname: `/resultats/${searchInput}`
                            }}>
                            <button type="submit">
                                <img src={search} alt="icone loupe" className="logoLoupe"/>
                            </button>

                            </Link>

                        </form>
                    </li>
                </ul>
                )}
            </nav>

            <div className="menuResBtn">
                <img onClick={toggleNavRes} src={!menu ? menuIco : croix} alt="icone menu responsive" className="menuIco"/>
            </div>

        </div>
    )
}

export default Header