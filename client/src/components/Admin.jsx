import React, { Component } from 'react'
import '../App.css';

export default class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {

            add: false,
            edit: false,
            editId: '',
            _id: 0,
            title: '',
            price: '',
            description: '',
            image: ''
        }
    }

    show = (item, id) => {

        if (this.state.edit) {

            if (id == this.state.editId) {

                return (

                    <tr>
                        <td><input value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} /></td>
                        <td><input value={this.state.price} onChange={(e) => { this.setState({ price: e.target.value }) }} /></td>
                        <td><input value={this.state.description} onChange={(e) => { this.setState({ description: e.target.value }) }} /></td>
                        <td><input value={this.state.image} onChange={(e) => { this.setState({ image: e.target.value }) }} /></td>
                        <td>
                            <button className='adminButton' onClick={() => { this.updateValues(id) }}>update</button>
                        </td>
                    </tr>
                )
            }
            else {
                return (

                    <tr>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td><img className="imgSize2" src={item.image} /></td>
                        <td>
                            <button className='adminButton' onClick={() => { this.saveValueforEditing(item, id) }}>edit</button>
                            <button className='adminButton' onClick={() => { this.props.removeProduct(item, id) }}>delete</button>
                        </td>
                    </tr>
                )
            }
        }

        else {
            return (

                <tr>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td><img className="imgSize2" src={item.image} /></td>
                    <td>
                        <button className='adminButton' onClick={() => { this.saveValueforEditing(item, id) }}>edit</button>
                        <button className='adminButton' onClick={() => { this.props.removeProduct(item, id) }}>delete</button>
                    </td>
                </tr>
            )
        }
    }

    saveValueforEditing = (item, id) => {

        this.setState({
            edit: true,
            editId: id,
            _id: item._id,
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image
        })
    }

    updateValues = (id) => {

        let updateProduct = {

            _id: this.state._id,
            title: this.state.title,
            price: parseInt(this.state.price),
            description: this.state.description,
            image: this.state.image
        }

        this.props.updateProducts(updateProduct, id)
    }

    addproduct = () => {

        let newProduct = {

            title: this.state.title,
            price: this.state.price,
            description: this.state.description,
            image: this.state.image
        }

        this.props.addproduct(newProduct)
    }

    displayAddSection = () => {

        if (this.state.add) {

            return (

                <div>

                    <table>

                        <tr>
                            <td><input placeholder='title' onChange={(e) => { this.setState({ title: e.target.value }) }} /></td>
                            <td><input placeholder='price' onChange={(e) => { this.setState({ price: e.target.value }) }} /></td>
                            <td><input placeholder='description (At least 10 letters)' onChange={(e) => { this.setState({ description: e.target.value }) }} /></td>
                            <td><input placeholder='image (url)' onChange={(e) => { this.setState({ image: e.target.value }) }} /></td>
                            <td><button className='adminButton' onClick={() => { this.addproduct() }}>add</button></td>
                        </tr>

                    </table><br />

                </div>
            )

        }
    }

    render() {
        return (
            <div>

                <button className='sistemButton card' onClick={() => { this.setState({ add: !this.state.add }) }} >add product</button><br />
                {this.displayAddSection()}

                <table>
                    <tr>
                        <td><h3>title</h3></td>
                        <td><h3>price</h3></td>
                        <td><h3>description</h3></td>
                        <td><h3>image</h3></td>
                        <td><h3>edit/delete</h3></td>
                    </tr>

                    {this.props.productsList.map((item, i) => {
                        return this.show(item, i)
                    })}

                </table>
            </div>
        )
    }
}
