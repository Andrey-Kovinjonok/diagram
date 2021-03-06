import * as React from 'react';
import { MiniMapType } from './types/MiniMap';
import * as styles from './style/MiniMap';
import * as cx from 'classnames';
export class MiniMap extends React.Component<MiniMapType> {
  render() {
    const {
      nodes,
      width = 100,
      height = 200,
      padding = 10,
      pan,
      graphWidth,
      graphHeight,
      scale
    } = this.props;
    const boundingBoxXValues = nodes.map((n) => n.x);
    const boundingBoxYValues = nodes.map((n) => n.y);
    const boundingBox = {
      x: {
        min: Math.min.apply(Math, boundingBoxXValues),
        max: Math.max.apply(Math, boundingBoxXValues)
      },
      y: {
        min: Math.min.apply(Math, boundingBoxYValues),
        max: Math.max.apply(Math, boundingBoxYValues)
      }
    };
    const xWidth = Math.abs(boundingBox.x.min - boundingBox.x.max);
    const yWidth = Math.abs(boundingBox.y.min - boundingBox.y.max);
    const center = {
      x: graphWidth / 2.0,
      y: graphHeight / 2.0
    };

    const mainWidth = width - padding * 2;
    const mainHeight = height - padding * 2;

    const panX = center.x - pan.x;
    const panY = center.y - pan.y;

    let panPositionX = padding + Math.abs(boundingBox.x.min - panX/scale) / xWidth * mainWidth;
    let panPositionY = padding + Math.abs(boundingBox.y.min - panY/scale) / yWidth * mainHeight;

    let areaWidth = Math.min(graphWidth / xWidth, 1.0) * mainWidth * 1.0/scale;
    let areaHeight = Math.min(graphHeight / yWidth, 1.0) * mainHeight * 1.0/scale;

    return (
      <div
        className={styles.MiniMap}
        style={{
          width,
          height
        }}
      >
        {this.props.nodes.map((n) => (
          <div
            key={n.id}
            className={cx({
              [styles.MiniMapElementSelected]: n.selected,
              [styles.MiniMapElement]: true
            })}
            style={{
              left: padding + Math.abs(boundingBox.x.min - n.x) / xWidth * mainWidth,
              top: padding + Math.abs(boundingBox.y.min - n.y) / yWidth * mainHeight
            }}
          />
        ))}
        <div
          className={styles.MiniMapWhere}
          style={{
            width: areaWidth,
            height: areaHeight,
            left: panPositionX - areaWidth / 2.0,
            top: panPositionY - areaHeight / 2.0
          }}
        />
      </div>
    );
  }
}
