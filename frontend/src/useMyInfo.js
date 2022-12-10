import {useState} from "react";

export default function useMyInfo() {
  const getMyInfo = () => {
    const infoString = sessionStorage.getItem("myInfo");
    const info = JSON.parse(infoString);
    return info;
  };

  const [myInfo, setMyInfo] = useState(getMyInfo());

  const saveMyInfo = (info) => {
    sessionStorage.setItem("myInfo", JSON.stringify(info));
    setMyInfo(info);
  };

  return {
    setMyInfo: saveMyInfo,
    myInfo,
  };
}
