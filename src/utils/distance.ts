export const caculateDistance = ({
  lat1,
  lat2,
  lon1,
  lon2,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
};

export const getSquare = ({ lat1, lon1, d }: { lat1: number; lon1: number; d: number }) => {
  // get lon
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const Δλ = 2 * Math.asin(Math.sin(d / (2 * R)) / Math.cos(φ1));
  const λ2 = (lon1 * Math.PI) / 180 + Δλ;

  const lon2Right = (λ2 * 180) / Math.PI; // convert to degrees
  const lon2Left = 2 * lon1 - lon2Right; // convert to degrees

  // get lat

  const lat1Rad = (lat1 * Math.PI) / 180; // convert latitude to radians
  const lon1Rad = (lon1 * Math.PI) / 180; // convert longitude to radians
  const dRad = d / R; // convert distance to radians

  const lat2Rad = Math.asin(
    Math.sin(lat1Rad) * Math.cos(dRad) + Math.cos(lat1Rad) * Math.sin(dRad) * Math.sin(lon1Rad),
  );

  const lat2Top = (lat2Rad * 180) / Math.PI; // convert to degrees
  const lat2Bot = 2 * lat1 - lat2Top; // convert to degrees
  return {
    lon2Right,
    lon2Left,
    lat2Top,
    lat2Bot,
  };
};
