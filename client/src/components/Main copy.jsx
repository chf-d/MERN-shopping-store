import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Main extends Component {
    render() {
        return (
            <div id='main'>

                <Link to='/admin'><button className='sistemButton'>admin</button></Link>
                <Link to='/home'><button className='sistemButton'>home</button></Link>
                <Link to='/stats'><button className='sistemButton'>stats</button></Link>

            </div>
        )
    }
}
