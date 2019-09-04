import { useRouter } from "next/router";

const EditionDetails = () => {
  const router = useRouter();
  const { eventid, editionid } = router.query;

  return <p>Edition: {editionid}</p>;
};

export default EditionDetails;
