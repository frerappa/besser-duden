import React, {useState} from 'react';
import {COLORS, FONT} from '../../utils';
import { Navbar } from '../../components'
import './SearchPage.css'

const SearchPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<div>
			<Navbar/>
			<div className="content">

				<div className="box">
					<h1>Wörterbuch</h1>
					<div className="textinput-div">
						<input
							type="text"
							value={searchTerm}
							onChange={event => {setSearchTerm(event.target.value)}}
							className="textinput"
							placeholder="Stichwort"
						/>
						<button className="textinput-button" onClick={() => {console.log(searchTerm)}}>SUCHEN</button>
					</div>
				
				</div>
			</div>
		</div>
	);
}

export default SearchPage;
