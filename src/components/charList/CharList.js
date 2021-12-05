import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,           
        })
    }


    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) ended = true;

        this.setState( ({offset, charList}) => ({            
                charList: [...charList, ...newCharList] ,
                loading: false,
                offset: offset + 9, 
                newItemLoading: false,   
                charEnded: ended,        
        }))
        console.log(this.state.offset);

    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={ () => this.props.onCharSelected(item.id) }>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }



    render() {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(charList);
        console.log(items);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items  : null;

    return (        
        <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => this.onRequest(offset)}
            style={{'display': charEnded? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
  }
    
}

export default CharList;

                // <li className="char__item char__item_selected">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>
                // <li className="char__item">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>
                // <li className="char__item">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>
                // <li className="char__item">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>
                // <li className="char__item">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>
                // <li className="char__item">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>
                // <li className="char__item">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>
                // <li className="char__item">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li>