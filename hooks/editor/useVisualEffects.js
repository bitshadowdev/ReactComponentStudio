import { useConfigurationStore } from '@/stores/configurationStore';

const useVisualEffects = () => {
  const visualEffects = useConfigurationStore((state) => state.configuration.visualEffects);
  const {
    setVisualEffectsConfiguration,
    setParticleEffects,
    setDrawerAnimations,
    setSelectionEffects
  } = useConfigurationStore();

  return {
    visualEffects,
    setVisualEffectsConfiguration,
    setParticleEffects,
    setDrawerAnimations,
    setSelectionEffects
  };
};

export default useVisualEffects;
