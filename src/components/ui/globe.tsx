import { useEffect, useRef, useState } from "react";
import {
  Color,
  Scene,
  Fog,
  PerspectiveCamera,
  Vector3,
  Material,
} from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "../../data/countries.json"; // Ensure this file exists in your project

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

interface GlobeConfig {
  pointSize?: number;
  atmosphereColor?: string;
  showAtmosphere?: boolean;
  atmosphereAltitude?: number;
  polygonColor?: string;
  globeColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string;
  arcAlt?: number;
  order?: number;
}

interface GlobeProps {
  globeConfig?: GlobeConfig;
  data?: ArcData[];
}

export function Globe({ globeConfig, data }: GlobeProps) {
  const globeRef = useRef<any>(null);
  const groupRef = useRef<import("three").Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps: GlobeConfig = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 12.9716, lng: 70.1694 },
    ...globeConfig,
  };

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    globeRef.current
      .arcsData(data)
      .arcStartLat((d: ArcData) => d.startLat)
      .arcStartLng((d: ArcData) => d.startLng)
      .arcEndLat((d: ArcData) => d.endLat)
      .arcEndLng((d: ArcData) => d.endLng)
      .arcColor((d: ArcData) => d.color || "#ff6600") // Default color if missing
      .arcAltitude(0.1) // Adjust arc height
      .arcStroke(() => 0.5) // Adjust thickness
      .arcDashLength(0.8) // Adjust dash style
      .arcDashGap(10)
      .arcDashAnimateTime(3000); // Adjust animation speed
  }, [isInitialized, data]);

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial: Material = globeRef.current.globeMaterial();
    (globeMaterial as any).color = new Color(defaultProps.globeColor!);
    (globeMaterial as any).emissive = new Color(defaultProps.emissive!);
    (globeMaterial as any).emissiveIntensity = defaultProps.emissiveIntensity!;
    (globeMaterial as any).shininess = defaultProps.shininess!;
  }, [
    isInitialized,
    defaultProps.globeColor,
    defaultProps.emissive,
    defaultProps.emissiveIntensity,
    defaultProps.shininess,
  ]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    let points: any[] = [];
    data.forEach((arc) => {
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    });

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere!)
      .atmosphereColor(defaultProps.atmosphereColor!)
      .atmosphereAltitude(defaultProps.atmosphereAltitude!)
      .hexPolygonColor(() => defaultProps.polygonColor!);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d: ArcData) => d.startLat)
      .arcStartLng((d: ArcData) => d.startLng)
      .arcEndLat((d: ArcData) => d.endLat)
      .arcEndLng((d: ArcData) => d.endLng)
      .arcColor((d: ArcData) => d.color!)
      .arcAltitude((d: ArcData) => d.arcAlt!)
      .arcStroke(() => 0.3)
      .arcDashLength(defaultProps.arcLength!)
      .arcDashInitialGap((d: ArcData) => d.order!)
      .arcDashGap(15)
      .arcDashAnimateTime(defaultProps.arcTime!);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((d: any) => d.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor!)
      .ringMaxRadius(defaultProps.maxRings!)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime! * defaultProps.arcLength!) / defaultProps.rings!
      );
  }, [isInitialized, data, defaultProps]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;
      const newNumbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5)
      );
      const ringsData = data
        .filter((_, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));
      globeRef.current.ringsData(ringsData);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size]);

  return null;
}

interface WorldProps {
  globeConfig: GlobeConfig;
  data?: ArcData[];
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <Canvas camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

export default World;
