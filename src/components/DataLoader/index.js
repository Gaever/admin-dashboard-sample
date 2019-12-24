import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchUsers} from '../../actions/user';

export default function DataLoader() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(fetchUsers());
    })();
  // eslint-disable-next-line
  }, []);

  return null;
};
