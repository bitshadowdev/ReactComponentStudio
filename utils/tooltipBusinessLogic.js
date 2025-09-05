export const calculateTooltipPosition = (position, distance, triggerRect, tooltipWidth, tooltipHeight) => {
  switch (position) {
    case 'top':
      return {
        top: triggerRect.top - tooltipHeight - distance,
        left: triggerRect.left + triggerRect.width / 2,
      };
    case 'bottom':
      return {
        top: triggerRect.bottom + distance,
        left: triggerRect.left + triggerRect.width / 2,
      };
    case 'left':
      return {
        top: triggerRect.top + triggerRect.height / 2,
        left: triggerRect.left - tooltipWidth - distance,
      };
    case 'right':
      return {
        top: triggerRect.top + triggerRect.height / 2,
        left: triggerRect.right + distance,
      };
    default:
      return {
        top: triggerRect.bottom + distance,
        left: triggerRect.left + triggerRect.width / 2,
      };
  }
};

export const getTransformStyle = (position) => {
  switch (position) {
    case 'top':
    case 'bottom':
      return 'translateX(-50%)';
    case 'left':
      return 'translate(-100%, -50%)';
    case 'right':
      return 'translateY(-50%)';
    default:
      return 'translateX(-50%)';
  }
};

export const createMouseHandlers = (updateMessage, setIsVisible) => ({
  handleMouseEnter: (message) => {
    updateMessage(message);
    setIsVisible(true);
  },
  handleMouseLeave: () => {
    setIsVisible(false);
  }
});


export const TooltipPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
};
