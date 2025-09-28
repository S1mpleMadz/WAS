import ModuleCrudler from "../entity/module/ModuleCrudler.jsx";

function Module() {
  // Initaialisation ---------------------------------
  const myModulesEndpoint = `/modules/`;

  // State --------------------------------------------
  // Handlers -----------------------------------------
  // View ---------------------------------------------
  return (
    <>
      <h1>Modules</h1>
      {console.log(myModulesEndpoint)}
      <ModuleCrudler endpoint={myModulesEndpoint} />
    </>
  );
}

export default Module;
