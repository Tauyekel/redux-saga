import React from 'react'
import {ListGroup, ListGroupItem, Button} from 'reactstrap'

const UsersList = ({items, onDeleteItem}) => {
	return (
		<ListGroup>
			{items.map(user => {
				const {id, firstName, lastName} = user
				return (
					<ListGroupItem key={id}>
						<section style={{display: 'flex'}}>
							<div style={{flexGrow: 1}}>
								{`${firstName} ${lastName}`}
							</div>

							<div>
								<Button
									outline color='danger'
									onClick={() => onDeleteItem(id)}
								>
									Delete
								</Button>
							</div>
						</section>
					</ListGroupItem>
				)
			})}
		</ListGroup>
	);
};

export default UsersList;
