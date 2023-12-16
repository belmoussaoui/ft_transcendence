import Block from "../../components/block/Block"
import Button from "../../components/button/Button"
import "./Home.css"
import { useState } from 'react'
import { Link } from "react-router-dom";

function Home() {
    const url = "http://localhost:8080/deepthought/answer";
    const [data, setData] = useState("?");

    const deepthought = () => {
        return fetch(url)
          .then((res) => res.json())
          .then((d) => setData(d.answer))
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
                <Block title="Play Match">
                    <div className="text-center">
                        <Button>
                            <Link to={'play'}>Jouer</Link>
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