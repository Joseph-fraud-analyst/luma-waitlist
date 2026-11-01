import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { Logo } from '../branding/Logo';
import './common.css';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Logo />
      <Link className="site-header__link" to={site.routes.privacy}>
        Privacy Policy
      </Link>
    </header>
  );
}
