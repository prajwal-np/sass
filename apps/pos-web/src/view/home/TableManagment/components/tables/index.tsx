import { useEffect, useState } from "react";
import { useHomeContext } from "../../../../providers/homeProviders";
import Seat from "./Seat";
import Shape from "./Shape";
import { motion } from "framer-motion";
import { TTables, TTablesCategroy } from "../../api/type";
import clsx from "clsx";
import Modal from "../../../../../@ui/modal";
import Typography from "../../../../../@ui/typography";
import Button from "../../../../../@ui/Button";
export default function Tables() {
  const { setCurrentTable, tablesCategory } = useHomeContext();
  const [currentCategory, setCurrentCategory] = useState<TTablesCategroy>();
  const [selectTable, setSelectTable] = useState<TTables | null>();
  const [guests, setGuests] = useState<number>(0);
  useEffect(() => {
    if (tablesCategory?.length) setCurrentCategory(tablesCategory[0]);
  }, [tablesCategory]);

  return (
    <div className="h-full bg-white p-6">
      <div className="flex flex-col flex-wrap gap-10  items-start">
        <div className="flex gap-4">
          {tablesCategory?.map((el) => (
            <motion.button
              key={el.id + "table-category"}
              className={clsx(
                " p-4 rounded-md bg-white border"
                // currentCategory?.id === el.id ? " shadow-slate-500" : ""
              )}
              onClick={() => setCurrentCategory(el)}
            >
              {el.name}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap gap-10 justify-start items-center">
          {currentCategory?.tables?.map((el, i) => (
            <motion.div
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => {
                if (el.orders.length) {
                  console.log(el);
                  setCurrentTable({ order: el.orders, table: el });
                  return;
                }
                setSelectTable(el);
              }}
              key={"tables-" + el.id}
              className="flex min-w-20 flex-col gap-4 justify-center items-center"
            >
              <div className="flex gap-6 justify-between ">
                {[...Array(el.capacity / 2)].map((el, i) => (
                  <Seat key={`seats-${i}`} />
                ))}
              </div>
              <div className="h-20 w-full">
                <Shape
                  status={el.orders.length ? "occupied" : "available"}
                  name={el.name}
                  type={el.type}
                />
              </div>

              <div className="flex gap-6 justify-between">
                {[...Array(el.capacity / 2)].map((el, i) => (
                  <Seat key={`seats-${i}`} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Modal
        isVisible={!!selectTable}
        onCloseEvent={() => setSelectTable(null)}
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full flex-col gap-4">
            <Typography text="Number of guests" />
            <input
              value={guests}
              onChange={(event) => {
                console.log(Number(event.target.value));
                setGuests(Number(event.target.value));
              }}
              className="border w-full text-xl p-2 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => setSelectTable(null)}
              className="bg-transparent py-4 w-full rounded-lg my-4 text-black-500 border "
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setCurrentTable &&
                  selectTable &&
                  setCurrentTable({ table: { ...selectTable, guests } });
              }}
              disabled={!guests}
              className="bg-blue-500 py-4 w-full rounded-lg my-4 text-white"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
