import './Footer.scss'
import logo from '../images/logo.svg'

const Footer = () => {

    return <div className='Footer'>
        <img className='logo' alt='' src={logo}/>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb</p>
    </div>
}

export default Footer