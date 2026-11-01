import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { Orb } from './Orb';
import './branding.css';

export function Logo() {
  return (
    <Link className="logo" to={site.routes.home} aria-label={`${site.name} home`}>
      <Orb />
      <span className="logo__text">{site.name}</span>
    </Link>
  );
}
