import { CarType } from "../../types";
import Images from "./Images";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  car: CarType;
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ car, isOpen, close }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-20 grid place-items-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative bg-white p-6 max-w-lg max-h-[90vh] rounded-xl flex flex-col gap-5 shadow-xl overflow-auto"
          >
            <button className="cursor-pointer p-1 absolute end-1 top-1 z-10 bg-white rounded-full">
              <img onClick={close} src="/close.svg" />
            </button>
            <Images car={car} />
            {Object.entries(car).map(([key, value]) => (
              <div className="flex justify-between">
                <h4 className="capitalize ">{key.split("_").join(" ")}</h4>
                <p className="font-semibold capitalize">{value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
