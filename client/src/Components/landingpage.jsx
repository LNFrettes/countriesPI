import '../StyleSheets/landing.css'
import react from 'react'
import {Link} from 'react-router-dom'

export default function landing(){
    return(
        <div className='landingContainter' >
            <h1>Travel Anywhere</h1>
            <Link to='/countries'>
                <button className='buttonEnter'>Enter</button>
            </Link>
        </div>
    )
}