export async function calculateModuleEffort(moduleData) {
  if (!moduleData) {
    return 0;
  }

  try {
    // Fetch parameters from API
    const response = await fetch("https://softwarehub.uk/unibase/WAS/api/parameters");
    const parametersArray = await response.json();
    const effortConfig = parametersArray[0];

    // Destructure for easier access
    const { ModuleSize, ModuleCredits } = moduleData;

    // 1. Calculate Marking Effort
    const markingEffort = ModuleSize * effortConfig.MarkingTimePerStudent;

    // 2. Calculate Workshop Effort
    const numberOfWeeklyWorkshops = Math.ceil(ModuleSize / effortConfig.WorkshopSize);
    const teachingWeeks = ModuleCredits === 15 ? effortConfig.WeeksPer15Credits : effortConfig.WeeksPer30Credits;
    const workshopEffort =
      effortConfig.WorkshopMultiplier * teachingWeeks * effortConfig.WorkshopHoursPerWeek * numberOfWeeklyWorkshops;

    // 3. Calculate Lecturing Effort
    const lecturingEffort = effortConfig.LecturingMultiplier * teachingWeeks * effortConfig.LectureHoursPerWeek;

    // 4. Calculate Module Leading Effort
    const moduleLeadingEffort = Math.max(effortConfig.LeadingMinimum, effortConfig.LeadingMultiplier * ModuleSize);

    // 5. Calculate Total Module Effort
    const totalEffort = Math.round(moduleLeadingEffort + lecturingEffort + workshopEffort + markingEffort);

    return totalEffort;
  } catch (error) {
    console.error("Error fetching parameters:", error);
    return 0;
  }
}
