import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import Button from "../../components/Button/Button";
import s from "./PageNotFound.module.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <Box className={s.container}>
      <Box className={s.background}>
        <h2 className={s.title}>Sorry, is no Wallet here</h2>
        <Box className={s.img}></Box>
        <Button onClick={handleBtnClick}>Back to you Wallet</Button>
        <p className={s.text}>Wallet Information must Be at Safe!</p>
      </Box>
    </Box>
  );
};

export default PageNotFound;
