import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Main extends Component {
    render() {
        return (
            <div className='grid'>

                <div></div>
                <div></div>
                <Link to='/admin'><button className='mainButton'>Admin</button></Link>
                <Link to='/home'><button className='mainButton'>Home</button></Link>
                <Link to='/stats'><button className='mainButton'>Stats</button></Link>
                <div></div>
                <div></div>

            </div>
        )
    }
}
