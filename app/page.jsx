'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import ComponentEditor from '@/components/editor/Editor';
import ComponentPreview from '@/components/renderer/ComponentPreview';
import useEditor from '@/hooks/editor/useEditor';
import { useHotkeys } from 'react-hotkeys-hook';
import SettingsPanel from '@/components/settingsPanel/Settings';
import { commandManager } from '@/utils/commands';
import { useNotificationStore } from '@/stores/notificationStore';

export default function Home() {
  const { code, onEditorChange, triggerRender, setTriggerRender } = useEditor();
  const componentPreviewRef = useRef(null);
  const editorRef = useRef(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { addCommandNotification } = useNotificationStore();

  useHotkeys('alt+enter', () => {
    setTriggerRender((render) => !render);
  });


  useEffect(() => {
    if (isSettingsOpen) {
      gsap.to([editorRef.current, componentPreviewRef.current], {
        x: 384, // Match the w-96 width (96 * 4px = 384px)
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to([editorRef.current, componentPreviewRef.current], {
        x: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isSettingsOpen]);

  return (
    <main className="flex h-screen overflow-hidden">
      <div className="fixed left-0 w-96 h-full z-10">
        {isSettingsOpen && <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />}
      </div>
      
      <section 
        id="editorLayout" 
        className="flex flex-1 w-full"
        style={{ width: isSettingsOpen ? 'calc(100% + 384px)' : '100%' }}
      >
        <div ref={editorRef} className="w-1/2 border-r flex flex-col relative h-full">
          <ComponentEditor
            code={code}
            onEditorChange={onEditorChange}
            setTriggerRender={setTriggerRender}
            isSettingsOpen={isSettingsOpen}
            setIsSettingsOpen={setIsSettingsOpen}
          />
        </div>
        
        <div ref={componentPreviewRef} className="w-1/2 flex flex-col overflow-y-hidden h-full">
          <ComponentPreview code={code} triggerRender={triggerRender} />
        </div>
      </section>
      
    </main>
  );
}