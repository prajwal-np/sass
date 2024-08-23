import { motion } from "framer-motion";
type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: Props) {
  return (
    <motion.button whileTap={{ scale: 0.55 }} {...(props as any)}>
      {children}
    </motion.button>
  );
}
