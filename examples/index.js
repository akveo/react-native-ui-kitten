import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { RkButton } from '../index'

import { AppRegistry, View } from "react-native"

class TestApp extends Component {
	render() {
		return <View>
			<RkButton children="Default" />
			<br />
			<RkButton rkType='danger rounded' children="Danger (rounded)" style={{width: '100%'}} />
			<br />
			<RkButton rkType='warning rounded' children="Warning" />
		</View>
	}
}

ReactDOM.render(<TestApp />, document.getElementById('root'))


// AppRegistry.registerComponent('AwesomeProject', () => TestApp)

// //This is what you pasted
// if (window.document) // Test if in Browser
// 	AppRegistry.runApplication('AwesomeProject', {
// 		initialProps: {},
// 		rootTag: document.getElementById('root')
// 	})
