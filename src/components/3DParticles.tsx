import React, { useEffect } from 'react';
// @ts-ignore
import ParticleField from 'react-particles-webgl';

export const ParticleContainer3D = () => {

    const config = {
        showCube: false,
        dimension: '3D',
        velocity: 0.5,
        boundaryType: 'bounce',
        antialias: false,
        direction: {
          xMin: -1,
          xMax: 1,
          yMin: -1,
          yMax: 1,
          zMin: -1,
          zMax: 1
        },
        lines: {
          colorMode: 'rainbow',
          color: '#351CCB',
          transparency: 0.9,
          limitConnections: true,
          maxConnections: 20,
          minDistance: 150,
          visible: false
        },
        particles: {
          colorMode: 'rainbow',
          color: '#3FB568',
          transparency: 0.9,
          shape: 'square',
          boundingBox: 'canvas',
          count: 150,
          minSize: 10,
          maxSize: 75,
          visible: true
        },
        cameraControls: {
          enabled: true,
          enableDamping: true,
          dampingFactor: 0.4,
          enableZoom: false,
          autoRotate: true,
          autoRotateSpeed: 3,
          resetCameraFlag: false
        }
    }

  return (<div style={{ height: "100vh", width: "100%",  position: "absolute"}}>
    <ParticleField config={config} />
  </div>)
};