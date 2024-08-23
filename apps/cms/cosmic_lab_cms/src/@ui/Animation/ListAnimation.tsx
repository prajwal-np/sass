import { motion } from "framer-motion";
export type Props<T> = {
  containerClass?: string;
  data?: T[];
  childrens: (_item: T, _index: number) => React.ReactNode;
  extractKey: (_item: T, _index: number) => string;
  child?: {
    hidden: Partial<any>;
    visible: Partial<any>;
  };
  childClass?: string;
};
export default function ListAnimation<T>({
  containerClass,
  data,
  childrens,
  extractKey,
  child = {
    hidden: {},
    visible: {},
  },
  childClass,
}: Props<T>) {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0, ...child.hidden },
    visible: {
      y: 0,
      opacity: 1,
      ...child.visible,
    },
  };
  if (!data) return <></>;
  return (
    <motion.div
      layout
      className={containerClass}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {data?.map((el, i) => (
        <motion.div
          className={childClass}
          key={extractKey(el, i)}
          variants={item}
        >
          {childrens(el, i)}
        </motion.div>
      ))}
    </motion.div>
  );
}
