import { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";
import { useGame } from "../context/GameContext";

const InclinedPlaneExperiment = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [angle, setAngle] = useState<number>(30); // Incline angle in degrees
  const [velocity, setVelocity] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 200,
    y: 100,
  });

  const { addPoints } = useGame();

  useEffect(() => {
    let timer: number;
    if (!isCompleted) {
      timer = window.setInterval(() => setTimeSpent((t) => t + 1), 1000);
    }

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current as HTMLElement,
      engine,
      options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: "#f4f4f4",
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const ground = Bodies.rectangle(300, 390, 600, 20, { isStatic: true });

    const incline = Bodies.rectangle(
      300,
      250,
      300,
      20,
      { isStatic: true, angle: (Math.PI / 180) * angle }
    );

    const block = Bodies.rectangle(200, 100, 40, 40, {
      restitution: 0.2,
      friction: 0.05,
      density: 0.01,
    });

    Composite.add(world, [ground, incline, block]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(world, mouseConstraint);

    Events.on(engine, "beforeUpdate", () => {
      setVelocity(Number(block.velocity.x.toFixed(2)));
      setPosition({
        x: Math.round(block.position.x),
        y: Math.round(block.position.y),
      });
    });

    return () => {
      clearInterval(timer);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isCompleted, angle]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
    if (timeSpent > 20) addPoints(10);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Simulation Section */}
      <div className="md:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 text-center mb-4">
          🧪 Inclined Plane Experiment
        </h2>
        <div ref={sceneRef} className="w-full h-[400px] rounded" />
      </div>

      {/* Info & Controls */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 shadow-lg text-white">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">📜 Instructions</h3>
        <p className="text-sm text-gray-300">
          Drag the block and release to observe motion. Adjust incline angle for effects.
        </p>

        {/* Slider */}
        <div className="mt-4">
          <label htmlFor="angle" className="block text-sm font-bold mb-1">
            Incline Angle ({angle}°)
          </label>
          <input
            id="angle"
            type="range"
            min={10}
            max={60}
            value={angle}
            className="w-full"
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </div>

        {/* Time & Data */}
        <div className="mt-6 space-y-2">
          <p>⏱️ <span className="font-semibold">{timeSpent}</span> seconds</p>
          <p>🚀 Velocity: <span className="font-semibold">{velocity}</span> m/s</p>
          <p>📍 Position: X = <span className="font-semibold">{position.x}</span>, Y = <span className="font-semibold">{position.y}</span></p>
        </div>

        {/* Mark Complete */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`${
              isCompleted ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded font-semibold disabled:opacity-60 transition-all`}
          >
            {isCompleted ? "✅ Lab Completed" : "✅ Mark as Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InclinedPlaneExperiment;
