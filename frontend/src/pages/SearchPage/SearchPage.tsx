import React, {useState} from 'react';
import {COLORS, FONT} from '../../utils';
import { Navbar } from '../../components'
import './SearchPage.css'

const SearchPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<div >
			<Navbar/>
			<div style={{backgroundColor: COLORS.greybox}}>
				<div>
					<h1 style={{fontSize: FONT.fontSize, color: COLORS.black}}>Wörterbuch</h1>
					<div className="textinput-div">
						<input
							type="text"
							value={searchTerm}
							onChange={event => {setSearchTerm(event.target.value)}}
							className="textinput"
						/>
						<button>Suchen</button>
					</div>
				
				</div>
			</div>
		</div>
	);
}

export default SearchPage;
