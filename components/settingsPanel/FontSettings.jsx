'use client';

import { useConfigurationStore } from '@/stores/configurationStore';
import RangeSlider from '@/components/generalComponents/RangeSlider';
import { getStrings } from '@/utils/strings';

const FontSettings = () => {
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);
  const setEditorConfiguration = useConfigurationStore((state) => state.setEditorConfiguration);
  
  const strings = getStrings('es').ui_strings.settings.font;
  
  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 flex-1">
        <RangeSlider
          value={editorConfig.fontSize}
          onChange={(value) => setEditorConfiguration({ fontSize: value })}
          min={10}
          max={24}
          label={strings.fontSize}
          unit="px"
        />
        
        <RangeSlider
          value={editorConfig.letterSpacing}
          onChange={(value) => setEditorConfiguration({ letterSpacing: value })}
          min={-2}
          max={5}
          step={0.5}
          label={strings.letterSpacing}
          unit="px"
        />
      </div>
    </div>
  );
};

export default FontSettings;