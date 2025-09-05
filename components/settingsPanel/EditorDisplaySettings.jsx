'use client';

import { useConfigurationStore } from '@/stores/configurationStore';
import SettingsCard from '@/components/generalComponents/SettingsCard';
import Toggle from '@/components/generalComponents/Toggle';
import { getStrings } from '@/utils/strings';

const EditorDisplaySettings = () => {
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);
  const setEditorConfiguration = useConfigurationStore((state) => state.setEditorConfiguration);
  
  const strings = getStrings('es').ui_strings.settings.editorBehavior;
  
  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4 flex-1">
        <SettingsCard>
          <Toggle
            checked={editorConfig.lineNumbers}
            onChange={(value) => setEditorConfiguration({ lineNumbers: value })}
            label={strings.lineNumbers}
            description={strings.lineNumbersDesc}
          />
        </SettingsCard>
        
        <SettingsCard>
          <Toggle
            checked={editorConfig.codeFolding}
            onChange={(value) => setEditorConfiguration({ codeFolding: value })}
            label={strings.codeFolding}
            description={strings.codeFoldingDesc}
          />
        </SettingsCard>
        
        <SettingsCard>
          <Toggle
            checked={editorConfig.autocloseBrackets}
            onChange={(value) => setEditorConfiguration({ autocloseBrackets: value })}
            label={strings.autoCloseChars}
            description={strings.autoCloseCharsDesc}
          />
        </SettingsCard>
        
        <SettingsCard>
          <Toggle
            checked={editorConfig.indentWithTabs}
            onChange={(value) => setEditorConfiguration({ indentWithTabs: value })}
            label={strings.useTabs}
            description={strings.useTabsDesc}
          />
        </SettingsCard>
      </div>
    </div>
  );
};

export default EditorDisplaySettings;
