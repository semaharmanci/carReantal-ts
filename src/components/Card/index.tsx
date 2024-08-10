import { useState } from "react";
import { CarType } from "../../types";
import Button from "../Button";
import Info from "./Info";
import { motion } from "framer-motion";
import Modal from "../Modal";
import generateImage from "../../utils/generateImage";

interface Props {
  car: CarType;
}

const Card = ({ car }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="car-card group"
    >
      <h2 className="car-card__content-title">
        {car.make} {car.model}
      </h2>
      <div className="flex mt-6 text-[19px]">
        <span className="font-semibold">₺</span>
        <span className="text-[32px]">
          {Math.round(Math.random() * 7000) + 1500}
        </span>
        <span className="font-semibold self-end">/gün</span>
      </div>
      <div className="relative w-full h-40 my-3">
        <img
          className="w-full h-full object-contain"
          src={generateImage(car)}
          alt="car"
        />
      </div>
      <div className="w-full">
        <Info car={car} />
        <div className="hidden group-hover:flex mt-[3.8px]">
          <Button
            icon="right-arrow.svg"
            title="Daha Fazla"
            designs="w-full py-[25px]"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <Modal car={car} isOpen={isOpen} close={() => setIsOpen(false)} />
    </motion.div>
  );
};

export default Card;
