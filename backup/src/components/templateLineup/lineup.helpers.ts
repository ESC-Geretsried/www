export const getStickSide = (side: string) => {
  switch (side) {
    case "left":
      return "Links";
    case "right":
      return "Rechts";
    default:
      return "Links";
  }
};

export const getPosition = (position: string) => {
  switch (position) {
    case "roadie":
      return "Betreuer";
    case "coach":
      return "Trainer";
    case "assistant":
      return "Co-Trainer";
    case "manager":
      return "Manager";
    default:
      return "Betreuer";
  }
};
