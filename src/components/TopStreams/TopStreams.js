import React, {useEffect, useState} from 'react';
import api from '../../api';
import {Link} from 'react-router-dom';



function TopStreams(){

    const [channels, setChannels]=useState([]);

    useEffect(() =>{

        const fetchData = async () => {
            const result = await api.get("https://api.twitch.tv/helix/streams");
            let dataArray = result.data.data;
            //console.log(dataArray);

            let gameIDs = dataArray.map(stream =>{
                return stream.game_id;
            })
            let userIDs = dataArray.map(stream =>{
                return stream.user_id;
            })
            //console.log(gameIDs, userIDs)

            //creation url

            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            let queryParamsGame = "";
            let queryParamsUser = "";

            gameIDs.map(id =>{
                return (queryParamsGame = queryParamsGame + `id=${id}&`)
            })

            userIDs.map(id =>{
                return (queryParamsUser = queryParamsUser + `id=${id}&`)
            })

            //url final

            let urlFinalGames = baseUrlGames + queryParamsGame;
            let urlFinalUser = baseUrlUsers + queryParamsUser;

            //console.log(urlFinalGames)

            //appel

            let gamesNames = await api.get(urlFinalGames);
            let getUser = await api.get(urlFinalUser);

            let gamesNameArray = gamesNames.data.data;
            let arrayUsers = getUser.data.data;

            //console.log(gamesNameArray);

            //creation tab final

            let finalArray = dataArray.map(stream =>{
                stream.gameName = "";
                stream.login = "";

                gamesNameArray.forEach(name =>{
                    arrayUsers.forEach(user =>{
                        if(stream.user_id === user.id && stream.game_id === name.id){
                            stream.truePic = user.profile_image_url;
                            stream.gameName = name.name;
                            stream.login = user.login;
                        }
                    })
                })
                let newUrl = stream.thumbnail_url
                .replace("{width}", "320")
                .replace("{height}", "180");
                stream.thumbnail_url = newUrl


                return stream
                
            })

            setChannels(finalArray);
            //console.log(finalArray)
            

        }

        fetchData()

    }, [])

    return(

        <div>
            <h1 className="titreGames">Streams les plus populaires</h1>
            <div className="flexAccueil">
                {channels.map((channel, index)=>(
                    <div key= {index} className="carteStream">

                        <img src={channel.thumbnail_url} className='imgCarte' alt="jeu"/>
                        <div className="cardBodyStream">

                            <h5 className="titreCartesStream">{channel.user_name}</h5>
                            <p className="txtStream">jeu : {channel.gameName}</p>
                            <p className="txtStream viewer">Viewers : {channel.viewer_count}</p>
                            <Link className="lien" to={{pathname: `/live/${channel.login}`}}>
                            <div className="btnCarte">Regarder {channel.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default TopStreams;