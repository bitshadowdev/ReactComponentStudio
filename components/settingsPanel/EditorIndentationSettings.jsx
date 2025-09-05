'use client';

import { useState, useEffect } from 'react';
import { useConfigurationStore } from '@/stores/configurationStore';
import { useEditorStore } from '@/stores/editorStore';
import { commandManager, ReindentCommand } from '@/utils/commands';
import RangeSlider from '@/components/generalComponents/RangeSlider';
import { InteractiveElement } from '@/components/animationWrappers';
import { getStrings } from '@/utils/strings';

const EditorIndentationSettings = () => {
  const [pendingChanges, setPendingChanges] = useState(false);
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);
  const [lastAppliedTabSize, setLastAppliedTabSize] = useState(editorConfig.tabSize);
  const [lastAppliedIndentUnit, setLastAppliedIndentUnit] = useState(editorConfig.indentUnit);

  const setEditorConfiguration = useConfigurationStore((state) => state.setEditorConfiguration);

  const strings = getStrings('es').ui_strings.settings.editorBehavior;


  // Check if there are pending changes to apply
  useEffect(() => {
    if (!editorConfig) return;

    const hasChanges =
      editorConfig.tabSize !== lastAppliedTabSize ||
      editorConfig.indentUnit !== lastAppliedIndentUnit;
    setPendingChanges(hasChanges);
  }, [editorConfig, lastAppliedTabSize, lastAppliedIndentUnit]);

  const handleApplyIndentation = () => {
    if (!pendingChanges) return;

    // Create and execute the reindent command
    const command = new ReindentCommand(
      editorConfig.tabSize,
      editorConfig.useTabs
    );

    const changesMade = commandManager.executeCommand(command);

    if (changesMade) {
      setLastAppliedTabSize(editorConfig.tabSize);
      setLastAppliedIndentUnit(editorConfig.indentUnit);
      setPendingChanges(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 flex-1">
        <RangeSlider
          value={editorConfig.tabSize}
          onChange={(value) => setEditorConfiguration({ tabSize: value })}
          min={1}
          max={8}
          label={strings.tabSize}
        />

        <RangeSlider
          value={editorConfig.indentUnit}
          onChange={(value) => setEditorConfiguration({ indentUnit: value })}
          min={1}
          max={8}
          label={strings.indentUnit}
        />

        <div className="pt-2">
          <InteractiveElement
            enableParticles={true}
            enableSelection={true}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              pendingChanges
                ? 'bg-black text-white border border-black hover:bg-gray-800'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleApplyIndentation}
            style={{ pointerEvents: pendingChanges ? 'auto' : 'none' }}
          >
            {strings.reindentButton}
          </InteractiveElement>
        </div>
      </div>
    </div>
  );
};

export default EditorIndentationSettings;
