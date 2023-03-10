import React from "react";
import { asset } from "react-360";

export default class Kirby extends React.Component {
    render(){
        return (
            <Entity 
                source = {{
                    obj: asset('info-icon-23815.png'),
                    mtl: asset('info-icon-23815.png')
                }}
                style={{
                    transform: [
                        { rotateY: 300 },
                        { translateX: 50 },
                        { translateY: -30 },
                        { translateZ: -350 },
                        { scaleY: 150 },
                        { scaleX: 150 }
                    ]
                }}
            />
        )
    }
}