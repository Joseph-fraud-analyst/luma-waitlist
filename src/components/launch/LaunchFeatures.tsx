import { launchContent } from '../../config/launch';
import { MapPinIcon, ShieldCheckIcon, UsersIcon } from './launchIcons';
import './launch.css';

const icons = {
  updates: ShieldCheckIcon,
  support: MapPinIcon,
  services: UsersIcon,
} as const;

export function LaunchFeatures() {
  return (
    <ul className="launch__features">
      {launchContent.features.map((feature) => {
        const Icon = icons[feature.key];
        return (
          <li className="launch__feature" key={feature.key}>
            <Icon className="launch__feature-icon" />
            {feature.label}
          </li>
        );
      })}
    </ul>
  );
}