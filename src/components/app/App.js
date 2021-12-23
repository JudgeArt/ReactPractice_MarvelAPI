import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/signleComicPage/SingleComicPage'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>                            
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SinglePage Component={SingleComicPage} dataType="comic" />} />
                            <Route path="*" element={<Page404/>}/>                            
                            <Route path="/characters/:charId" element={<SinglePage Component={SingleCharacterLayout} dataType="character" />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

App.propTypes = {
    onCharSelected: PropTypes.func,
}

export default App;