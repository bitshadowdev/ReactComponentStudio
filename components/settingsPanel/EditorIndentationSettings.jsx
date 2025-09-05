import { InteractiveElement } from '@/components/animationWrappers';
import RangeSlider from '@/components/generalComponents/RangeSlider';
import { getStrings } from '@/utils/strings';
import useIndentationSettings from '@/hooks/editor/useIndentationSettings';

const EditorIndentationSettings = () => {
  const strings = getStrings('es').ui_strings.settings.editorBehavior;
  const {
    pendingChanges,
    tabSize,
    indentUnit,
    setTabSize,
    setIndentUnit,
    handleApplyIndentation
  } = useIndentationSettings();

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-6">
        <RangeSlider
          value={tabSize}
          onChange={setTabSize}
          min={1}
          max={8}
          label={strings.tabSize}
        />

        <RangeSlider
          value={indentUnit}
          onChange={setIndentUnit}
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
