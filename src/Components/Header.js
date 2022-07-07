import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <Link style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }} to='/'>
                    <h3>
                    tokenPort
                    </h3>
                </Link>
            </div>
        );
    }
}

export default Header;
