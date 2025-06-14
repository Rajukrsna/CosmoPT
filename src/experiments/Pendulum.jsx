import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const PendulumExperiment = () => {
  const sceneRef = useRef(null);
  const experimentName = "Pendulum Experiment";

  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [engine, setEngine] = useState(null);
  const [runner, setRunner] = useState(null);
  const [render, setRender] = useState(null);
  const [gravity, setGravity] = useState(1);

  useEffect(() => {
    let timer;
    if (!isCompleted) {
      timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    }

    const { Engine, Render, Runner, Bodies, Composite, Constraint } = Matter;

    const engineInstance = Engine.create();
    const world = engineInstance.world;
    world.gravity.y = gravity;

    const renderInstance = Render.create({
      element: sceneRef.current,
      engine: engineInstance,
      options: { width: 600, height: 400, wireframes: false, background: "transparent" },
    });

    const runnerInstance = Runner.create();
    Render.run(renderInstance);
    Runner.run(runnerInstance, engineInstance);

    const support = Bodies.rectangle(300, 50, 200, 20, { isStatic: true, render: { fillStyle: "#333" } });
    const pendulumBob = Bodies.circle(400, 250, 30, { restitution: 1, render: { fillStyle: "#ff5722" } });

    const constraint = Constraint.create({
      bodyA: support,
      pointA: { x: 0, y: 10 },
      bodyB: pendulumBob,
      stiffness: 0.9,
      length: 150,
    });

    Composite.add(world, [support, pendulumBob, constraint]);

    setEngine(engineInstance);
    setRunner(runnerInstance);
    setRender(renderInstance);

    return () => {
      clearInterval(timer);
      Matter.Render.stop(renderInstance);
      Matter.Runner.stop(runnerInstance);
      Matter.World.clear(world);
      Matter.Engine.clear(engineInstance);
      renderInstance.canvas.remove();
    };
  }, [isCompleted, gravity]);

  const handleReset = () => {
    if (engine && runner && render) {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    }
    setTimeSpent(0);
    setIsCompleted(false);
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  const handleGravityChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setGravity(newValue);
    if (engine) {
      engine.world.gravity.y = newValue;
    }
  };

  return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    {/* Pendulum Visualization */}
    <div className="md:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-300 text-center mb-4">🕰️ Pendulum Experiment</h2>
      <div ref={sceneRef}></div>
    </div>

    {/* Control Panel */}
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-purple-300 mb-2">📜 Instructions</h3>
      <p className="text-gray-200 text-sm">
        Observe how the pendulum moves and interacts with gravity. You can adjust gravity to see its effect.
      </p>

      <div className="mt-6">
        <label className="font-medium text-white">🌍 Gravity: {gravity.toFixed(1)}</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={gravity}
          onChange={handleGravityChange}
          className="w-full mt-2 accent-blue-500"
        />
        <div className="flex justify-between text-xs mt-1 text-gray-300">
          <span>0</span>
          <span>1 (Normal)</span>
          <span>2 (High)</span>
        </div>
      </div>

      <div className="mt-6 text-white">
        <p className="font-semibold">⏳ Time Spent: {timeSpent} seconds</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={handleReset}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-semibold transition-all"
        >
          🔄 Restart Experiment
        </button>

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

export default PendulumExperiment;
