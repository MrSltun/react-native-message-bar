/**
 * Name: MessageBar Test Project
 * Description: A Project to test the Message Bar Component
 * https://github.com/talor-a/react-native-message-bar
 */
'use strict'

var MessageBarAlert = require('./MessageBar.js')
var MessageBarManager = require('./MessageBarManager.js')
var CustomChildComponent = require('./CustomChildComponent.js')

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

class MessageBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      callbackButton: 'Show Alert with Avatar and Callback (Error Type)'
    }
  }

  componentDidMount () {
    // Register the alert located on this master page
    MessageBarManager.registerMessageBar(this.refs.alert)
  }

  componentWillUnmount () {
    // Remove the alert located on this master page from te manager
    MessageBarManager.unregisterMessageBar()
  }

  showSimpleAlert () {
    // Title or Message is at least Mandatory
    // alertType is not Mandatory, but if no alertType provided, 'info' (blue color) will picked for you

    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      message: 'This is a simple alert',
      alertType: 'success'
    })
  }

  showSimpleAlertMessage () {
    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      message: 'This is a simple alert with a message.',
      alertType: 'extra',
      animationType: 'SlideFromLeft',
      position: 'bottom'
    })
  }

  showSimpleAlertWithMessage () {
    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      title: 'Caution !',
      message: 'This is a simple alert with a title and a message',
      alertType: 'warning'
    })
  }

  showAlertWithAvatar () {
    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      title: 'John Doe',
      message: 'Hello, how are you?',
      avatar: 'https://image.freepik.com/free-icon/super-simple-avatar_318-1018.jpg',
      alertType: 'info'
    })
  }

  showAlertWithCallback () {
    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      title: 'This is an alert with a callback function',
      message: 'Tap on the alert to execute the callback you passed in parameter',
      avatar: 'http://www.icon100.com/up/4250/128/83-circle-error.png', // eg. for remote image file, use the following   avatar: require('./image.jpg'),
      alertType: 'error',
      duration: 5000,
      onTapped: this.customCallback.bind(this)
    })
  }

  showAlertFromThrowError () {
    try {
      // Do something risky
      throw new Error(
        'This is a custom error message.\rThis message is shown from a throw new Error.\rYou can use this technique to catch any error in try/catch block or in promises.'
      )
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError (error) {
    MessageBarManager.showAlert({
      title: 'Error',
      message: error.message,
      alertType: 'error',
      messageNumberOfLines: 0
    })
  }

  customCallback () {
    console.log('Alert Tapped. Triggered as a callback')

    this.setState({
      callbackButton: 'Alert Tapped. Triggered as a callback'
    })
  }

  hideCurrentAlert () {
    // Hide the current alert bar
    MessageBarManager.hideAlert()
  }

  alertShow () {
    console.log('Alert is shown. Triggered as a callback')
  }

  alertHide () {
    console.log('Alert is now hidden. Triggered as a callback')
  }

  render () {
    return (
      <View style={styles.container}>

        {
          // Otherwise, You can directly declare a MessageBar alert with its properties and display it by using its reference this.refs.alert.showMessageBarAlert()
          // <MessageBarAlert ref="alert"
          //   /* Cusomisation of the alert: Title, Message, Icon URL, Alert Type (error, success, warning, info), Duration for Alert keep shown */
          //   title={this.state.alertTitle} // Title of the alert
          //   message={this.state.alertMessage} // Message of the alert
          //   avatar={this.state.alertIconUrl} // Avatar/Icon URL of the alert
          //   type={this.state.alertType} // Alert Type: you can select one of 'success', 'error', 'warning', 'error', or 'custom' (use custom if you use a 5th stylesheet, all are customizable). Default is 'info'
          //   duration={this.state.alertDuration} // Number of ms the alert is displayed. Default is 3000 ms (3 seconds)
          //
          //   /* Hide setters */
          //   shouldHideAfterDelay={true} // Define if the MessabeBar should hidden after the `duration`. Please refer yourself to the documentation for component behaviour outputs by setting these 2 properties
          //   shouldHideOnTap={true} // Define if the MessabeBar should be hidden when user tap the alert. Please refer yourself to the documentation for component behaviour outputs by setting these 2 properties
          //
          //   /* Callbacks method on Alert Tapped, on Alert Show, on Alert Hide */
          //   onTapped={this.state.alertCallback} // This function is executed on alert tap
          //   onShow={this.alertShow.bind(this)} // This function is executed when alert is shown
          //   onHide={this.alertHide.bind(this)} // This function is executed when alert is hidden
          //
          //   /* Customize the stylesheets and/or provide an additional one 'extra' */
          //   stylesheetInfo = {{ backgroundColor : '#007bff', strokeColor : '#006acd' }}// Default are blue colors
          //   stylesheetSuccess = {{ backgroundColor : 'darkgreen', strokeColor : '#b40000' }} // Default are Green colors
          //   stylesheetWarning = {{ backgroundColor : '#ff9c00', strokeColor : '#f29400' }} // Default are orange colors
          //   stylesheetError = {{ backgroundColor : '#ff3232', strokeColor : '#FF0000' }} // Default are red colors
          //   stylesheetExtra = {{ backgroundColor : 'black', strokeColor : 'gray' }} // Default are blue colors, same as info
          //
          //   /* Customize the duration of the animation */
          //   durationToShow = {500} // Default is 350
          //   durationToHide = {300} // Default is 350
          //
          //   /* Offset of the View, useful if you have a navigation bar or if you want the alert be shown below another component instead of the top of the screen */
          //   viewTopOffset = {0} // Default is 0
          //   viewLeftOffset = {0} // Default is 0
          //   viewRightOffset = {0} // Default is 0
          //
          //   /* Inset of the view, useful if you want to apply a padding at your alert content */
          //   viewTopInset = {15} // Default is 0
          //   viewLeftInset = {0} // Default is 0
          //   viewRightInset = {0} // Default is 0
          //
          //   /* Number of Lines for Title and Message */
          //   titleNumberOfLines={1}
          //   messageNumberOfLines={0} // Unlimited number of lines
          //
          //   /* Style for the text elements and the avatar */
          //   titleStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
          //   messageStyle={{ color: 'white', fontSize: 16 }}
          //   avatarStyle={{ height: 40, width: 40, borderRadius: 20 }}
          //   />
        }

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.showSimpleAlert()
          }}>
          <Text style={[styles.button, { backgroundColor: 'darkgreen' }]}>
            Show Simple Alert, title only (Success Type)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.showSimpleAlertMessage()
          }}>
          <Text style={[styles.button, { backgroundColor: 'black' }]}>
            Show Simple Alert, message only (Extra StyleSheet Type)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.showSimpleAlertWithMessage()
          }}>
          <Text style={[styles.button, { backgroundColor: '#ff9c00' }]}>
            Show Simple Alert with Message (Warning Type)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.showAlertWithAvatar()
          }}>
          <Text style={[styles.button, { backgroundColor: '#007bff' }]}>
            Show Alert with Avatar (Info Type)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.showAlertWithCallback()
          }}>
          <Text style={[styles.button, { backgroundColor: '#ff3232' }]}>
            {' '}{this.state.callbackButton}{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.showAlertFromThrowError()
          }}>
          <Text style={[styles.button, { backgroundColor: '#ff6666' }]}>
            Show Alert from throw Error
          </Text>
        </TouchableOpacity>

        <CustomChildComponent />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.hideCurrentAlert()
          }}>
          <Text style={[styles.button, { backgroundColor: 'darkgray' }]}>
            Hide Current Alert
          </Text>
        </TouchableOpacity>

        <MessageBarAlert ref='alert' />
      </View>
    )
  }
}

module.exports = MessageBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  buttonContainer: {
    alignSelf: 'stretch'
  },
  button: {
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    margin: 10
  }
})
