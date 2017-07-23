import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import autobind from 'autobind-decorator'

import Sidebar from './Sidebar'
import Content from './Content'
import Editor from '../editor/Editor'
import * as ContentMode from '../../constants/ContentMode'
import Visibility from '../../model/Visibility'

@connect(state => ({
	user: state.user,
	currentBlog: state.currentBlog
}), dispatch => ({}))
class Blog extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			mode: ContentMode.VIEW
		}
	}

	@autobind
	handleRequestAddPost() {
		this.setState({
			mode: ContentMode.ADD
		})
	}

	@autobind
	handleRequestEditPost() {
		this.setState({
			mode: ContentMode.EDIT
		})
	}

	@autobind
	handleFinishEditor() {
		this.setState({
			mode: ContentMode.VIEW
		})
	}

	render() {
		const { mode } = this.state

		return (
			<div className="container">
				<Sidebar onRequestAddPost={this.handleRequestAddPost} />

				<Content onRequestEditPost={this.handleRequestEditPost}/>

				{(mode === ContentMode.EDIT || mode === ContentMode.ADD) &&
					<Editor mode={mode} onFinish={this.handleFinishEditor} />
				}
			</div>
		)
	}
}

Blog.propTypes = {
	user: PropTypes.object.isRequired,
	currentBlog: PropTypes.object.isRequired
}

export default Blog
