import { HeatScene } from './Heatscene';
import { WindScene } from './Windscene';
import './scenes.css';

/** Two ambient illustrations beside the waitlist: wind on the left, heat on the right. */
export function WeatherScenes() {
  return (
    <div className="weather" aria-hidden="true">
      <div className="weather__scene weather__scene--left">
        <WindScene />
      </div>
      <div className="weather__scene weather__scene--right">
        <HeatScene />
      </div>
    </div>
  );
}