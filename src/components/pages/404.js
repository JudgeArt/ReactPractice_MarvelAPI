import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <h1 style={{'text-align' : 'center'}}>
                Page doesn't exist
            </h1>
            <Link 
                style={{'text-align' : 'center', 'display': 'block',
                        'font-size' : '50px', 'color' : '#9F115F'}}
                to="/"> 
                Back to main page
            </Link>
        </div>
    )
}

export default Page404;