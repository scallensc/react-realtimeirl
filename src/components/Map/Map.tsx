import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import DateTime from '@components/DateTime';

import flagStore from '@store/flagStore';
import globalStore from '@store/globalStore';
import keyStore from '@store/keyStore';

import './Map.scss';

interface IPulsingDot {
  width: number;
  height: number;
  data: Uint8ClampedArray;
  context?: CanvasRenderingContext2D | null;
  onAdd: () => void;
  render: () => boolean;
}

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map3D, setMap3D] = useState<mapboxgl.Map | null>(null);

  const { hideMap, mapFollowsHeading, mapHasBorder, mapIs3d, mapIsCircular, mapZoom, pulseMarker, timeAtBottom } = flagStore.get();
  const { heading, location, theme } = globalStore.get();
  const { mapboxKey } = keyStore.get();

  mapboxgl.accessToken = mapboxKey;

  useEffect(() => {
    if (mapContainer.current) {
      mapContainer.current.innerHTML = '';
      const map = new mapboxgl.Map({
        style: theme,
        center: [location.longitude, location.latitude],
        zoom: parseInt(mapZoom),
        pitch: mapIs3d ? 45 : 0,
        bearing: mapFollowsHeading ? heading : 0,
        container: mapContainer.current,
        antialias: true,
        attributionControl: false,
      });
      const size = 100;
      const pulsingDot: IPulsingDot = {
        width: size,
        height: size,
        data: new Uint8ClampedArray(size * size * 4),

        onAdd: function () {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d', { willReadFrequently: true });
        },

        render: function () {
          const duration = 1500;
          const t = (performance.now() % duration) / duration;

          const radius = (size / 2) * 0.3;
          const outerRadius = (size / 2) * 0.3 * t + radius;

          if (this.context) {
            const context = this.context;
            const colours = {
              mainFill: 'rgba(0, 255, 255, 1)',
              outerFill: 'rgba(96, 96, 96, 1)',
              pulse: { red: 96, green: 96, blue: 96, alpha: 1 }
            }
            if (pulseMarker) {
              // Draw the outer circle.
              context.clearRect(0, 0, this.width, this.height);
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
              context.fillStyle = `rgba(${colours.pulse.red}, ${colours.pulse.green}, ${colours.pulse.blue}, ${colours.pulse.alpha - t})`;
              context.fill();
            }
            // Draw the inner circle.
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = colours.mainFill;
            context.strokeStyle = colours.outerFill;
            context.lineWidth = 1 + 4 * (1 - t);
            context.fill();
            pulseMarker && context.stroke();

            this.data = context.getImageData(0, 0, this.width, this.height).data;
            map.triggerRepaint();

            return true;
          }
          return false;
        }
      };

      map.on('load', () => {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

        map.addSource('dot-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [location.longitude, location.latitude]
              },
              properties: {}
            }]
          }
        });

        map.addLayer({
          id: 'layer-with-pulsing-dot',
          type: 'symbol',
          source: 'dot-point',
          layout: {
            'icon-image': 'pulsing-dot'
          }
        });

        map.on('move', () => {
          const newCenter = map.getCenter();
          const source = map.getSource('dot-point') as mapboxgl.GeoJSONSource;
          if (source) {
            source.setData({
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [newCenter.lng, newCenter.lat]
                },
                properties: {}
              }]
            });
          }
        });

        mapIs3d && map.addLayer(
          {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 0,
            'paint': {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.7
            }
          },
        );
      });
      setMap3D(map);
    }

    return () => {
      map3D?.remove();
      setMap3D(null)
    };
  }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (map3D) {
      map3D.easeTo({
        center: [location.longitude, location.latitude],
        zoom: parseInt(mapZoom),
        bearing: mapFollowsHeading ? heading : 0,
      });
    }
  }, [location, heading, mapZoom]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="map-container">
      {timeAtBottom ? <div /> : <DateTime />}
      <div className="map3d-container"
        ref={mapContainer}
        style={{
          borderRadius: mapIsCircular ? "50%" : "0%",
          border: mapHasBorder ? "2px solid #333" : "none",
          display: hideMap ? 'none' : ''
        }}
      >
      </div>
      {timeAtBottom ? <DateTime /> : <div />}
    </div>
  );
};

export default Map;