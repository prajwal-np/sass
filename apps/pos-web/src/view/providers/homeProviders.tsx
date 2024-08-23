import { createContext, useContext } from "react";
import useHome, { TCurrentTable } from "../hooks/useHome";
import { TCartItem } from "../home/Menu/api/type";
import { TTablesCategroy } from "../home/TableManagment/api/type";

type StateProps = {
  currentTable?: TCurrentTable;
  tablesCategory?: TTablesCategroy[];
};
type DispatchProps = {
  setCurrentTable?: React.Dispatch<
    React.SetStateAction<TCurrentTable | undefined>
  >;
  addToCart?: (product: TCartItem) => void;
  checkoutOrder?: () => void;
};

export const HomeStateProvider = createContext<StateProps>({});
export const HomeDispatchProvider = createContext<DispatchProps>({});
type Props = {
  children: React.ReactNode;
};
export default function HomeProvider({ children }: Props) {
  const {
    currentTable,
    setCurrentTable,
    checkoutOrder,
    addToCart,
    tablesCategory,
  } = useHome();
  return (
    <HomeStateProvider.Provider
      value={{
        currentTable,
        tablesCategory,
      }}
    >
      <HomeDispatchProvider.Provider
        value={{
          setCurrentTable,
          addToCart,
          checkoutOrder,
        }}
      >
        {children}
      </HomeDispatchProvider.Provider>
    </HomeStateProvider.Provider>
  );
}

export const useHomeContext = () => {
  const state = useContext(HomeStateProvider);
  console.log(state);
  const dispatch = useContext(HomeDispatchProvider);
  return {
    ...state,
    ...dispatch,
  };
};
