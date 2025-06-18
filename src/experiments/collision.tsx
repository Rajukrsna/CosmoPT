import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useGame } from "../context/GameContext";

const CollisionExperiment: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [restitution, setRestitution] = useState<number>(1);
  const [friction, setFriction] = useState<number>(0);
  const [frictionAir, setFrictionAir] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [velocity, setVelocity] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { addPoints } = useGame();

  useEffect(() => {
    let timer: number | undefined;

    if (!isCompleted) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }

    const { Engine, Render, Runner, Bodies, Composite, Body, Events, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = 0;
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: "#f0f0f0",
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const balls: Matter.Body[] = [];

    for (let i = 0; i < 50; i++) {
      const ball = Bodies.circle(50 + i * 10, 10, 10, {
        restitution,
        friction,
        frictionAir,
        render: { fillStyle: "#3b82f6" },
      });

      Body.setVelocity(ball, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      });

      balls.push(ball);
    }

    Composite.add(world, balls);

    const walls = [
      Bodies.rectangle(300, 0, 600, 20, { isStatic: true }),
      Bodies.rectangle(300, 400, 600, 20, { isStatic: true }),
      Bodies.rectangle(600, 200, 20, 400, { isStatic: true }),
      Bodies.rectangle(0, 200, 20, 400, { isStatic: true }),
    ];

    Composite.add(world, walls);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false },
      },
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    Events.on(engine, "beforeUpdate", () => {
      const mainBall = balls[0];
      if (mainBall) {
        setVelocity(Number(Math.sqrt(mainBall.velocity.x ** 2 + mainBall.velocity.y ** 2).toFixed(2)));
        setPosition({
          x: Number(mainBall.position.x.toFixed(0)),
          y: Number(mainBall.position.y.toFixed(0)),
        });
      }
    });

    return () => {
      if (timer) clearInterval(timer);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [restitution, friction, frictionAir, isCompleted]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
    if (timeSpent > 20) addPoints(10);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6 min-h-screen">
      {/* Canvas Area */}
      <div className="flex-1 shadow-xl rounded-lg p-4 bg-white/10 backdrop-blur-md text-white">
        <h2 className="text-xl font-semibold text-center mb-4">Collision Experiment</h2>
        <div ref={sceneRef} className="rounded overflow-hidden"></div>
      </div>

      {/* Controls Panel */}
      <div className="w-full md:w-[350px] p-4 shadow-xl rounded-lg bg-white/10 backdrop-blur-md text-white flex flex-col gap-4">
        <h3 className="text-lg font-bold">Simulation Controls</h3>

        {/* Restitution Slider */}
        <div>
          <label className="text-sm">Restitution: {restitution.toFixed(1)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={restitution}
            onChange={(e) => setRestitution(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Friction Slider */}
        <div>
          <label className="text-sm">Friction: {friction.toFixed(1)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={friction}
            onChange={(e) => setFriction(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Air Friction Slider */}
        <div>
          <label className="text-sm">Air Friction: {frictionAir.toFixed(1)}</label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.01"
            value={frictionAir}
            onChange={(e) => setFrictionAir(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Real-Time Info */}
        <div className="text-sm mt-2 space-y-1">
          <p><strong>Time Spent:</strong> {timeSpent}s</p>
          <p><strong>Velocity:</strong> {velocity} px/s</p>
          <p><strong>Position:</strong> ({position.x}, {position.y})</p>
        </div>

        {/* Completion Button */}
        <button
          onClick={handleMarkComplete}
          className={`py-2 rounded transition text-white font-semibold ${
            isCompleted ? "bg-green-600 cursor-not-allowed opacity-60" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isCompleted}
        >
          {isCompleted ? "✅ Lab Completed" : "✅ Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default CollisionExperiment;
