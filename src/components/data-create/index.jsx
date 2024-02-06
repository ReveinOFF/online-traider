import md5 from "md5";

const DataCreate = () => {
  const rand_param =
    Math.floor(Math.random() * (99999999 - 1000000 + 1)) + 1000000;
  const key = md5(`${process.env.REACT_APP_API_KEY}${rand_param}`);

  return { rand_param, key };
};

export default DataCreate;
