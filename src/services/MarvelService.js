import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2502e3e3c205202be8a1082b8d094886';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);        
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);         
        return _transformCharacter(res.data.results[0]);     
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);         
        return _transformComics(res.data.results[0]);     
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const handleDescription = (desc) => {
        if (desc === "") {
            return "Информация отсутствует";
        }
        else if (desc.length > 210){
            return desc.slice(0,210) + "...";
        } else return desc;
    }

    const _transformCharacter = (char) => {     
        return {
                id: char.id,
                name : char.name,
                description : handleDescription(char.description) /*(char.description !== "" ? char.description : "Информация отсутствует")*/,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
        }
    }

    const _transformComics = (comics ) => {
        return {
            id: comics.id,
            title: comics.title,            
            price: comics.prices.price,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us'
        }
    }


    return {loading, error ,clearError, getAllCharacters, getCharacter, getAllComics, getComics, getCharacterByName};
}

export default useMarvelService;