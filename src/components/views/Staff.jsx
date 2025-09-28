import UserCruddler from "../entity/user/UserCruddler.jsx";

export default function Staff() {
  // Initialisation ----------------------------------------------
  const endpoint = "/users";
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  return (
    <>
      <h1>Staff</h1>
      <UserCruddler endpoint={endpoint} />
    </>
  );
}
