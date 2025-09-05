import { keyboardConfig } from './config';

export const handleKeyUp = (event, setTriggerRender) => {
  const { shortcuts } = keyboardConfig;
  const renderShortcut = shortcuts.render;

  if (event.altKey && event.key === renderShortcut.key) {
    event.preventDefault();
    setTriggerRender((render) => !render);
  }
};
