import DutiesCruddler from "../entity/duty/DutyCruddler";

export default function Duties() {
  // Initialisation ----------------------------------------------
  const endpoint = "/duties";
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  return (
    <>
      <h1>Duties</h1>
      <DutiesCruddler endpoint={endpoint} />
    </>
  );
}
