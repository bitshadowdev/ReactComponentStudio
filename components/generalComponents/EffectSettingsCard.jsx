import SettingsCard from '@/components/generalComponents/SettingsCard';
import Toggle from '@/components/generalComponents/Toggle';
import RangeSlider from '@/components/generalComponents/RangeSlider';

export const EffectSettingsCard = ({ 
  title, 
  enabled, 
  onToggle, 
  children,
  disabled = false
}) => {
  return (
    <SettingsCard>
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        <Toggle
          label="Habilitar"
          checked={enabled}
          onChange={onToggle}
          disabled={disabled}
        />
        {enabled && !disabled && children}
      </div>
    </SettingsCard>
  );
};

export default EffectSettingsCard;
