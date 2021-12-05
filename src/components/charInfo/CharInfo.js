import './charInfo.scss';

import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); 

    const marvelService = new MarvelService();

    useState(() => { // componentDidMount
        updateChar();
    }, []);

    useEffect(() => { //componentDidUpdate
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        onCharLoading();
        marvelService.getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharLoading = () => {
        setLoading(true);
    }
    

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name,description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    const renderComicsVal = renderComics(10, comics);
    console.log(renderComicsVal);
    return (
    <>
            <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {renderComicsVal}
            {/* {
                comics.map((item, i) => {                   
                    return (
                <li key={i} className="char__comics-item">
                    {item.name}
                </li>
                    )
                })
            } */}
        </ul>
    </>
    )
}

const renderComics = (length, array) => {
    if (!array.length) return 'no comics'
    
    if (length === 'all') {
        return array.map((item, idx) => {
            return (
            <li key={idx} className='char__comics-item'>
                {item.name}
            </li>
            )
        })
    } else {
        const newArray = []
        for (let i = 0; i < length; i++) {
            newArray.push(
            <li key={i} className='char__comics-item'>
                {array[i].name}
            </li>
            )
        }
    return newArray
    }
}

CharInfo.propTypes = {
    charId : PropTypes.number,
    
}

export default CharInfo;