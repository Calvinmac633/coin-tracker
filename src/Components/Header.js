import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


class Header extends Component {
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '.5rem'}}>
                <Link style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }} to='/'>
                    <HomeIcon sx={{ color: 'white' }}/>
                </Link>
            </div>
        );
    }
}

export default Header;
