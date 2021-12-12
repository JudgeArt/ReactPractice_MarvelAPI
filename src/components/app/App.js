import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import PropTypes from 'prop-types';
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const App = () => {
    
    const [selectedChar, setChar] = useState(null);
    const [page, setPage] = useState('Char');

    const onCharSelected = (id) => {
        setChar(id);
    }

    const onPageChoose = (page) => {
        setPage(page);
    }

    let mainInfo;
    if (page === 'Char') {
        mainInfo = (
        <>
        <ErrorBoundary> 
            <RandomChar/>
        </ErrorBoundary>        
        <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>                    
            </div>
        </>     
    );
    } else if ('Comics'){
        mainInfo = (
            <>
                <AppBanner/>
                <ComicsList onCharSelected={onCharSelected}/>   
            </>
        );
    }
    return (
        <div className="app">
            <AppHeader page={page} setPage={onPageChoose}/>
            <main>
                {mainInfo}
            </main>
        </div>
    )
}

App.propTypes = {
    onCharSelected: PropTypes.func,
}

export default App;