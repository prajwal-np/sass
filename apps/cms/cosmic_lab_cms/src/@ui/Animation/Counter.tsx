import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
type Props = {
  from?: number;
  to: number;
};
const Counter = ({ from = 0, to }: Props) => {
  console.log(to);
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 0.5 });
    return controls.stop;
  }, []);

  return <motion.p>{rounded}</motion.p>;
};

export default Counter;
