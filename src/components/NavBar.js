
import './NavBar.scss'

const NavBar = ({ page, maxPages, navPage }) => {

	return <p className='NavBar'>
		<button onClick={() => navPage(1, true)}></button>
		<button onClick={() => navPage(-1)}></button>
		<span style={{ whiteSpace: 'nowrap' }}>{page} / {maxPages}</span>
		<button className='flipped' onClick={() => navPage(1)}></button>
		<button className='flipped' onClick={() => navPage(maxPages, true)}></button>
	</p>
}

export default NavBar