import React from 'react'

export default function Square({color, children}) {
    
    return (
    <div style={{
        backgroundColor: color,
        width: '100%',
        height: '100%',
    }}>
        {children}
    </div>
    );
}