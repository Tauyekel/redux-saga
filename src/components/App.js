import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsersRequest, deleteUserRequest, createUserRequest, usersError} from '../actions'
import UsersList from './UsersList'
import NewUserForm from './NewUserForm'
import {Alert} from 'reactstrap'

class App extends Component {

	constructor(props) {
		super(props)
		this.props.getUsersRequest()
	}

	handleSubmit = ({firstName, lastName}) => {
		this.props.createUserRequest({
			firstName,
			lastName
		})
	}

	handleDeleteUserClick = (userId) => {
		// console.log(userId)
		this.props.deleteUserRequest(userId)
	}

	handleCloseAlert = () => {
		this.props.usersError('')
	}

	render() {
		const {items, error} = this.props
		return (
			<div style={{margin: '0 auto', padding: '20px', width: '600px'}}>
				<Alert color="danger" isOpen={!!error} toggle={this.handleCloseAlert}>
					{error}
				</Alert>
				<NewUserForm onSubmit={this.handleSubmit} />
				<UsersList items={items} onDeleteItem={this.handleDeleteUserClick} />
			</div>
		)
	}
}

const mapStateToProps = ({ users: {items, error} }) => {
	return {items, error}
}

const mapDispatchToProps = {
	getUsersRequest,
	createUserRequest,
	deleteUserRequest,
	usersError
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
