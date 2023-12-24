import Block from "../../components/block/Block"
import Button from "../../components/button/Button"
import "./Home.css"
import { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Home() {
    const url = "http://localhost:8080/deepthought/answer";
    const [data, setData] = useState("?");
    const [config, setConfig] = useState({ speed: 3, points: 5 });

    const navigate = useNavigate();


    const deepthought = () => {
        return fetch(url)
          .then((res) => res.json())
          .then((d) => setData(d.answer))
    }

    function playLocalMatch() {
        navigate('/play', {"state": config});
    }
    
    
    return (
        <div className="container-fluid">
            <div className="row">
                <Block title="Deep Tought">
                    <div className="text-center">
                        <Button href="" onClick={deepthought}>answer</Button>
                        <p className="mt-3">answer of the life : {data}</p>
                    </div>
                </Block>

                <Block title="Play Local Match">
                <div className="text-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <label className="">Points/Game</label>
                            <div>
                                <input onChange={e =>  setConfig(prevState => ({...prevState, ["points"]:  parseInt(e.target.value)}))} min="3" max="39" defaultValue="5" className="config-number" type="number"></input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <label className="">Game Speed</label>
                            <div>
                                <input onChange={e =>  setConfig(prevState => ({...prevState, ["speed"]: parseInt(e.target.value)}))} min="0" max="5" defaultValue="3" className="config-number" type="number"></input>
                            </div>
                        </div>
                        <Button onClick={playLocalMatch}>
                            Jouer
                        </Button>
                    </div>
                </Block>

                <Block title="Tournament">
                    <div className="text-center">
                        <Button>
                            <Link to={'tournament/'}>Tournament</Link>
                        </Button>
                    </div>
                </Block>
                
            </div>
        </div>
    )
}

export default Home