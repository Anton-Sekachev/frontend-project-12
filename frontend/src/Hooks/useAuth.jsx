import { useContext } from 'react';

import authContext from '../Сontexts/AuthContext';

const useAuth = () => useContext(authContext);

export default useAuth;
