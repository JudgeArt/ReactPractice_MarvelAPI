import { useParams, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import '../signleComicPage/singleComicPage.scss';

import setContent from '../../../utils/setContent';


const SingleComicPage = () => {
    const {comicId} = useParams(); // hook react router, get id of comic
    const [comic, setComic] = useState(null);

    const {getComics, clearError, process, setProcess} = useMarvelService(); // get information about comic

    useEffect(() => { //componentDidUpdate
        updateComics()
    }, [comicId])

    const updateComics = () => {
        clearError();
        getComics(comicId)
        .then(onComicLoaded)
        .then(() => setProcess('confirmed'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const  {title, description, pageCount, thumbnail, language, price} = data;
    
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
} 

export default SingleComicPage;