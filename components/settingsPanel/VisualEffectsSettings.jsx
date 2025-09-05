'use client';

import useVisualEffects from '@/hooks/editor/useVisualEffects';
import { getStrings } from '@/utils/strings';
import SettingsCard from '@/components/generalComponents/SettingsCard';
import Toggle from '@/components/generalComponents/Toggle';
import RangeSlider from '@/components/generalComponents/RangeSlider';
import EffectSettingsCard from '@/components/generalComponents/EffectSettingsCard';

const VisualEffectsSettings = () => {
  const {
    visualEffects,
    setVisualEffectsConfiguration,
    setParticleEffects,
    setDrawerAnimations,
    setSelectionEffects
  } = useVisualEffects();

  const strings = getStrings('es').ui_strings.settings.visualEffects 

  const particleThemes = [
    { id: 'light', name: 'Claro (Negro → Gris)', description: 'Para fondos claros' },
    { id: 'dark', name: 'Oscuro (Blanco → Gris)', description: 'Para fondos oscuros' },
    { id: 'accent', name: 'Acento (Gris intenso)', description: 'Color neutro universal' }
  ];

  const easingOptions = [
    { id: 'power1.out', name: 'Suave', description: 'Animación ligera' },
    { id: 'power2.out', name: 'Estándar', description: 'Animación equilibrada' },
    { id: 'power3.out', name: 'Fluido', description: 'Animación rápida' },
    { id: 'back.out', name: 'Rebote', description: 'Con efecto de rebote' }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 flex-1">
        
        {/* Control principal de efectos visuales */}
        <SettingsCard>
          <h3 className="text-base font-semibold text-gray-900 mb-4">{strings.mainTitle}</h3>
          <Toggle
            label={strings.enabledLabel}
            description={strings.enabledDescription}
            checked={visualEffects.enabled}
            onChange={(enabled) => setVisualEffectsConfiguration({ enabled })}
          />
        </SettingsCard>

        {/* Configuración de partículas */}
        <EffectSettingsCard 
          title={strings.particlesTitle}
          enabled={visualEffects.particleEffects.enabled}
          onToggle={(enabled) => setParticleEffects({ enabled })}
          disabled={!visualEffects.enabled}
        >
          {visualEffects.particleEffects.enabled && visualEffects.enabled && (
            <>
              <RangeSlider
                label={strings.particleCount}
                min={6}
                max={24}
                step={2}
                value={visualEffects.particleEffects.count}
                onChange={(count) => setParticleEffects({ count })}
                unit="partículas"
              />

              <RangeSlider
                label={strings.particleSize}
                min={2}
                max={8}
                step={1}
                value={visualEffects.particleEffects.size}
                onChange={(size) => setParticleEffects({ size })}
                unit="px"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {strings.particleTheme}
                </label>
                <div className="space-y-2">
                  {particleThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-3 border rounded-settings cursor-pointer transition-all duration-200 ${
                        visualEffects.particleEffects.theme === theme.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setParticleEffects({ theme: theme.id })}
                    >
                      <div className="font-medium text-sm">{theme.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{theme.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <RangeSlider
                label={strings.particleSpread}
                min={20}
                max={80}
                step={5}
                value={visualEffects.particleEffects.spreadRadius}
                onChange={(spreadRadius) => setParticleEffects({ spreadRadius })}
                unit="px"
              />

              <RangeSlider
                label={strings.particleDuration}
                min={300}
                max={1200}
                step={50}
                value={visualEffects.particleEffects.duration}
                onChange={(duration) => setParticleEffects({ duration })}
                unit="ms"
              />
            </>
          )}
        </EffectSettingsCard>

        {/* Configuración de animaciones de cajón */}
        <EffectSettingsCard 
          title={strings.drawerTitle}
          enabled={visualEffects.drawerAnimations.enabled}
          onToggle={(enabled) => setDrawerAnimations({ enabled })}
          disabled={!visualEffects.enabled}
        >
          {visualEffects.drawerAnimations.enabled && visualEffects.enabled && (
            <>
              <RangeSlider
                label={strings.drawerDuration}
                min={200}
                max={800}
                step={50}
                value={visualEffects.drawerAnimations.duration}
                onChange={(duration) => setDrawerAnimations({ duration })}
                unit="ms"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {strings.drawerEasing}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {easingOptions.map((easing) => (
                    <div
                      key={easing.id}
                      className={`p-3 border rounded-settings cursor-pointer transition-all duration-200 ${
                        visualEffects.drawerAnimations.easing === easing.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setDrawerAnimations({ easing: easing.id })}
                    >
                      <div className="font-medium text-sm">{easing.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{easing.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </EffectSettingsCard>

        {/* Configuración de efectos de selección */}
        <EffectSettingsCard 
          title={strings.selectionTitle}
          enabled={visualEffects.selectionEffects.enabled}
          onToggle={(enabled) => setSelectionEffects({ enabled })}
          disabled={!visualEffects.enabled}
        >
          {visualEffects.selectionEffects.enabled && visualEffects.enabled && (
            <>
              <RangeSlider
                label={strings.selectionDuration}
                min={200}
                max={800}
                step={50}
                value={visualEffects.selectionEffects.duration}
                onChange={(duration) => setSelectionEffects({ duration })}
                unit="ms"
              />

              <RangeSlider
                label={strings.selectionGlow}
                min={0.2}
                max={1.0}
                step={0.1}
                value={visualEffects.selectionEffects.glowIntensity}
                onChange={(glowIntensity) => setSelectionEffects({ glowIntensity })}
                unit=""
              />
            </>
          )}
        </EffectSettingsCard>

        {/* Configuración de accesibilidad */}
        <SettingsCard>
          <h3 className="text-base font-semibold text-gray-900 mb-4">{strings.accessibilityTitle}</h3>
          <Toggle
            label={strings.reducedMotion}
            description={strings.reducedMotionDescription}
            checked={visualEffects.reducedMotion}
            onChange={(reducedMotion) => setVisualEffectsConfiguration({ reducedMotion })}
          />
        </SettingsCard>

      </div>
    </div>
  );
};

export default VisualEffectsSettings;
