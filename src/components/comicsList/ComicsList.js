import './comicsList.scss';

import {Link} from 'react-router-dom'

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import {useState, useRef, useEffect} from 'react';
// 1115004

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'error':
            return <ErrorMessage/>;
        case 'confirmed':
            return <Component/>
        default:
            throw new Error ('Unexpected process state');
    }
}


const ComicsList = (props) => {

    const {loading, error ,clearError, getAllComics, process, setProcess} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
    
    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
        .then(onComicsListLoaded)
        .then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 9) ended = true;

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 9);
        setNewItemLoading(newItemLoading => false);
        setComicsEnded(comicsEnded => ended);
    }


    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">                
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, ()=>renderItems(comicsList),newItemLoading)}
            <button className="button button__main button__long"
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>    
        </div>    
    )
}

export default ComicsList;



// <li className="comics__item">
// <a href="#">
//     <img src={xMen} alt="x-men" className="comics__item-img"/>
//     <div className="comics__item-name">X-Men: Days of Future Past</div>
//     <div className="comics__item-price">NOT AVAILABLE</div>
// </a>
// </li>
// <li className="comics__item">
// <a href="#">
//     <img src={uw} alt="ultimate war" className="comics__item-img"/>
//     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//     <div className="comics__item-price">9.99$</div>
// </a>
// </li>
// <li className="comics__item">
// <a href="#">
//     <img src={xMen} alt="x-men" className="comics__item-img"/>
//     <div className="comics__item-name">X-Men: Days of Future Past</div>
//     <div className="comics__item-price">NOT AVAILABLE</div>
// </a>
// </li>
// <li className="comics__item">
// <a href="#">
//     <img src={uw} alt="ultimate war" className="comics__item-img"/>
//     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//     <div className="comics__item-price">9.99$</div>
// </a>
// </li>
// <li className="comics__item">
// <a href="#">
//     <img src={xMen} alt="x-men" className="comics__item-img"/>
//     <div className="comics__item-name">X-Men: Days of Future Past</div>
//     <div className="comics__item-price">NOT AVAILABLE</div>
// </a>
// </li>
// <li className="comics__item">
// <a href="#">
//     <img src={uw} alt="ultimate war" className="comics__item-img"/>
//     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//     <div className="comics__item-price">9.99$</div>
// </a>
// </li>
// <li className="comics__item">
// <a href="#">
//     <img src={xMen} alt="x-men" className="comics__item-img"/>
//     <div className="comics__item-name">X-Men: Days of Future Past</div>
//     <div className="comics__item-price">NOT AVAILABLE</div>
// </a>
// </li>