
import { createContext, useContext } from "react";

export const UserContext = createContext(null);

// Hook para acceder fácilmente al usuario
export const useUser = () => useContext(UserContext);