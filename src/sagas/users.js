import {takeEvery, takeLatest, take, call, fork, put} from 'redux-saga/effects'
import {CREATE_USER_REQUEST, DELETE_USER_REQUEST, GET_USERS_REQUEST} from '../actions/types'
import * as api from '../api/users'
import {getUsersSuccess, usersError} from '../actions'

// ---------------GET----------------
function* getUsers() {
	try {
		const result = yield call(api.getUsers)
		// console.log(result)
		yield put(getUsersSuccess(result.data.data))
	} catch (e) {
		yield put(usersError('An error occurred when trying to get the user'))
	}
}

function* watchGetUsersRequest() {
	yield takeEvery(GET_USERS_REQUEST, getUsers)
}

// ---------------POST----------------
function* createUser({ payload: {firstName, lastName} }) {
	try {
		yield call(api.createUser, {firstName, lastName})
		yield call(getUsers)
	} catch (e) {
		yield put(usersError('An error occurred when trying to create the user'))
	}
}

function* watchCreateUserRequest() {
	yield takeLatest(CREATE_USER_REQUEST, createUser)
}

// ---------------DELETE----------------
function* deleteUser(userId) {
	try {
		yield call(api.deleteUser, userId)
		yield call(getUsers)
	} catch (e) {
		yield put(usersError('An error occurred when trying to delete the user'))
	}
}

function* watchDeleteUserRequest() {
	while (true) {
		const { payload: {userId} } = yield take(DELETE_USER_REQUEST)
		yield call(deleteUser, userId)
	}
}

const usersSagas = [
	fork(watchGetUsersRequest),
	fork(watchCreateUserRequest),
	fork(watchDeleteUserRequest)
]

export default usersSagas
