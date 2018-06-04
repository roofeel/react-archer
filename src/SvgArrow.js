import React from 'react';
import PropTypes from 'prop-types';

function computeEndingArrowDirectionVector(endingAnchor) {
  switch (endingAnchor) {
    case 'left':
      return { arrowX: -1, arrowY: 0 };
    case 'right':
      return { arrowX: 1, arrowY: 0 };
    case 'top':
      return { arrowX: 0, arrowY: -1 };
    case 'bottom':
      return { arrowX: 0, arrowY: 1 };
    default:
      return { arrowX: 0, arrowY: 0 };
  }
}

function computeStartingArrowDirectionVector(startingAnchor) {
  switch (startingAnchor) {
    case 'left':
      return { arrowX: -1, arrowY: 0 };
    case 'right':
      return { arrowX: 1, arrowY: 0 };
    case 'top':
      return { arrowX: 0, arrowY: -1 };
    case 'bottom':
      return { arrowX: 0, arrowY: 1 };
    default:
      return { arrowX: 0, arrowY: 0 };
  }
}

export function computeEndingPointAccordingToArrow(
  xEnd,
  yEnd,
  arrowLength,
  strokeWidth,
  endingAnchor,
) {
  const { arrowX, arrowY } = computeEndingArrowDirectionVector(endingAnchor);

  const xe = xEnd + arrowX * arrowLength * strokeWidth / 2;
  const ye = yEnd + arrowY * arrowLength * strokeWidth / 2;

  return { xe, ye };
}

export function computeStartingPointAccordingToArrow(
  xStart,
  yStart,
  arrowLength,
  strokeWidth,
  startingAnchor,
) {
  const { arrowX, arrowY } = computeStartingArrowDirectionVector(startingAnchor);

  const xs = xStart + arrowX * arrowLength * strokeWidth / 2;
  const ys = yStart + arrowY * arrowLength * strokeWidth / 2;

  return { xs, ys };
}

const SvgArrow = ({
  startingPoint,
  startingAnchor,
  endingPoint,
  endingAnchor,
  startArrow,
  strokeColor,
  arrowLength,
  strokeWidth,
}) => {
  const actualArrowLength = arrowLength * 2;

  const { xs, ys } = computeStartingPointAccordingToArrow(
    startingPoint.x,
    startingPoint.y,
    actualArrowLength,
    strokeWidth,
    startingAnchor,
  );

  const { xe, ye } = computeEndingPointAccordingToArrow(
    endingPoint.x,
    endingPoint.y,
    actualArrowLength,
    strokeWidth,
    endingAnchor,
  );

  const pathString =
    `M${xs},${ys} ` + `L${xe},${ye}`;

  return (
    <path
      d={pathString}
      style={{ fill: 'none', stroke: strokeColor, strokeWidth }}
      markerEnd={`url(${location.href}#arrow)`}
      markerStart={startArrow ? `url(${location.href}#arrow-start)` : null}
    />
  );
};

const pointPropType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
});

const anchorType = PropTypes.oneOf(['top', 'bottom', 'left', 'right']);

SvgArrow.propTypes = {
  startingPoint: pointPropType,
  startingAnchor: anchorType,
  endingPoint: pointPropType,
  endingAnchor: anchorType,
  strokeColor: PropTypes.string,
  arrowLength: PropTypes.number,
  strokeWidth: PropTypes.number,
};

export default SvgArrow;
