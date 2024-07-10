import { cardio } from 'ldrs';
import './Loader.scss';

cardio.register();

export default function Loader() {
  return (
    <div className="loader-container">
      <l-cardio
        size="100"
        stroke="6"
        speed="4"
        color="black"
      ></l-cardio>
    </div>
  );
}
