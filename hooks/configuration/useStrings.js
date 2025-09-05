'use client';

import { getStrings } from '@/utils/strings';
import { useConfigurationStore } from '@/stores/configurationStore';

export const useStrings = () => {
  const language = useConfigurationStore(state => state.configuration.language);
  const strings = getStrings(language);
  
  return {
    strings, // Expone todos los strings
    currentLanguage: language
  };
};
