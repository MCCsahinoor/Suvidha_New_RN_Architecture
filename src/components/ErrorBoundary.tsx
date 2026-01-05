import React, { Component, ReactNode } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import ButtonLarge from './ButtonLarge';
import { AppImages, Fonts } from '../themes';
import LottieView from 'lottie-react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: any) {
    console.log('Error caught in getDerivedStateFromError:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught in componentDidCatch:', error);
    console.error('Error info:', errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ ...styles.container, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
          {/* Uncomment the following line if you have a valid Lottie animation */}
          <LottieView
            source={{ uri: 'https://bpilmobile.bergerindia.com/VIRTUAL_DOCS/SUVIDHA_API/Application/Application_Image/lotty/error.json' }}
            style={{ width: 120, height: 120, zIndex: 5 }}
            autoPlay
            loop
          />
          <Text style={styles.errorText}>Something went wrong.</Text>
          {this.state.error && (
            <Text style={styles.errorDetails}>{this.state.error.toString()}</Text>
          )}
          <View style={{ width: '48%', marginRight: 5 }}>
            <ButtonLarge
              title={'Back to Home'}
              onPress={this.handleReset}
              fillBtn={true}
              key={'Canel'}
              showIcon={false}
              iconName=""
              paddingVertical={7}
              paddingHorizontal={5}
              fontSize={15}
              iconSize={19}
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: Fonts.OpenSans500Medium
  },
  errorDetails: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: Fonts.poppins400Regular
  },
});

export default ErrorBoundary;