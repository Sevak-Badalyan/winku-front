import { cardio } from 'ldrs';
import './Loader.scss';

cardio.register();

export default function Loader() {
  return (
    <div className="loader-container">
      <l-cardio
        size="50"
        stroke="4"
        speed="2"
        color="black"
      ></l-cardio>
    </div>
  );
}
