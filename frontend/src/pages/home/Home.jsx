import Block from "../../components/block/Block"
import Button from "../../components/button/Button"
import "./Home.css"
import { useState } from 'react'

function Home() {
    const url = "http://localhost:8080/deepthought/answer";
    const [data, setData] = useState("?");

    const deepthought = () => {
        return fetch(url)
          .then((res) => res.json())
          .then((d) => setData(d.answer))
      }
    
    return (
        <div class="container-fluid">
            <div className="row">
                <Block title="Deep Tought">
                    <div className="text-center">
                        <Button title="answer" href="" onClick={deepthought}></Button>
                        <p className="mt-3">answer of the life : {data}</p>
                    </div>
                </Block>
                <Block title="Play Match">
                </Block>
                <Block title="Tournament">
                </Block>
                
            </div>
        </div>
    )
}

export default Home