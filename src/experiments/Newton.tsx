import { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Constraint,
  Mouse,
  MouseConstraint,
  Events,
  Body,
} from "matter-js";
import { useGame } from "../context/GameContext";

const NewtonCradleExperiment = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { addPoints } = useGame();
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let timer: number;
    if (!isCompleted) {
      timer = window.setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    }

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current as HTMLElement,
      engine: engine,
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

    const getRandomColor = () =>
      `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const createNewtonsCradle = (
      x: number,
      y: number,
      count: number,
      size: number,
      length: number
    ) => {
      const cradle = Composite.create({ label: "Newtons Cradle" });

      for (let i = 0; i < count; i++) {
        const offset = 1.9;
        const ball = Bodies.circle(x + i * (size * offset), y + length, size, {
          inertia: Infinity,
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          slop: size * 0.02,
          label: "Ball",
          render: { fillStyle: getRandomColor() },
        });

        const string = Constraint.create({
          pointA: { x: x + i * (size * offset), y: y },
          bodyB: ball,
        });

        Composite.add(cradle, [ball, string]);
      }

      return cradle;
    };

    const cradle = createNewtonsCradle(280, 100, 5, 30, 200);
    Composite.add(world, cradle);

    // Pull first ball
    Body.translate(cradle.bodies[0], { x: -180, y: -100 });

    // Collision coloring
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA.label === "Ball") {
          pair.bodyA.render.fillStyle = getRandomColor();
        }
        if (pair.bodyB.label === "Ball") {
          pair.bodyB.render.fillStyle = getRandomColor();
        }
      });
    });

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);

    return () => {
      clearInterval(timer);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isCompleted]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
    if (timeSpent > 20) {
      addPoints(10);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Visualization Section */}
      <div className="md:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 text-center mb-4">
          ⚙️ Newton's Cradle Experiment
        </h2>
        <div ref={sceneRef} className="w-full h-[400px] rounded" />
      </div>

      {/* Control Panel */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">📜 Instructions</h3>
        <p className="text-gray-200 text-sm">
          Drag the spheres to start motion. Observe momentum transfer during collisions.
        </p>

        <div className="mt-6 text-white">
          <p className="font-semibold">⏳ Time Spent: {timeSpent} seconds</p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`${
              isCompleted
                ? "bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded font-semibold disabled:opacity-60 transition-all`}
          >
            {isCompleted ? "✅ Lab Completed" : "✅ Mark as Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewtonCradleExperiment;
