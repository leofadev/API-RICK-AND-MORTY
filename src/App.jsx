import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/pagination";


function App() {

const [ characters, setCharacters] = useState([]);

const [info, setInfo] = useState({});

const initialUrl = "https://rickandmortyapi.com/api/character";

const fetchCharacters = (initialUrl) => {
fetch(initialUrl)
.then(response => response.json())
.then(data => {
    setCharacters(data.results);
    setInfo(data.info);
})
.catch(error => console.log(error))

};

    const onPrevious = () => {
        fetchCharacters(info.prev);
    }

    const onNext = () => {
        fetchCharacters(info.next);
    }

useEffect(() => {
fetchCharacters(initialUrl);
}, [])


return (
<>
    <Navbar brand="Rick and Morty App" />

    <div className="container mt-5">
        <Characters characters={characters} />
            <Pagination 
                prev={info.prev}
                next={info.next}
                onPrevious={onPrevious}
                onNext={onNext}
            />
    </div>
</>
);
}

export default App;
