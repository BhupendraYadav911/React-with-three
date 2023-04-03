import React from 'react';
import { AppRegistry, StyleSheet, View, VrButton, Text, Animated, Image, asset } from 'react-vr';
class ThankPage extends React.Component {


    constructor() {
        super()
    }
    render() {
        return (
            <View style={{
                //flexDirection: 'column',
                padding: 0.11,
                backgroundColor: "#fff",
                flexDirection: 'row',
                position: 'absolute',
                borderRadius: 0.10,
            }}>
                <Animated.View style={{
                    flexDirection: 'row',
                    padding: 0.11,
                    backgroundColor: "red",
                }}>
                    <Image
                        style={{
                            width: 0.2,
                            height: 0.2,
                        }}
                        source={asset('0402f191875dee6fa4cdec21c5a0bd1a.png')}
                    />
                    <Text style={{
                        fontSize: 0.2,
                        color: '#000'
                    }}>Thanks!
                    </Text>
                </Animated.View>
                <Animated.View style={{
                    flexDirection: 'row',
                    padding: 0.11,
                    backgroundColor: "#fff",
                    with:'100%'
                }}>
                    <VrButton style={{ paddingLeft: 0.02, paddingrighit: 0.02 }}>
                        <Text style={{
                            backgroundColor: "blue",
                        }}>OK</Text>
                    </VrButton>
                </Animated.View>

            </View >
        )
    }
};
const styles = StyleSheet.create({
    tooltipText: {
        color: 'white',
        fontSize: 0.08,
        fontWeight: '400',
        textAlign: 'center',
    },
});
export default ThankPage;