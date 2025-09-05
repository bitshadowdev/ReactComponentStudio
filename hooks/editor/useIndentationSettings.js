import { useState, useEffect } from 'react';
import { useConfigurationStore } from '@/stores/configurationStore';
import { commandManager, ReindentCommand } from '@/utils/commands';

const useIndentationSettings = () => {
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);
  const [lastAppliedTabSize, setLastAppliedTabSize] = useState(editorConfig.tabSize);
  const [lastAppliedIndentUnit, setLastAppliedIndentUnit] = useState(editorConfig.indentUnit);
  const [pendingChanges, setPendingChanges] = useState(false);
  const setEditorConfiguration = useConfigurationStore((state) => state.setEditorConfiguration);

  useEffect(() => {
    if (!editorConfig) return;

    const hasChanges =
      editorConfig.tabSize !== lastAppliedTabSize ||
      editorConfig.indentUnit !== lastAppliedIndentUnit;
    setPendingChanges(hasChanges);
  }, [editorConfig, lastAppliedTabSize, lastAppliedIndentUnit]);

  const handleApplyIndentation = () => {
    if (!pendingChanges) return false;

    const command = new ReindentCommand(
      editorConfig.tabSize,
      editorConfig.useTabs
    );

    const changesMade = commandManager.executeCommand(command);

    if (changesMade) {
      setLastAppliedTabSize(editorConfig.tabSize);
      setLastAppliedIndentUnit(editorConfig.indentUnit);
      setPendingChanges(false);
      return true;
    }
    return false;
  };

  return {
    pendingChanges,
    tabSize: editorConfig.tabSize,
    indentUnit: editorConfig.indentUnit,
    setTabSize: (value) => setEditorConfiguration({ tabSize: value }),
    setIndentUnit: (value) => setEditorConfiguration({ indentUnit: value }),
    handleApplyIndentation
  };
};

export default useIndentationSettings;
